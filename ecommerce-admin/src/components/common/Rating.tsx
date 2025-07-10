import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export const Rating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: 5 }).map((_, rate) => (
        <RatingStar key={rate} active={rate < rating} />
      ))}
    </div>
  );
};

export const RatingStar = ({ active }: { active: boolean }) => (
  <Star
    className={cn('fill-border/50 stroke-border/50 size-4 ', {
      'fill-[#f2c00e] stroke-[#f2c00e]': active,
    })}
  />
);
