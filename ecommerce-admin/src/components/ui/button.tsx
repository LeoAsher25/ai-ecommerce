import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 disabled:opacity-50 overflow-hidden cursor-pointer border-[1.5px]',
  {
    variants: {
      color: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-white hover:text-primary hover:stroke-primary',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:bg-white hover:text-destructive hover:stroke-desstructive',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:bg-white hover:text-secondary hover:stroke-secondary',
        gray: 'border-gray bg-gray text-gray-foreground hover:bg-white hover:text-gray hover:stroke-gray',
      },
      variant: {
        default: '',
        outline: 'bg-white',
        ghost: 'bg-transparent border-0 hover:opacity-70',
        //link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-1 text-sm md:text-base',
        sm: 'h-8 rounded-md px-3 text-xs md:text-sm [&_svg]:size-5',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        color: ['default', 'secondary', 'destructive', 'gray'],
        variant: 'ghost',
        class: 'hover:bg-transparent',
      },
      {
        color: 'default',
        variant: 'outline',
        class:
          'text-primary hover:text-primary-foreground hover:stroke-primary-foreground hover:bg-primary',
      },
      {
        color: 'destructive',
        variant: 'outline',
        class:
          'text-destructive hover:text-destructive-foreground hover:stroke-destructive-foreground hover:bg-destructive',
      },
    ],
    defaultVariants: {
      color: 'default',
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      variant,
      size,
      asChild = false,
      color,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ color, variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!isLoading ? children : <LoaderCircle className="animate-spin" />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
