# Project Structure

## Project Structure

### Frontend (ecommerce-fe)

```plaintext
src/
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
├── features/              # Feature-specific components
├── hooks/                 # Custom React hooks
├── services/              # API service clients
├── store/                 # Redux store
└── types/                 # TypeScript definitions
```

### Admin Panel (ecommerce-admin)

```plaintext
src/
├── app/                   # Next.js App Router
├── components/            # Admin UI components
├── services/              # Admin API services
├── hooks/                 # Custom hooks
└── types/                 # TypeScript definitions
```

### Backend (ecommerce-be)

```plaintext
src/
├── modules/               # Feature modules
├── auth/                  # Authentication
├── common/                # Shared utilities
├── configs/               # Configuration
└── types/                 # TypeScript definitions
```

## Detailed Directory Structure

### Frontend Application Structure

```plaintext
ecommerce-fe/
├── public/                # Static assets
│   ├── images/           # Image assets
│   ├── icons/            # Icon assets
│   └── favicon.ico       # Favicon
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (site)/       # Site routes
│   │   │   ├── products/ # Product pages
│   │   │   ├── cart/     # Cart page
│   │   │   └── account/  # Account pages
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable components
│   │   ├── ui/          # Atomic UI components
│   │   ├── layout/      # Layout components
│   │   └── common/      # Common components
│   ├── features/        # Feature-specific code
│   │   ├── cart/        # Shopping cart feature
│   │   ├── checkout/    # Checkout feature
│   │   └── auth/        # Authentication feature
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service clients
│   │   ├── api.ts       # Base API client
│   │   ├── auth.ts      # Auth service
│   │   └── products.ts  # Product service
│   ├── store/           # Redux store
│   │   ├── index.ts     # Store configuration
│   │   └── slices/      # Redux slices
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Admin Panel Structure

```plaintext
ecommerce-admin/
├── public/               # Static assets
│   ├── images/          # Admin images
│   └── icons/           # Admin icons
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/      # Authentication routes
│   │   ├── (dashboard)/ # Dashboard routes
│   │   │   ├── products/    # Product management
│   │   │   ├── orders/      # Order management
│   │   │   ├── users/       # User management
│   │   │   └── settings/    # Admin settings
│   │   ├── api/         # API routes
│   │   └── layout.tsx   # Admin layout
│   ├── components/      # Admin components
│   │   ├── ui/         # UI components
│   │   ├── forms/      # Form components
│   │   └── tables/     # Table components
│   ├── services/       # Admin API services
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utility functions
├── package.json         # Dependencies
└── next.config.js       # Next.js configuration
```

### Backend Structure

```plaintext
ecommerce-be/
├── src/
│   ├── modules/         # Feature modules
│   │   ├── user/        # User management
│   │   │   ├── dto/     # Data transfer objects
│   │   │   ├── entities/ # Database entities
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── product/     # Product management
│   │   ├── order/       # Order management
│   │   ├── auth/        # Authentication
│   │   └── file/        # File upload
│   ├── common/          # Shared utilities
│   │   ├── decorators/  # Custom decorators
│   │   ├── filters/     # Exception filters
│   │   ├── guards/      # Route guards
│   │   ├── interceptors/ # Request/response interceptors
│   │   └── utils/       # Utility functions
│   ├── configs/         # Configuration
│   │   ├── database/    # Database configuration
│   │   ├── auth.config.ts
│   │   └── app.config.ts
│   ├── types/           # TypeScript definitions
│   ├── app.controller.ts # Main controller
│   ├── app.service.ts   # Main service
│   ├── app.module.ts    # Main module
│   └── main.ts          # Application entry point
├── test/                # Test files
├── db/                  # Database files
├── nginx/               # Nginx configuration
├── package.json         # Dependencies
├── docker-compose.yml   # Docker configuration
└── Dockerfile           # Docker build file
```

## Module Organization

### Frontend Module Structure

```plaintext
src/features/
├── cart/                # Shopping cart feature
│   ├── components/      # Cart-specific components
│   ├── hooks/          # Cart-specific hooks
│   ├── services/       # Cart API services
│   └── types/          # Cart type definitions
├── checkout/           # Checkout feature
│   ├── components/     # Checkout components
│   ├── hooks/         # Checkout hooks
│   ├── services/      # Checkout services
│   └── types/         # Checkout types
├── auth/              # Authentication feature
│   ├── components/    # Auth components
│   ├── hooks/        # Auth hooks
│   ├── services/     # Auth services
│   └── types/        # Auth types
└── products/          # Product feature
    ├── components/    # Product components
    ├── hooks/        # Product hooks
    ├── services/     # Product services
    └── types/        # Product types
```

### Backend Module Structure

```plaintext
src/modules/
├── user/               # User management module
│   ├── dto/           # Data transfer objects
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── user-response.dto.ts
│   ├── entities/      # Database entities
│   │   └── user.entity.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.repository.ts
│   └── user.module.ts
├── product/           # Product management module
│   ├── dto/
│   ├── entities/
│   ├── product.controller.ts
│   ├── product.service.ts
│   └── product.module.ts
├── order/            # Order management module
│   ├── dto/
│   ├── entities/
│   ├── order.controller.ts
│   ├── order.service.ts
│   └── order.module.ts
└── auth/             # Authentication module
    ├── dto/
    ├── strategies/
    ├── guards/
    ├── auth.controller.ts
    ├── auth.service.ts
    └── auth.module.ts
```

## Configuration Files

### Frontend Configuration

```typescript
// next.config.js
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["your-s3-bucket.s3.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

// tailwind.config.ts
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
```

### Backend Configuration

```typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// database.module.ts
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

## Asset Organization

### Static Assets

```plaintext
public/
├── images/              # Image assets
│   ├── products/       # Product images
│   ├── banners/        # Banner images
│   ├── icons/          # Icon images
│   └── logos/          # Logo images
├── fonts/              # Custom fonts
├── icons/              # SVG icons
└── favicon.ico         # Favicon
```

### Component Assets

```plaintext
src/components/
├── ui/                 # Atomic UI components
│   ├── Button/         # Button component
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/          # Input component
│   └── Card/           # Card component
├── layout/             # Layout components
│   ├── Header/         # Header component
│   ├── Footer/         # Footer component
│   └── Sidebar/        # Sidebar component
└── common/             # Common components
    ├── Loading/        # Loading component
    ├── Error/          # Error component
    └── Modal/          # Modal component
```

## Testing Structure

### Frontend Testing

```plaintext
src/
├── __tests__/          # Test files
│   ├── components/     # Component tests
│   ├── hooks/         # Hook tests
│   ├── services/      # Service tests
│   └── utils/         # Utility tests
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
└── jest.config.js     # Jest configuration
```

### Backend Testing

```plaintext
src/
├── __tests__/         # Test files
│   ├── modules/       # Module tests
│   ├── common/        # Common tests
│   └── e2e/          # End-to-end tests
├── modules/
│   └── user/
│       ├── user.controller.spec.ts
│       ├── user.service.spec.ts
│       └── user.repository.spec.ts
└── jest.config.js    # Jest configuration
```

## Documentation Structure

### Project Documentation

```plaintext
docs/
├── architecture.md     # System architecture
├── api-reference.md   # API documentation
├── data-models.md     # Data models
├── environment-vars.md # Environment variables
├── project-structure.md # Project structure
├── deployment.md      # Deployment guide
├── templates/         # Documentation templates
├── checklists/        # Quality checklists
└── tasks/            # Project tasks
```

### Code Documentation

```plaintext
src/
├── README.md          # Module README
├── components/
│   └── Button/
│       ├── README.md  # Component documentation
│       └── Button.tsx
└── modules/
    └── user/
        ├── README.md  # Module documentation
        └── user.service.ts
```
