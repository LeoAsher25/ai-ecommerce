import { Image } from '@/components/common/Image';
import { cn } from '@/lib/utils';
import { Review } from '@/types';
import Link from 'next/link';
import { Fragment } from 'react';
import { Skeleton } from '../ui';
import { Rating } from './Rating';

export function ReviewDialogContentSkeleton() {
  return (
    <div className="grid grid-cols-7 gap-8 p-8">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={idx}>
          <Skeleton className="col-span-1 h-6" />
          <Skeleton className="col-span-6 h-6" />
        </Fragment>
      ))}
    </div>
  );
}
export function ReviewDialogContent({
  review,
  count,
}: {
  review: Review;
  count: number;
}) {
  return (
    <div className="h-full max-h-[80vh] max-w-[inherit] overflow-auto">
      <div className="grid grid-cols-7 gap-8 px-8 py-6 font-light [&>div:nth-child(even)]:font-normal [&>div:nth-child(odd)]:font-medium">
        <div className="col-span-1 flex min-h-10">Người dùng:</div>
        <div className="col-span-6 flex min-h-10 flex-col gap-4">
          <div>
            {review.user?.name}{' '}
            <span className="text-secondary">
              ({review.user?.email}
              {review.user.phoneNumber ? ' ' + review.user.phoneNumber : ''})
            </span>
          </div>
          <div className="text-secondary">
            (Đã review{' '}
            <Link
              className={cn('text-primary underline hover:no-underline', {
                'no-underline pointer-events-none': count === 0,
              })}
              href={`/users/${review.user?.id}/reviews`}
            >
              {count}
            </Link>{' '}
            bài)
          </div>
        </div>
        <div className="col-span-1 flex min-h-10 items-center">
          Cơ sở thẩm mỹ:
        </div>
        <div className="col-span-6 flex min-h-10 items-center gap-2">
          <Image
            className="rounded-sm"
            src={review.cosmetic?.logo || '/default.png'}
            alt="cosmetic_logo"
            width={48}
            height={48}
          />
          {review.cosmetic?.name}
        </div>
        <div className="col-span-1">Đánh giá:</div>
        <div className="col-span-6 flex items-center">
          <Rating rating={review.rating} />
        </div>
        <div className="col-span-1">Nội dung:</div>
        <div className="col-span-6">{review.content}</div>
        {review.imageUrl && (
          <>
            <div className="col-span-1">Link Drive:</div>
            <div className="col-span-6">
              <a className="block cursor-pointer text-[#1a6cc7] hover:underline">
                {review.imageUrl}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
