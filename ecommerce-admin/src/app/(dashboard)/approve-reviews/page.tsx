import { BasicFilter } from '@/components/common/BasicFilter';
import { Suspense } from 'react';
import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { ReviewTable } from './table';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { reviewService } from '@/services/review';
import { SearchParams } from 'nuqs';
import { STATUS } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phê duyệt review - Review Thẩm Mỹ',
};

export default async function ApproveReviewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, page, limit } = await loadCommonSearchParams(searchParams);
  const { sortByCreatedAt, sortByRating } =
    await loadCommonSortParams(searchParams);
  const { statuses } = await loadCommonFilterParams(searchParams);

  const approveReviewFilters = reviewService.getApproveReviewFilter();

  const promise = reviewService
    .getReviews({
      page,
      limit,
      search,
      statuses: statuses.length
        ? (statuses as STATUS[])
        : [STATUS.PENDING, STATUS.REJECTED],
      sortByCreatedAt: sortByCreatedAt,
      sortByRating: sortByRating,
    })
    .then((resp) => {
      console.log({ resp });
      return resp;
    });

  return (
    <div>
      <div className="mb-[42px]">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Phê duyệt review
        </h1>
      </div>
      <BasicFilter
        className="mb-8 flex w-max flex-row gap-4"
        options={approveReviewFilters}
      />
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
