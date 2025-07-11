# Frontend State Management

## State Management In-Depth

- **Chosen Solution:** Redux Toolkit (for global state) & TanStack Query (for server state).
- **Store Structure / Slices:** Global state will be organized into feature-based slices located in `src/store/slices/`.
  - **Example: `cart.slice.ts`**
    - **Purpose:** Manages the state of the shopping cart.
    - **State Shape:**
      ```typescript
      interface CartItem {
        productId: string;
        name: string;
        price: number;
        quantity: number;
      }
      interface CartState {
        items: CartItem[];
        status: "idle" | "loading";
      }
      ```
    - **Key Reducers:** `addItem`, `removeItem`, `updateQuantity`.
    - **Selectors:** `selectCartItems`, `selectCartTotal`.

## State Management Strategy

- **Global Client State:** **Redux Toolkit** will be used for managing global UI state that needs to be shared across the application, such as the shopping cart contents and user authentication status.
- **Server State & Caching:** **TanStack Query (React Query)** will be used to manage all server state. This includes fetching, caching, and updating data from our backend, such as products, user profiles, and orders. It elegantly handles loading states, errors, and data synchronization.

## Key Design Patterns Used

- **Container/Presentational Pattern:** To separate business logic (data fetching, state management) from pure UI rendering.
- **React Hooks:** To encapsulate and reuse stateful logic.
- **Service Pattern:** API calls will be abstracted into dedicated service modules for clarity and maintainability.
