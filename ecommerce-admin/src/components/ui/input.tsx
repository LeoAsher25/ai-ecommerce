import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'border-input file:text-foreground placeholder:text-secondary focus-visible:ring-ring flex h-11 w-full rounded-lg border bg-white px-3 py-1 transition-colors file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-background disabled:text-secondary truncate',
  {
    variants: {
      size: {
        default: 'h-10 px-4 py-3 text-sm md:text-base',
        sm: 'h-8 rounded-md px-3 text-xs md:text-sm',
        lg: 'h-10 rounded-lg px-8 text-sm md:text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefixIcon, suffixIcon, type, size, ...props }, ref) => {
    return (
      <div className="[&_svg]:stroke-secondary relative h-fit w-full [&_input_+_svg]:left-auto [&_input_+_svg]:right-3 [&_svg]:absolute [&_svg]:left-3 [&_svg]:top-1/2 [&_svg]:size-6 [&_svg]:-translate-y-1/2">
        {prefixIcon}
        <input
          type={type}
          className={cn(
            inputVariants({ size }),
            { 'pl-12': !!prefixIcon },
            { 'pr-12': !!suffixIcon },
            className,
          )}
          ref={ref}
          {...props}
        />
        {suffixIcon}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
