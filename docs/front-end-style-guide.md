# Frontend Style Guide

## Styling Approach

- **Styling Approach:** **Tailwind CSS** will be the primary styling framework for its utility-first approach, enabling rapid development and easy-to-maintain styling. For complex, encapsulated component styles, **CSS Modules** will be used in conjunction with Tailwind's `@apply` directive.

## Overall Frontend Philosophy & Patterns

- **Framework & Core Libraries:** The frontend will be built using **React (v18.x)** with the **Next.js (v14.x)** framework. This choice provides a powerful foundation with server-side rendering (SSR) and static site generation (SSG) for optimal performance and SEO, which are critical for an e-commerce site.
- **Component Architecture:** We will adopt a hybrid approach. A foundational, reusable component library will be organized using **Atomic Design** principles (e.g., atoms, molecules) located in `src/components/ui`. Feature-specific components (e.g., components for the checkout flow) will be co-located within their respective feature directories.

## Tailwind CSS Implementation

### Utility-First Approach

- **Primary Framework:** Tailwind CSS for rapid development
- **Customization:** Extended theme configuration for brand colors and spacing
- **Responsive Design:** Built-in responsive utilities for mobile-first approach

### CSS Modules Integration

- **Complex Components:** CSS Modules for encapsulated component styles
- **Tailwind Integration:** Use `@apply` directive to leverage Tailwind utilities
- **Scoped Styling:** Component-specific styles without global conflicts

### Brand Color System

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          900: '#0f172a',
        },
      },
    },
  },
};
```

## Component Styling Patterns

### Atomic Design Implementation

- **Atoms:** Basic UI elements (Button, Input, Typography)
- **Molecules:** Simple component combinations (SearchBar, ProductCard)
- **Organisms:** Complex UI sections (Header, ProductGrid)
- **Templates:** Page layouts and structure
- **Pages:** Complete page implementations

### Styling Best Practices

- **Consistency:** Use design tokens for colors, spacing, and typography
- **Accessibility:** Ensure sufficient color contrast and focus states
- **Performance:** Minimize CSS bundle size with Tailwind's purge
- **Maintainability:** Use semantic class names and component composition

## Responsive Design Strategy

### Mobile-First Approach

- **Base Styles:** Mobile-optimized default styles
- **Breakpoints:** Progressive enhancement for larger screens
- **Touch Targets:** Minimum 44px touch targets for mobile
- **Performance:** Optimized images and lazy loading for mobile

### Breakpoint System

```css
/* Tailwind breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large screens */
```

## Accessibility in Styling

### WCAG 2.1 Level AA Compliance

- **Color Contrast:** Minimum 4.5:1 ratio for normal text
- **Focus Indicators:** Visible focus states for keyboard navigation
- **Typography:** Readable font sizes and line heights
- **Touch Targets:** Adequate size for touch interactions

### Screen Reader Support

- **Semantic HTML:** Proper heading hierarchy and landmarks
- **ARIA Labels:** Descriptive labels for interactive elements
- **Alternative Text:** Meaningful alt text for images
- **Skip Links:** Keyboard navigation shortcuts
