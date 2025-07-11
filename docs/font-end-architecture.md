# Frontend Architecture Document: Top xe đạp E-commerce Platform

- **Version:** 1.0
- **Date:** July 10, 2025
- **Author:** Jane, Design Architect

## Introduction

This document details the technical architecture specifically for the frontend of the "Top xe đạp" project. It complements the main System Architecture Document (to be created by Fred, the Architect) and the UI/UX Specification. The goal is to provide a clear and robust blueprint for frontend development, ensuring consistency, scalability, maintainability, and a high-quality user experience.

- **Link to Main Architecture Document (REQUIRED):** `docs/architecture.md` (pending)
- **Link to UI/UX Specification (REQUIRED):** `docs/ui-ux-spec.md` (completed)
- **Link to Primary Design Files (Figma, Sketch, etc.):** As specified in the UI/UX Spec

## Overall Frontend Philosophy & Patterns

- **Framework & Core Libraries:** The frontend will be built using **React (v18.x)** with the **Next.js (v14.x)** framework. [cite\_start]This choice provides a powerful foundation with server-side rendering (SSR) and static site generation (SSG) for optimal performance and SEO, which are critical for an e-commerce site. [cite: 927]
- **Component Architecture:** We will adopt a hybrid approach. A foundational, reusable component library will be organized using **Atomic Design** principles (e.g., atoms, molecules) located in `src/components/ui`. Feature-specific components (e.g., components for the checkout flow) will be co-located within their respective feature directories.
- **State Management Strategy:**
  - **Global Client State:** **Redux Toolkit** will be used for managing global UI state that needs to be shared across the application, such as the shopping cart contents and user authentication status.
  - **Server State & Caching:** **TanStack Query (React Query)** will be used to manage all server state. This includes fetching, caching, and updating data from our backend, such as products, user profiles, and orders. It elegantly handles loading states, errors, and data synchronization.
- **Styling Approach:** **Tailwind CSS** will be the primary styling framework for its utility-first approach, enabling rapid development and easy-to-maintain styling. For complex, encapsulated component styles, **CSS Modules** will be used in conjunction with Tailwind's `@apply` directive.
- **Key Design Patterns Used:**
  - **Container/Presentational Pattern:** To separate business logic (data fetching, state management) from pure UI rendering.
  - **React Hooks:** To encapsulate and reuse stateful logic.
  - **Service Pattern:** API calls will be abstracted into dedicated service modules for clarity and maintainability.

## Detailed Frontend Directory Structure

The project will follow a structure based on the Next.js App Router to promote scalability and feature-based modularity.

```plaintext
src/
├── app/                        # Next.js App Router: Pages, Layouts, Routes.
│   ├── (features)/             # Feature-based routing groups
│   │   ├── products/
│   │   │   ├── [slug]/page.tsx # Product Detail Page
│   │   │   └── page.tsx        # Product Listing Page
│   │   ├── cart/page.tsx       # Shopping Cart Page
│   │   └── account/
│   │       ├── login/page.tsx
│   │       └── page.tsx        # Protected user profile page
│   ├── api/                    # API Routes (Next.js backend features).
│   ├── globals.css             # Global styles, Tailwind directives.
│   └── layout.tsx              # Root layout for the entire application.
├── components/                 # Shared/Reusable UI Components.
│   ├── ui/                     # Atomic UI elements (Button, Input, Card).
│   │   ├── Button.tsx
│   │   └── ...
│   └── layout/                 # Layout components (Header, Footer, Sidebar).
├── features/                   # Feature-specific logic, hooks, and complex components.
│   └── perfect-fit-finder/
│       ├── components/         # Components used only by the finder
│       │   └── FitFinderQuiz.tsx
│       └── useFitFinder.ts     # Custom hook for finder logic
├── hooks/                      # Global/sharable custom React Hooks.
├── lib/                        # Utility functions, helpers, constants.
│   └── utils.ts
├── services/                   # API service clients and SDK configurations.
│   ├── apiClient.ts            # Central Axios instance setup
│   └── product.service.ts      # API calls related to products
├── store/                      # Global Redux state management setup.
│   ├── index.ts                # Main store configuration.
│   └── slices/
│       └── cart.slice.ts       # Redux slice for the shopping cart
└── types/                      # Global TypeScript type definitions.
    └── index.ts
```

## Component Breakdown & Implementation Details

### Component Naming & Organization

- **Naming Convention:** Components will be named using `PascalCase`. Files will be `PascalCase.tsx`.
- **Organization:** Globally reusable UI atoms/molecules go in `src/components/ui/`. Components that compose layouts go in `src/components/layout/`. Complex components used only within a specific feature are co-located in `src/features/[feature-name]/components/`.

### Template for Component Specification

All new components will be defined in stories using this template to ensure clarity for developers.

````markdown
#### Component: `{ComponentName}`

- **Purpose:** {Briefly describe what this component does.}
- **Source File(s):** {e.g., `src/features/feature-name/components/ComponentName.tsx`}
- **Visual Reference:** {Link to specific Figma frame.}
- **Props (Properties):**
  | Prop Name | Type | Required? | Default Value | Description |
  | :--- | :--- | :--- | :--- | :--- |
- **Internal State (if any):**
  | State Variable | Type | Initial Value | Description |
  | :--- | :--- | :--- | :--- |
- **Key UI Elements / Structure:**
  ```html

  ```
- **Actions Triggered (Side Effects):**
  - **State Management:** {e.g., Dispatches `cartSlice.actions.addItem()`.}
  - **API Calls:** {e.g., Calls `productService.fetchProducts()`.}
- **Styling Notes:** {e.g., "Uses `Button` component with `variant='primary'`." or "Container uses `p-4 bg-white`."}
- **Accessibility Notes:** {e.g., "Must have `aria-label` for icon buttons."}
````

### Example: `PerfectFitFinder` Component

- **Component:** `FitFinderQuiz`
- **Purpose:** A multi-step quiz to guide parents to the correct bike size for their child.
- **Source File(s):** `src/features/perfect-fit-finder/components/FitFinderQuiz.tsx`
- **Visual Reference:** [Link to Figma Frame for Fit Finder]
- **Props:**
  | Prop Name | Type | Required? | Default Value | Description |
  | :--------------- | :-------------------------------- | :-------- | :------------ | :-------------------------------------------- |
  | `onComplete` | `(results: Product[]) => void` | Yes | N/A | Callback function when the quiz is finished. |
- **Internal State:**
  | State Variable | Type | Initial Value | Description |
  | :--------------- | :-------------------------------- | :------------ | :-------------------------------------------- |
  | `currentStep` | `number` | 1 | Tracks the current step of the quiz. |
  | `formData` | `{ age: number; height: number; }` | `{}` | Stores the user's answers. |
- **Key UI Elements / Structure:**
  ```html
  <div> <progress value={currentStep} max="3"></progress>
    <div style={currentStep === 1 ? 'display:block' : 'display:none'}>
      <h2>How old is the rider?</h2>
      <input type="number" />
    </div>
    <button>Next Step</button>
  </div>
  ```
- **Actions Triggered:**
  - **API Calls:** On the final step, calls a service function `fitFinderService.getRecommendations(formData)`.
- **Styling Notes:** Uses primary brand colors for buttons and progress indicators. Inputs are large and touch-friendly.
- **Accessibility Notes:** Each step should be announced by screen readers. All form inputs must have associated labels.

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

## API Interaction Layer

- **HTTP Client Setup:** A single Axios instance will be configured in `src/services/apiClient.ts`. It will include:
  - Base URL loaded from `process.env.NEXT_PUBLIC_API_URL`.
  - Interceptors to automatically attach authentication tokens to requests.
  - Standardized error handling to normalize API error responses.
- **Service Definitions:** API calls will be grouped by resource in the `src/services/` directory. Example: `product.service.ts` will contain functions like `fetchProducts(category: string)` and `fetchProductBySlug(slug: string)`.

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

## Build, Bundling, and Deployment

- **Build Scripts:** Standard `package.json` scripts: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`.
- **Environment Configuration:** Managed via `.env` files (e.g., `.env.local`). All secret keys must be on the server-side; frontend will use `NEXT_PUBLIC_` prefixed variables.
- **Key Bundling Optimizations:** Next.js automatically handles code splitting by route. `React.lazy` and `dynamic()` will be used for large components that are not needed on initial load.
- **Deployment to CDN/Hosting:** The application will be deployed to **Vercel**. This platform is optimized for Next.js and provides seamless CI/CD, global CDN, and serverless functions out-of-the-box.

## Frontend Testing Strategy

- **Component Testing:** **Jest** and **React Testing Library** will be used to test individual components in isolation. Focus will be on rendering, props, and user interactions.
- **UI Integration/Flow Testing:** React Testing Library will also be used to test small user flows composed of multiple components. API calls will be mocked using **Mock Service Worker (MSW)**.
- **End-to-End UI Testing:** **Playwright** will be used to run automated tests on critical user journeys (e.g., the full purchase flow) in a real browser environment.

## Accessibility (AX) Implementation Details

- **Standard:** WCAG 2.1 Level AA.
- **Implementation:** Emphasis on semantic HTML, full keyboard navigability, and sufficient color contrast as defined in the UI/UX spec.
- **Testing:** Automated accessibility checks will be run with `jest-axe` in our component tests. Manual testing with screen readers (NVDA, VoiceOver) will be performed before major releases.

## Change Log

| Change | Date | Version | Description | Author |
| :----- | :--- | :------ | :---------- | :----- |
