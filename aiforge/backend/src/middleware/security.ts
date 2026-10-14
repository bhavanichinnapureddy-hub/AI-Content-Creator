import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '../config/env';
import { logger, logSecurityEvent } from '../utils/logger';

// ─── Helmet Security Headers ──────────────────────────────────────────────────

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for now
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Needed for some media
  hsts: config.isProd
    ? {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      }
    : false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xPoweredBy: false,
});

// ─── CORS ──────────────────────────────────────────────────────────────────────

const allowedOrigins = config.cors.allowedOrigins;

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman in dev, mobile apps)
    if (!origin) {
      if (config.isDev) {
        return callback(null, true);
      }
      return callback(new Error('Origin required in production'), false);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logSecurityEvent('cors_blocked', { origin });
      callback(new Error(`Origin ${origin} not allowed by CORS`), false);
    }
  },
  credentials: true, // Required for cookies (refresh tokens)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  exposedHeaders: ['X-Request-ID'],
  maxAge: 86400, // Cache preflight for 24h
});

// ─── Global Rate Limiter ──────────────────────────────────────────────────────

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per 15 min globally
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again later.',
    retryAfter: null,
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    logSecurityEvent('rate_limit_hit', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json(options.message);
  },
  skip: (req) => {
    // Allow health checks to bypass rate limiting
    return req.path === '/health';
  },
});

// ─── Auth Rate Limiter (stricter) ─────────────────────────────────────────────

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 min
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    logSecurityEvent('auth_rate_limit_hit', {
      ip: req.ip,
      path: req.path,
    });
    res.status(429).json(options.message);
  },
});

// ─── Upload Rate Limiter ──────────────────────────────────────────────────────

export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 uploads per hour
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Too many file uploads. Please try again later.',
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    logSecurityEvent('upload_rate_limit_hit', {
      ip: req.ip,
      path: req.path,
    });
    res.status(429).json(options.message);
  },
});

// ─── AI Rate Limiter ─────────────────────────────────────────────────────────

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 AI requests per hour
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'AI generation rate limit reached. Please try again later.',
  },
  handler: (req: Request, res: Response, _next: NextFunction, options) => {
    logSecurityEvent('ai_rate_limit_hit', {
      ip: req.ip,
      path: req.path,
    });
    res.status(429).json(options.message);
  },
});

// ─── Request ID Middleware ────────────────────────────────────────────────────

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId =
    (req.headers['x-request-id'] as string) ||
    `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}

// ─── Request Logger ───────────────────────────────────────────────────────────

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level =
      res.statusCode >= 500
        ? 'error'
        : res.statusCode >= 400
          ? 'warn'
          : 'info';

    logger[level](
      {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: duration,
        ip: req.ip,
        requestId: req.headers['x-request-id'],
      },
      `${req.method} ${req.path} ${res.statusCode} ${duration}ms`
    );
  });

  next();
}
