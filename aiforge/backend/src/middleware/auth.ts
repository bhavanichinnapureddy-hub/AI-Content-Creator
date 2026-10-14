import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { logSecurityEvent } from '../utils/logger';
import { prisma } from '../config/database';

export type UserRole = 'BRAND' | 'CREATOR' | 'ADMIN';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Extend Express Request to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// ─── requireAuth ──────────────────────────────────────────────────────────────

/**
 * Verifies the JWT access token from the Authorization header.
 * Attaches the decoded payload to req.user.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const token = authHeader.slice(7); // Remove "Bearer "

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
    } catch (jwtError) {
      logSecurityEvent('invalid_jwt', {
        ip: req.ip,
        path: req.path,
        error: jwtError instanceof Error ? jwtError.message : 'JWT error',
      });
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      logSecurityEvent('deactivated_user_attempt', {
        userId: decoded.userId,
        ip: req.ip,
      });
      res.status(401).json({ error: 'Account not found or deactivated' });
      return;
    }

    // Ensure role hasn't changed since token was issued
    if (user.role !== decoded.role) {
      res.status(401).json({ error: 'Token is outdated. Please log in again.' });
      return;
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    next();
  } catch (error) {
    next(error);
  }
}

// ─── requireRole ─────────────────────────────────────────────────────────────

/**
 * Enforces that the authenticated user has one of the specified roles.
 * Must be used AFTER requireAuth.
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      logSecurityEvent('forbidden_role', {
        userId: req.user.userId,
        requiredRoles: roles,
        userRole: req.user.role,
        path: req.path,
        ip: req.ip,
      });
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
}

// ─── requireOwnership ────────────────────────────────────────────────────────

/**
 * Verifies the authenticated user owns the resource.
 * The getOwnerId function should return the owner's userId from the DB.
 * ADMINs bypass ownership checks.
 */
export function requireOwnership(
  getOwnerId: (req: Request) => Promise<string | null>
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      // Admins can access any resource
      if (req.user.role === 'ADMIN') {
        return next();
      }

      const ownerId = await getOwnerId(req);

      if (ownerId === null) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }

      if (ownerId !== req.user.userId) {
        logSecurityEvent('idor_attempt', {
          userId: req.user.userId,
          requestedOwnerId: ownerId,
          path: req.path,
          ip: req.ip,
        });
        res.status(403).json({ error: 'Insufficient permissions' });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

// ─── requireVerifiedCreator ───────────────────────────────────────────────────

/**
 * Ensures the creator has at least one verified badge.
 * Used for actions that require verified creator status.
 */
export async function requireVerifiedCreator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (req.user.role !== 'CREATOR') {
      res.status(403).json({ error: 'Creator account required' });
      return;
    }

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: req.user.userId },
      select: { isVerified: true },
    });

    if (!profile?.isVerified) {
      res.status(403).json({
        error: 'Verified creator status required for this action',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
