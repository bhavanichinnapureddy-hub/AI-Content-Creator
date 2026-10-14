import pino from 'pino';
import { config } from '../config/env';

export const logger = pino({
  level: config.isDev ? 'debug' : 'info',
  transport: config.isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  // Redact sensitive fields from all log entries
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'body.password',
      'body.newPassword',
      'body.currentPassword',
      'body.token',
      'body.refreshToken',
      'password',
      'token',
      'refreshToken',
      'accessToken',
      'secret',
      'apiKey',
    ],
    censor: '[REDACTED]',
  },
});

/**
 * Log a security event (failed login, permission denial, etc.)
 * These always log at 'warn' or 'error' level regardless of environment.
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>
) {
  logger.warn(
    {
      securityEvent: event,
      ...details,
    },
    `Security event: ${event}`
  );
}

/**
 * Log an admin action for the audit trail.
 */
export function logAdminAction(
  adminId: string,
  action: string,
  target: Record<string, unknown>
) {
  logger.info(
    {
      adminAudit: true,
      adminId,
      action,
      target,
    },
    `Admin action: ${action}`
  );
}
