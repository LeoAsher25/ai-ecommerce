import Link from 'next/link';
import { Block } from './Block';
import { Button, Skeleton } from '@/components/ui';

export const RecentReviewBlock = ({
  className,
  title,
  data,
  unit,
  skeleton,
  href,
}: {
  className?: string;
  title: string;
  data: number;
  unit: string;
  skeleton?: boolean;
  href?: string;
}) => {
  return (
    <Block className={className}>
      <h4 className="mb-6 font-medium">{title}</h4>
      <div className="flex justify-between">
        <span className="text-[28px] font-semibold">
          {skeleton ? (
            <Skeleton className="inline-block h-[34px] w-14" />
          ) : (
            data
          )}
          <span className="ml-2 text-base font-normal">{unit}</span>
        </span>
        <Button asChild>
          <Link href={href || ''}>Phê duyệt ngay</Link>
        </Button>
      </div>
    </Block>
  );
  //return (
  //  <Block className={className}>
  //    <h4 className="mb-6 font-medium">Review cần phê duyệt</h4>
  //    <div>
  //      <div className="mb-3 flex items-center border-b border-[#e7e7e7] pb-3">
  //        <span className="flex-1">Tường Vân</span>
  //        <div className="shrink-1 flex items-center gap-2">
  //          <Image
  //            src={''}
  //            className="size-9 rounded-sm"
  //            alt="cosmetic-logo"
  //            width={36}
  //            height={36}
  //          />
  //          <span>Nha khoa Ðức Toản</span>
  //          <Rating className="px-4 py-2.5" rating={5} />
  //          <Button variant="ghost" size="icon" asChild className="size-auto">
  //            <Link href={`/reviews/1`}>
  //              <ViewIcon />
  //            </Link>
  //          </Button>
  //        </div>
  //      </div>
  //      <div className="mb-3 flex items-center border-b border-[#e7e7e7] pb-3">
  //        <span className="flex-1">Tường Vân</span>
  //        <div className="shrink-1 flex items-center gap-2">
  //          <Image
  //            src={''}
  //            className="size-9 rounded-sm"
  //            alt="cosmetic-logo"
  //            width={36}
  //            height={36}
  //          />
  //          <span>Nha khoa Ðức Toản</span>
  //          <Rating className="px-4 py-2.5" rating={5} />
  //          <Button variant="ghost" size="icon" asChild className="size-auto">
  //            <Link href={`/reviews/1`}>
  //              <ViewIcon />
  //            </Link>
  //          </Button>
  //        </div>
  //      </div>
  //      <div className="flex items-center border-[#e7e7e7] pb-3">
  //        <span className="flex-1">Tường Vân</span>
  //        <div className="shrink-1 flex items-center gap-2">
  //          <Image
  //            src={''}
  //            className="size-9 rounded-sm"
  //            alt="cosmetic-logo"
  //            width={36}
  //            height={36}
  //          />
  //          <span>Nha khoa Ðức Toản</span>
  //          <Rating className="px-4 py-2.5" rating={5} />
  //          <Button variant="ghost" size="icon" asChild className="size-auto">
  //            <Link href={`/reviews/1`}>
  //              <ViewIcon />
  //            </Link>
  //          </Button>
  //        </div>
  //      </div>
  //    </div>
  //  </Block>
  //);
};
