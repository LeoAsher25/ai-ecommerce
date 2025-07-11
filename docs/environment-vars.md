# Environment Variables

## Environment Variables Documentation

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Top xe đạp
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
MONGODB_DB_NAME=ecommerce

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3001
NODE_ENV=development
```

## Environment Configuration

### Development Environment

```env
# Development Settings
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug

# Database (Development)
MONGODB_URI=mongodb://localhost:27017/ecommerce_dev
MONGODB_DB_NAME=ecommerce_dev

# JWT (Development)
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# File Storage (Development)
AWS_ACCESS_KEY_ID=dev-access-key
AWS_SECRET_ACCESS_KEY=dev-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=ecommerce-dev-bucket

# Email (Development)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=dev-email@example.com
SMTP_PASS=dev-password

# Frontend (Development)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Top xe đạp (Dev)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_dev_key
```

### Staging Environment

```env
# Staging Settings
NODE_ENV=staging
PORT=3001
LOG_LEVEL=info

# Database (Staging)
MONGODB_URI=mongodb://staging-mongo:27017/ecommerce_staging
MONGODB_DB_NAME=ecommerce_staging

# JWT (Staging)
JWT_SECRET=staging-secret-key
JWT_EXPIRES_IN=7d

# File Storage (Staging)
AWS_ACCESS_KEY_ID=staging-access-key
AWS_SECRET_ACCESS_KEY=staging-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=ecommerce-staging-bucket

# Email (Staging)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=staging@yourdomain.com
SMTP_PASS=staging-app-password

# Frontend (Staging)
NEXT_PUBLIC_API_URL=https://api-staging.yourdomain.com/api
NEXT_PUBLIC_APP_NAME=Top xe đạp (Staging)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_staging_key
```

### Production Environment

```env
# Production Settings
NODE_ENV=production
PORT=3001
LOG_LEVEL=warn

# Database (Production)
MONGODB_URI=mongodb+srv://prod-user:prod-password@cluster.mongodb.net/ecommerce_prod
MONGODB_DB_NAME=ecommerce_prod

# JWT (Production)
JWT_SECRET=production-secret-key-very-long-and-secure
JWT_EXPIRES_IN=7d

# File Storage (Production)
AWS_ACCESS_KEY_ID=production-access-key
AWS_SECRET_ACCESS_KEY=production-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=ecommerce-production-bucket

# Email (Production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=production-app-password

# Frontend (Production)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_NAME=Top xe đạp
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_production_key
```

## Security Configuration

### JWT Configuration

```env
# JWT Settings
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d
JWT_ISSUER=top-xe-dap-api
JWT_AUDIENCE=top-xe-dap-users
```

### Database Security

```env
# MongoDB Security
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_DB_NAME=ecommerce
MONGODB_AUTH_SOURCE=admin
MONGODB_REPLICA_SET=rs0
MONGODB_SSL=true
MONGODB_SSL_VALIDATE=false
```

### AWS S3 Configuration

```env
# AWS S3 Settings
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
AWS_S3_ENDPOINT=https://s3.amazonaws.com
AWS_S3_FORCE_PATH_STYLE=false
AWS_S3_SIGNATURE_VERSION=v4
```

## Email Configuration

### SMTP Settings

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_IGNORE_TLS=false
SMTP_NAME=Top xe đạp
```

### Email Templates

```env
# Email Template Settings
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Top xe đạp
EMAIL_REPLY_TO=support@yourdomain.com
EMAIL_SUBJECT_PREFIX=[Top xe đạp]
```

## Monitoring and Logging

### Logging Configuration

```env
# Logging Settings
LOG_LEVEL=info
LOG_FORMAT=json
LOG_COLORIZE=false
LOG_TIMESTAMP=true
LOG_FILE_PATH=./logs
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5
```

### Monitoring Configuration

```env
# Monitoring Settings
ENABLE_METRICS=true
METRICS_PORT=9090
ENABLE_HEALTH_CHECKS=true
HEALTH_CHECK_INTERVAL=30s
ENABLE_TRACING=false
TRACING_SERVICE_NAME=top-xe-dap-api
```

## Feature Flags

### Feature Toggles

```env
# Feature Flags
ENABLE_REGISTRATION=true
ENABLE_EMAIL_VERIFICATION=true
ENABLE_SOCIAL_LOGIN=false
ENABLE_PAYMENT_PROCESSING=true
ENABLE_REVIEW_SYSTEM=true
ENABLE_NOTIFICATIONS=true
ENABLE_ANALYTICS=true
ENABLE_CACHE=true
```

### Cache Configuration

```env
# Cache Settings
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_DB=0
CACHE_TTL=3600
CACHE_MAX_SIZE=100
CACHE_STRATEGY=lru
```

## Third-Party Services

### Stripe Configuration

```env
# Stripe Settings
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_CURRENCY=usd
STRIPE_PAYMENT_METHODS=card,sepa_debit
```

### Google OAuth

```env
# Google OAuth Settings
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### Social Media

```env
# Social Media Settings
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
```

## Environment Validation

### Required Variables

```typescript
interface EnvironmentConfig {
  // Database
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;

  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;

  // AWS S3
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_S3_BUCKET: string;

  // Email
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;

  // Server
  PORT: number;
  NODE_ENV: "development" | "staging" | "production";
}
```

### Validation Schema

```typescript
const environmentSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  MONGODB_DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_S3_BUCKET: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().email().required(),
  SMTP_PASS: Joi.string().required(),
  PORT: Joi.number().port().default(3001),
  NODE_ENV: Joi.string()
    .valid("development", "staging", "production")
    .default("development"),
});
```
