'use client';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { Rating } from '@/components/common/Rating';
import { useToast } from '@/hooks/use-toast';
import { reviewService } from '@/services/review';
import { Review } from '@/types';
import { useCallback, useRef, useState } from 'react';
import { Image } from '@/components/common/Image';
import { LoaderCircle } from 'lucide-react';
import dayjs from 'dayjs';

export function UserReviewsContent({
  userId,
  initialData,
  limit,
}: {
  userId: number;
  initialData: Review[];
  limit: number;
}) {
  const [data, setdata] = useState(initialData);
  const pageRef = useRef(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { toast } = useToast();

  const loadMore = useCallback(async () => {
    setLoading(true);
    const { success, data, message } = await reviewService.getReviews({
      userId,
      page: pageRef.current + 1,
      limit,
    });
    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: message,
      });
      setHasMore(false);
      setLoading(false);
      return;
    }
    pageRef.current++;
    setHasMore(pageRef.current < Math.ceil(data.total / data.limit));
    setdata((prev) => [...prev, ...data.data]);
    setLoading(false);
  }, [limit, toast, userId]);
  return (
    <InfiniteScroll isLoading={loading} hasMore={hasMore} next={loadMore}>
      {data.map((review, idx) => (
        <div
          key={idx}
          className="[&:not(:last-child)]:border-border flex gap-8 [&:not(:last-child)]:mb-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-8"
        >
          <div className="flex shrink-0 flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                className="size-9 rounded-sm"
                src={review.cosmetic.logo || '/default.png'}
                alt="cosmetic"
                width={36}
                height={36}
                onError={(e) => (e.currentTarget.srcset = '/default.png')}
              />
              <span className="whitespace-nowrap">
                {review?.cosmetic?.name}
              </span>
            </div>
            <span className="text-border text-sm">
              {dayjs(review.createdAt).format('DD/MM/YYYY')}
            </span>
            <Rating rating={review.rating} />
          </div>
          <div className="pt-[6px]">
            <p>{review.content}</p>
            <a className="mt-4 block cursor-pointer text-[#1a6cc7] hover:underline">
              {review.imageUrl}
            </a>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex w-full items-center justify-center">
          <LoaderCircle className="size-8 animate-spin stroke-black/20" />
        </div>
      )}
    </InfiniteScroll>
  );
}
