import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm text-base px-2 py-1 font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-snug',
  {
    variants: {
      color: {
        default:
          'border-transparent bg-[#E8FFE7] text-[#258D01] hover:bg-[#E8FFE7]/80',
        secondary:
          'border-transparent bg-[#E9E9E9] text-secondary-foreground hover:bg-[#E9E9E9]/80',
        warn: 'border-transparent bg-[#FFFBE7] text-[#A98400] hover:bg-[#FFFBE7]/80',
        destructive:
          'border-transparent bg-[#FFE7E7] text-[#DE1515] shadow hover:bg-[#FFE7E7]/80',
        orange:
          'border-transparent bg-[#FFFBE7] text-[#D55A00] hover:bg-[#FFFBE7]/80',
        pink: 'border-transparent bg-[#FFF4F8] text-[#FF3E83] hover:bg-[#FFF4F8]/80',
        blue: 'border-transparent bg-[#E2EFFF] text-[#3561FF] hover:bg-[#E2EFFF]/80',
        none: 'border-transparent',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  customColor?: string;
}

function Badge({ className, color, customColor, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ color }), className)}
      {...props}
      style={{
        ...(customColor
          ? {
              color: `${customColor}`,
              backgroundColor: `${customColor}1a`,
            }
          : {}),
      }}
    />
  );
}

export { Badge, badgeVariants };
