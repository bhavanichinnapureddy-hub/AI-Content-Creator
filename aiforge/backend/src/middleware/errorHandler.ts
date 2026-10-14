import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger, logSecurityEvent } from '../utils/logger';
import { config } from '../config/env';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

/**
 * Creates a structured operational error.
 */
export function createError(
  message: string,
  statusCode = 500,
  code?: string
): AppError {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  error.code = code;
  return error;
}

/**
 * 404 handler — catches requests to undefined routes.
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: 'The requested resource was not found',
    path: req.path,
  });
}

/**
 * Global error handler.
 * - Never exposes stack traces or internals in production.
 * - Handles Zod validation errors with structured field errors.
 * - Logs all errors appropriately.
 */
export function globalErrorHandler(
  err: AppError | ZodError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      fields: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  const appError = err as AppError;
  const statusCode = appError.statusCode ?? 500;
  const isOperational = appError.isOperational ?? false;

  // Log the error
  if (statusCode >= 500) {
    logger.error(
      {
        err: {
          message: err.message,
          name: err.name,
          // Only include stack in dev
          ...(config.isDev ? { stack: err.stack } : {}),
        },
        path: req.path,
        method: req.method,
        ip: req.ip,
        requestId: req.headers['x-request-id'],
      },
      'Server error'
    );
  } else if (statusCode === 403) {
    logSecurityEvent('permission_denied', {
      path: req.path,
      method: req.method,
      ip: req.ip,
      userId: req.user?.userId,
    });
  }

  // Never reveal internals in production
  const responseMessage =
    config.isProd && !isOperational
      ? 'An unexpected error occurred. Please try again later.'
      : err.message;

  res.status(statusCode).json({
    error: responseMessage,
    // Only include request ID for support correlation
    requestId: req.headers['x-request-id'],
    // Stack only in development
    ...(config.isDev && { stack: err.stack }),
  });
}
