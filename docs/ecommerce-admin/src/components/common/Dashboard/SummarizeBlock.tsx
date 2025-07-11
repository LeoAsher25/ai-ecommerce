import { Badge, Skeleton } from '@/components/ui';
import { Block } from './Block';

export const SummarizeBlock = ({
  title,
  sum,
  unit,
  change,
  skeleton,
}: {
  title: string;
  sum: number;
  unit: string;
  change: number;
  skeleton?: boolean;
}) => {
  return (
    <Block>
      <h4 className="mb-4 font-medium">{title}</h4>
      <div className="flex items-center justify-between">
        <div className="text-base font-normal">
          <span className="mr-2 inline-flex text-[28px] font-semibold">
            {skeleton ? (
              <Skeleton className="inline-block h-[34px] w-14" />
            ) : (
              sum
            )}
          </span>
          {unit}
        </div>
        {skeleton ? (
          <Skeleton className="size-4" />
        ) : (
          <Badge
            color={change >= 0 ? 'default' : 'destructive'}
          >{`${change < 0 ? '-' : change > 0 ? '+' : ''} ${change}%`}</Badge>
        )}
      </div>
    </Block>
  );
};
