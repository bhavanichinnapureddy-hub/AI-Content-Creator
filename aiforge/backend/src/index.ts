import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { config } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { logger } from './utils/logger';
import {
  helmetMiddleware,
  corsMiddleware,
  globalRateLimiter,
  requestIdMiddleware,
  requestLogger,
} from './middleware/security';
import {
  notFoundHandler,
  globalErrorHandler,
} from './middleware/errorHandler';

// Import routes (will be added in subsequent setup tasks)
// import authRoutes from './routes/auth';

const app = express();

// ─── Trust Proxy (for correct IP behind load balancer) ────────────────────────
if (config.isProd) {
  app.set('trust proxy', 1);
}

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(globalRateLimiter);

// ─── Request Processing ───────────────────────────────────────────────────────
app.use(requestIdMiddleware);
app.use(requestLogger);

// Parse cookies (needed for refresh token HttpOnly cookie)
app.use(cookieParser());

// Parse JSON with size limit (prevents large payload attacks)
app.use(express.json({ limit: '2mb' }));

// Parse URL-encoded bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Compress responses
app.use(compression());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.isProd ? 'production' : 'development',
    version: '1.0.0',
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
// Routes will be registered here as they are built:
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/creators', creatorRoutes);
// app.use('/api/v1/brands', brandRoutes);
// app.use('/api/v1/briefs', briefRoutes);
// app.use('/api/v1/engagements', engagementRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/notifications', notificationRoutes);
// app.use('/api/v1/ai', aiRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

// ─── Server Startup ───────────────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  try {
    // Validate environment (already done in env.ts import, but ensure DB connects)
    await connectDatabase();

    const server = app.listen(config.port, () => {
      logger.info(
        `🚀 AIForge API server running on port ${config.port} [${config.isDev ? 'development' : 'production'}]`
      );
    });

    // ─── Graceful Shutdown ────────────────────────────────────────────────────
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(async () => {
        await disconnectDatabase();
        logger.info('Server closed');
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error({ reason, promise }, 'Unhandled Promise Rejection');
      if (config.isProd) {
        shutdown('unhandledRejection');
      }
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error({ err: error }, 'Uncaught Exception — shutting down');
      shutdown('uncaughtException');
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

bootstrap();

export default app;
