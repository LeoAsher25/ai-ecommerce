# Component View

## Component View

### Architectural Patterns

#### Frontend Patterns

- **Atomic Design**: Component organization (atoms, molecules, organisms)
- **Container/Presentational**: Separation of business logic and UI
- **Service Pattern**: API abstraction layer
- **Redux Toolkit**: Global state management
- **TanStack Query**: Server state management

#### Backend Patterns

- **Module Pattern**: Feature-based module organization
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation
- **Guard Pattern**: Route protection
- **Interceptor Pattern**: Request/response transformation

### Design Patterns Adopted

#### Frontend

- **Observer Pattern**: Redux state subscriptions
- **Factory Pattern**: Component creation utilities
- **Strategy Pattern**: Different payment methods
- **Adapter Pattern**: API service adapters

#### Backend

- **Dependency Injection**: NestJS IoC container
- **Repository Pattern**: Data access layer
- **Factory Pattern**: Service creation
- **Strategy Pattern**: Authentication strategies

## Frontend Component Architecture

### Atomic Design Implementation

```typescript
// Atoms - Basic building blocks
interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

// Molecules - Simple component combinations
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

// Organisms - Complex UI sections
interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onLoadMore: () => void;
  filters: ProductFilters;
}
```

### Component Hierarchy

```plaintext
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── UserMenu
│   ├── Main
│   │   ├── ProductGrid
│   │   │   ├── ProductCard
│   │   │   │   ├── ProductImage
│   │   │   │   ├── ProductInfo
│   │   │   │   └── AddToCartButton
│   │   │   └── ProductFilters
│   │   └── ShoppingCart
│   │       ├── CartItem
│   │       ├── CartSummary
│   │       └── CheckoutButton
│   └── Footer
└── Modals
    ├── ProductModal
    └── CheckoutModal
```

## Backend Module Architecture

### Module Structure

```typescript
// User Module
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

// Product Module
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
```

### Service Layer Pattern

```typescript
// Service Interface
interface IUserService {
  createUser(userData: CreateUserDto): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(id: string, userData: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

// Service Implementation
@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
}
```

## Data Flow Architecture

### Frontend Data Flow

```typescript
// Redux Store Structure
interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductsState;
  orders: OrdersState;
}

// API Service Pattern
class ProductService {
  async getProducts(filters: ProductFilters): Promise<Product[]> {
    const response = await apiClient.get("/products", { params: filters });
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  }
}
```

### Backend Data Flow

```typescript
// Controller Layer
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() filters: ProductFiltersDto): Promise<Product[]> {
    return this.productService.getProducts(filters);
  }
}

// Service Layer
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(filters: ProductFilters): Promise<Product[]> {
    return this.productRepository.find(filters);
  }
}

// Repository Layer
@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async find(filters: ProductFilters): Promise<Product[]> {
    return this.productModel.find(filters).exec();
  }
}
```

## Component Communication

### Frontend Communication Patterns

```typescript
// Props Drilling (avoid when possible)
const ProductList = ({ products, onAddToCart }) => (
  <div>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ))}
  </div>
);

// Context Pattern
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => [...prev, { product, quantity: 1 }]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Redux Pattern
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
```

### Backend Communication Patterns

```typescript
// Event Emitter Pattern
@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create(orderData);

    this.eventEmitter.emit("order.created", order);

    return order;
  }
}

// Observer Pattern
@Injectable()
export class EmailService {
  @OnEvent("order.created")
  async handleOrderCreated(order: Order) {
    await this.sendOrderConfirmationEmail(order);
  }
}
```

## Component Lifecycle

### Frontend Component Lifecycle

```typescript
// React Component Lifecycle
const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <ErrorMessage />;

  return <ProductCard product={product} />;
};
```

### Backend Component Lifecycle

```typescript
// NestJS Module Lifecycle
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    // Database connection logic
  }

  private async disconnect() {
    // Database disconnection logic
  }
}
```

## Error Handling Patterns

### Frontend Error Handling

```typescript
// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

// API Error Handling
const useApiError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((error: any) => {
    const apiError = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
    };
    setError(apiError);
  }, []);

  return { error, handleError, clearError: () => setError(null) };
};
```

### Backend Error Handling

```typescript
// Global Exception Filter
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Internal server error";

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

// Service Error Handling
@Injectable()
export class ProductService {
  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to fetch product");
    }
  }
}
```

## Performance Optimization

### Frontend Performance

```typescript
// React.memo for component memoization
const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});

// useMemo for expensive calculations
const ProductList = ({ products, filters }) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return filters.category ? product.category === filters.category : true;
    });
  }, [products, filters]);

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// useCallback for stable function references
const ProductGrid = ({ products }) => {
  const handleAddToCart = useCallback((productId: string) => {
    // Add to cart logic
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
```

### Backend Performance

```typescript
// Database query optimization
@Injectable()
export class ProductRepository {
  async findWithPagination(page: number, limit: number): Promise<Product[]> {
    return this.productModel
      .find({ isActive: true })
      .select("name price image category")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
  }

  async findByIdWithCategory(id: string): Promise<Product> {
    return this.productModel
      .findById(id)
      .populate("category", "name")
      .lean()
      .exec();
  }
}

// Caching with Redis
@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cacheService: CacheService
  ) {}

  async getProductById(id: string): Promise<Product> {
    const cacheKey = `product:${id}`;

    let product = await this.cacheService.get(cacheKey);

    if (!product) {
      product = await this.productRepository.findById(id);
      await this.cacheService.set(cacheKey, product, 3600); // 1 hour
    }

    return product;
  }
}
```
