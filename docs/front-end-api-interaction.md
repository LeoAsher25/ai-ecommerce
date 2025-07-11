# Frontend API Interaction Layer

## API Interaction Layer

- **HTTP Client Setup:** A single Axios instance will be configured in `src/services/apiClient.ts`. It will include:
  - Base URL loaded from `process.env.NEXT_PUBLIC_API_URL`.
  - Interceptors to automatically attach authentication tokens to requests.
  - Standardized error handling to normalize API error responses.
- **Service Definitions:** API calls will be grouped by resource in the `src/services/` directory. Example: `product.service.ts` will contain functions like `fetchProducts(category: string)` and `fetchProductBySlug(slug: string)`.

## API Service Structure

The API interaction layer is organized to provide clear separation of concerns and maintainability:

### Service Organization

- **Location:** `src/services/`
- **Pattern:** One service file per resource/domain
- **Examples:**
  - `product.service.ts` - Product-related API calls
  - `auth.service.ts` - Authentication-related API calls
  - `order.service.ts` - Order-related API calls

### HTTP Client Configuration

- **Base Configuration:** Centralized Axios instance in `src/services/apiClient.ts`
- **Environment Variables:** API base URL from `NEXT_PUBLIC_API_URL`
- **Authentication:** Automatic token attachment via interceptors
- **Error Handling:** Standardized error response normalization

### Service Function Patterns

```typescript
// Example service function pattern
export const productService = {
  fetchProducts: async (category?: string) => {
    const response = await apiClient.get("/products", { params: { category } });
    return response.data;
  },

  fetchProductBySlug: async (slug: string) => {
    const response = await apiClient.get(`/products/${slug}`);
    return response.data;
  },
};
```
