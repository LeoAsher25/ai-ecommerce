# Frontend Project Structure

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

## Component Naming & Organization

- **Naming Convention:** Components will be named using `PascalCase`. Files will be `PascalCase.tsx`.
- **Organization:** Globally reusable UI atoms/molecules go in `src/components/ui/`. Components that compose layouts go in `src/components/layout/`. Complex components used only within a specific feature are co-located in `src/features/[feature-name]/components/`.

## Template for Component Specification

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

## Example: `PerfectFitFinder` Component

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
