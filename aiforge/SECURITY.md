# AIForge Security Documentation

## Overview

AIForge implements defense-in-depth security across all layers.
This document describes the security controls in place and responsible disclosure procedures.

---

## Authentication

| Control | Implementation |
|---|---|
| Password hashing | Argon2id (cost factor appropriate for server hardware) |
| Password minimum | 8 characters, must include uppercase, lowercase, number, special char |
| Access tokens | JWT, 15-minute expiry, signed with HS256 |
| Refresh tokens | HttpOnly, Secure, SameSite=Strict cookies. Hash stored in DB |
| Token refresh | Automatic silent refresh; invalid refresh triggers logout |
| Logout | Server-side refresh token revocation |
| Password reset | Single-use, time-limited (1 hour) hashed reset tokens |
| Brute-force protection | 10 auth attempts per 15 minutes per IP (express-rate-limit) |
| Email enumeration | Generic messages — never reveal whether email exists |
| Admin account | Created ONLY via seed script using env vars; no public signup route |

---

## Authorization (RBAC)

| Role | Access |
|---|---|
| BRAND | Own briefs, engagements, payments, wallet |
| CREATOR | Own profile, portfolio, applications, assigned engagements, wallet |
| ADMIN | All admin routes, user management, verification, analytics, audit logs |

### Enforcement

Every protected endpoint enforces:
1. Valid JWT (`requireAuth` middleware)
2. Correct role (`requireRole` middleware)
3. Resource ownership (`requireOwnership` middleware)

Frontend route guards are UX only. All authorization is enforced on the backend.

---

## Input Validation

- All request bodies, query parameters, URL parameters, and file uploads are validated on the server using Zod schemas.
- Allowlists, maximum lengths, data types, enum values, and format checks applied.
- Prisma parameterized queries prevent SQL injection — no string concatenation.
- File uploads restricted by MIME type, extension, and file size (10MB max).

---

## API Security

| Control | Implementation |
|---|---|
| CORS | Strict allowlist from `ALLOWED_ORIGINS` env var. No wildcard `*`. |
| Rate limiting (global) | 300 requests / 15 min |
| Rate limiting (auth) | 10 requests / 15 min |
| Rate limiting (uploads) | 30 uploads / hour |
| Rate limiting (AI) | 20 AI requests / hour |
| Request body size | 2MB limit |
| Security headers | Helmet (CSP, X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy) |
| Error messages | Generic — never expose stack traces, SQL errors, or internal paths |
| Logging | Pino structured logger; passwords/tokens/cookies auto-redacted |

---

## Secrets Management

- All secrets stored in `.env` (never committed)
- `.env.example` provides variable names only
- Environment variables validated at startup; server refuses to start in production if critical secrets missing or too short
- JWT secrets: minimum 32 characters required
- No secrets in source code, Git history, logs, or API responses

### Required Secrets

```
DATABASE_URL
JWT_ACCESS_SECRET       (min 32 chars)
JWT_REFRESH_SECRET      (min 32 chars)
CLIENT_URL
ALLOWED_ORIGINS
```

---

## Database Security

- PostgreSQL with Prisma ORM
- Parameterized queries throughout (Prisma)
- Passwords hashed (never stored in plain text)
- Refresh token hashes stored (never raw tokens)
- Unique constraints on email and username
- Foreign keys with cascade rules
- Indexes on all frequently-queried fields

---

## File Upload Security

- MIME type validation (server-side)
- File extension allowlist
- 10MB maximum file size
- Files stored outside executable paths
- Served through controlled URLs
- Upload rate limiting (30/hour)

---

## Git and Dependencies

- `.gitignore` prevents `.env`, `node_modules`, `uploads`, build output, and key files from being committed
- Dependencies audited with `npm audit`
- No unnecessary packages

---

## Payments (Demo Mode)

AIForge implements a **fully simulated** payment system for demonstration purposes.
- **No real payment gateway is integrated**
- **No card numbers, CVV, bank details, UPI IDs, or real credentials are collected or stored**
- Demo wallet uses fictional masked payment methods only
- All transactions are clearly labeled "Demo Mode — No real money is processed"

---

## Responsible Disclosure

If you discover a security vulnerability in AIForge, please report it responsibly:

1. **Do not** create a public GitHub issue for security vulnerabilities.
2. Contact the maintainers privately via email with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
3. Allow reasonable time for a fix before public disclosure.

---

## Security Audit Checklist

- [x] No secrets in source code or Git history
- [x] `.env` is ignored by Git
- [x] Passwords hashed with Argon2id
- [x] Refresh tokens hashed in database
- [x] JWT secrets strong and separate
- [x] Admin routes protected by backend RBAC
- [x] IDOR protection via `requireOwnership` middleware
- [x] All inputs validated server-side with Zod
- [x] XSS-safe rendering (no `dangerouslySetInnerHTML` without DOMPurify)
- [x] SQL injection protected through Prisma parameterized queries
- [x] File-upload restrictions implemented
- [x] CORS restricted to allowed origins
- [x] Rate limiting enabled globally and stricter on auth/AI routes
- [x] Helmet security headers enabled
- [x] Debug mode disabled in production
- [x] Error responses do not leak internals
- [x] No public admin registration route
- [x] Admin account created only through secure seed script
