import { config } from 'dotenv';
config();

const SYSTEM_ENV = {
  // APPLICATION CONFIG
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  // Database config
  MONGO_URI: process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/ecommerce?authSource=admin',
  MONGO_USER: process.env.MONGO_USER || 'admin',
  MONGO_PASS: process.env.MONGO_PASS || 'admin',
  MONGO_DB: process.env.MONGO_DB || 'ecommerce',

  // JWT config
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? 'JWT_ACCESS_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '15m',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET ?? 'JWT_REFRESH_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ?? '30d',
  SALT_ROUNDS: 12,

  // WEB CONFIG
  WEB_URL: process.env.WEB_URL ?? 'http://localhost:3000',

  // OTP config
  OTP_EXPIRE: process.env.OTP_EXPIRE ?? '5m',
  OTP_SECRET: process.env.OTP_SECRET ?? 'OTP_SECRET',

  // Upload config
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE ?? '10mb',
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES ?? 'image/*',
  IMAGE_UPLOAD_DIR: process.env.IMAGE_UPLOAD_DIR ?? 'uploads',

  // Google config
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',

  // AWS config
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? '',

  // Email config
  EMAIL_HOST: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
  EMAIL_PORT: Number(process.env.EMAIL_PORT) ?? 465,
  EMAIL_USER: process.env.EMAIL_USER ?? '',
  SYSTEM_EMAIL: process.env.SYSTEM_EMAIL ?? '',
  SYSTEM_EMAIL_PASSWORD: process.env.SYSTEM_EMAIL_PASSWORD ?? '',

  // Application URL for serving files
  APP_URL: process.env.APP_URL || 'http://localhost:3333',

  // Storage config (internal use only)
  STORAGE_TYPE: process.env.STORAGE_TYPE || 'S3',
};

export default SYSTEM_ENV;
