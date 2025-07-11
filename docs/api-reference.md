# API Reference

## API Reference

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### Product Endpoints

- `GET /products` - List products with filtering
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### User Endpoints

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/orders` - Get user orders
- `POST /users/addresses` - Add user address

### Order Endpoints

- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/status` - Update order status
- `GET /orders` - List orders (admin)

## API Service Interfaces

### Authentication Service

```typescript
interface AuthService {
  login(credentials: LoginDto): Promise<AuthResponse>;
  register(userData: RegisterDto): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  verifyToken(token: string): Promise<User>;
}
```

### Product Service

```typescript
interface ProductService {
  getProducts(filters: ProductFilters): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
  createProduct(productData: CreateProductDto): Promise<Product>;
  updateProduct(id: string, productData: UpdateProductDto): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  searchProducts(query: string): Promise<Product[]>;
}
```

### User Service

```typescript
interface UserService {
  getProfile(userId: string): Promise<User>;
  updateProfile(userId: string, userData: UpdateUserDto): Promise<User>;
  getUserOrders(userId: string): Promise<Order[]>;
  addAddress(userId: string, address: AddressDto): Promise<Address>;
  updateAddress(
    userId: string,
    addressId: string,
    address: AddressDto
  ): Promise<Address>;
  deleteAddress(userId: string, addressId: string): Promise<void>;
}
```

### Order Service

```typescript
interface OrderService {
  createOrder(orderData: CreateOrderDto): Promise<Order>;
  getOrderById(orderId: string): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  getAllOrders(filters: OrderFilters): Promise<Order[]>;
  cancelOrder(orderId: string): Promise<Order>;
}
```

## API Response Formats

### Standard Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  errors: string[];
  statusCode: number;
  timestamp: string;
}
```

## API Authentication

### JWT Token Structure

```typescript
interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
```

### Authentication Headers

```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

## API Rate Limiting

### Rate Limit Configuration

- **Authentication Endpoints**: 5 requests per minute
- **Product Endpoints**: 100 requests per minute
- **Order Endpoints**: 20 requests per minute
- **User Endpoints**: 50 requests per minute

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## API Versioning

### Version Strategy

- **Current Version**: v1
- **Version Header**: `Accept: application/vnd.api+json;version=1`
- **URL Versioning**: `/api/v1/endpoint`
- **Backward Compatibility**: Maintained for 12 months

## API Documentation

### Swagger/OpenAPI

- **Swagger UI**: Available at `/api/docs`
- **OpenAPI Spec**: Available at `/api/docs-json`
- **Interactive Testing**: Built-in API testing interface

### API Testing

- **Postman Collection**: Available for import
- **Insomnia Collection**: Available for import
- **cURL Examples**: Provided for each endpoint

## API Security

### CORS Configuration

```typescript
const corsOptions = {
  origin: ["http://localhost:3000", "https://yourdomain.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
```

### Input Validation

- **DTO Validation**: Class-validator decorators
- **Sanitization**: Input sanitization middleware
- **Type Checking**: TypeScript strict mode
- **Schema Validation**: Joi for complex validation

## API Monitoring

### Health Check Endpoints

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system status
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

### Metrics Endpoints

- `GET /metrics` - Application metrics
- `GET /metrics/prometheus` - Prometheus format
- `GET /metrics/health` - Health metrics
