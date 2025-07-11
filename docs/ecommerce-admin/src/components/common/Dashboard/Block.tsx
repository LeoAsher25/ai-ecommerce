import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const Block = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-8 shadow-[0_4px_10px_0_#0000000D]',
        className,
      )}
    >
      {children}
    </div>
  );
};
