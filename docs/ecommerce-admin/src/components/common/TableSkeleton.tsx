import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface Props {
  rows: number;
  columns: number;
  className?: string;
}
export const TableSkeleton = ({ rows, columns, className }: Props) => {
  return (
    <div className={cn('overflow-hidden rounded-lg', className)}>
      <Skeleton className="h-14 rounded-none" />
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex h-14 items-center gap-8 bg-white p-4">
          {Array.from({ length: columns }).map((_, col) => (
            <Skeleton key={col} className="size-full " />
          ))}
        </div>
      ))}
    </div>
  );
};
