import { Await } from '@/components/common/Await';
import { BasicFilter } from '@/components/common/BasicFilter';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { Skeleton } from '@/components/ui';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { reviewService } from '@/services/review';
import { SORT_ORDER, STATUS } from '@/types';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { ReviewTable } from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý review - Review Thẩm Mỹ',
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, limit, search } = await loadCommonSearchParams(searchParams);
  const { sortByCreatedAt, sortByRating } =
    await loadCommonSortParams(searchParams);
  const { categories, ratings, show } =
    await loadCommonFilterParams(searchParams);

  const filterPromise = reviewService.getReviewFilter();

  const promise = reviewService.getReviews({
    page,
    limit,
    search,
    categories,
    ratings,
    show: show ?? undefined,
    statuses: [STATUS.APPROVED],
    sortByCreatedAt:
      sortByRating || sortByCreatedAt ? sortByCreatedAt : SORT_ORDER.DESC,
    sortByRating: sortByRating,
  });

  return (
    <div>
      <div className="mb-[42px] flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Quản lý review
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="mb-8 flex w-max flex-row gap-4">
            <Skeleton className="h-10 w-[280px]" />
            <Skeleton className="size-10" />
          </div>
        }
      >
        <Await promise={filterPromise}>
          {({ success, data }) => (
            <BasicFilter
              className="mb-8 flex w-max flex-row gap-4"
              options={success ? data : []}
            />
          )}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <TableSkeleton rows={5} columns={6} className="w-full rounded-lg" />
        }
      >
        <Await promise={promise}>
          {({ success, data }) => (
            <ReviewTable
              data={success ? data.data : []}
              total={success ? data.total : 0}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
