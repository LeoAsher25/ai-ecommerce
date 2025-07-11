# Data Models

## Data Models

### User Model
```typescript
interface User {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Model
```typescript
interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: ObjectId;
  images: string[];
  specifications: Record<string, any>;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Model
```typescript
interface Order {
  _id: ObjectId;
  userId: ObjectId;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  phone: String (optional),
  addresses: [{
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    isDefault: Boolean
  }],
  isEmailVerified: Boolean (default: false),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  categoryId: ObjectId (ref: 'Category'),
  images: [String],
  specifications: Object,
  stock: Number (default: 0),
  isActive: Boolean (default: true),
  sku: String (unique),
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  items: [{
    productId: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number,
    name: String
  }],
  total: Number (required),
  subtotal: Number,
  tax: Number,
  shipping: Number,
  status: String (enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  slug: String (unique),
  parentId: ObjectId (ref: 'Category', optional),
  image: String,
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  productId: ObjectId (ref: 'Product'),
  rating: Number (min: 1, max: 5),
  title: String,
  comment: String,
  isApproved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Entity Relationships

### One-to-Many Relationships
- **User → Orders**: One user can have multiple orders
- **Category → Products**: One category can have multiple products
- **Product → Reviews**: One product can have multiple reviews

### Many-to-Many Relationships
- **Products ↔ Categories**: Products can belong to multiple categories
- **Users ↔ Products**: Users can have favorite products

## Data Validation

### User Validation
```typescript
class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  password: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
```

### Product Validation
```typescript
class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsMongoId()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @Min(0)
  stock: number;
}
```

### Order Validation
```typescript
class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  items: OrderItemDto[];

  @IsObject()
  @ValidateNested()
  shippingAddress: AddressDto;

  @IsString()
  paymentMethod: string;
}
```

## Data Indexing

### Performance Indexes
```javascript
// User collection indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": -1 });

// Product collection indexes
db.products.createIndex({ "categoryId": 1 });
db.products.createIndex({ "isActive": 1 });
db.products.createIndex({ "name": "text", "description": "text" });
db.products.createIndex({ "price": 1 });
db.products.createIndex({ "createdAt": -1 });

// Order collection indexes
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "createdAt": -1 });
db.orders.createIndex({ "paymentStatus": 1 });

// Review collection indexes
db.reviews.createIndex({ "productId": 1 });
db.reviews.createIndex({ "userId": 1 });
db.reviews.createIndex({ "rating": 1 });
db.reviews.createIndex({ "isApproved": 1 });
```

## Data Migration

### Migration Strategy
- **Version Control**: Database schema versions tracked
- **Rollback Support**: Reversible migrations
- **Data Preservation**: No data loss during migrations
- **Testing**: Migrations tested in staging environment

### Migration Tools
- **Mongoose Migrations**: Custom migration system
- **Version Tracking**: Schema version collection
- **Automated Testing**: Migration validation tests
- **Rollback Scripts**: Reversible migration scripts

## Data Backup

### Backup Strategy
- **Daily Backups**: Automated daily backups
- **Point-in-Time Recovery**: Continuous backup support
- **Geographic Distribution**: Multi-region backup storage
- **Encryption**: Encrypted backup storage

### Recovery Procedures
- **Automated Recovery**: Automated recovery testing
- **Manual Recovery**: Step-by-step recovery procedures
- **Data Validation**: Post-recovery data integrity checks
- **Performance Testing**: Recovery performance validation 