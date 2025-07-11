# Frontend Routing Strategy

## Routing Strategy

- **Routing Library:** Next.js App Router.
- **Route Definitions:**
  | Path Pattern | Component/Page (`src/app/...`) | Protection |
  | :--------------------- | :----------------------------------- | :-------------- |
  | `/` | `page.tsx` | Public |
  | `/products` | `products/page.tsx` | Public |
  | `/products/[slug]` | `products/[slug]/page.tsx` | Public |
  | `/cart` | `cart/page.tsx` | Public |
  | `/account/login` | `account/login/page.tsx` | Public |
  | `/account` | `account/page.tsx` | Authenticated |
- **Route Guards / Protection:** Protected routes will be handled using a wrapper component or Next.js Middleware that checks for a valid authentication token in the Redux state. Unauthenticated users will be redirected to `/account/login`.

## Next.js App Router Structure

The application uses Next.js 14 App Router for modern routing patterns:

### Route Organization

- **Feature-based Routing:** Routes are organized by feature using route groups `(features)`
- **Dynamic Routes:** Product details use dynamic segments `[slug]`
- **Nested Routes:** Account section with nested login and profile pages

### Route Protection Strategy

- **Middleware-based Protection:** Next.js middleware for authentication checks
- **Client-side Guards:** Component-level protection for sensitive routes
- **Redirect Logic:** Automatic redirection to login for unauthenticated users

### Route Structure Examples

```plaintext
src/app/
├── (features)/
│   ├── products/
│   │   ├── [slug]/page.tsx    # Dynamic product detail
│   │   └── page.tsx           # Product listing
│   ├── cart/page.tsx          # Shopping cart
│   └── account/
│       ├── login/page.tsx     # Login page
│       └── page.tsx           # Protected profile page
├── api/                       # API routes
├── globals.css                # Global styles
└── layout.tsx                 # Root layout
```
