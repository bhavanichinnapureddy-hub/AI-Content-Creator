import { z } from 'zod';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().regex(/^\d+$/).default('5000'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL'),
  ALLOWED_ORIGINS: z.string().min(1, 'ALLOWED_ORIGINS is required'),

  MAX_FILE_SIZE: z.string().regex(/^\d+$/).default('10485760'),
  UPLOAD_DIR: z.string().default('./uploads'),

  // Optional AI provider
  AI_PROVIDER_API_KEY: z.string().optional(),
  AI_PROVIDER_BASE_URL: z.string().url().optional(),

  // Optional Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // Optional Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Admin seed — only required for seed script, not runtime
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  ADMIN_NAME: z.string().optional(),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });

    // In production, refuse to start with missing/invalid config
    if (process.env['NODE_ENV'] === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Running with invalid env vars in development mode');
    }
  }

  return result.success ? result.data : (envSchema.parse(process.env));
}

export const env = validateEnv();

export const config = {
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  port: parseInt(env.PORT, 10),
  db: {
    url: env.DATABASE_URL,
  },
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  cors: {
    clientUrl: env.CLIENT_URL,
    allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()),
  },
  upload: {
    maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
    uploadDir: env.UPLOAD_DIR,
  },
  ai: {
    apiKey: env.AI_PROVIDER_API_KEY,
    baseUrl: env.AI_PROVIDER_BASE_URL,
  },
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  },
} as const;
