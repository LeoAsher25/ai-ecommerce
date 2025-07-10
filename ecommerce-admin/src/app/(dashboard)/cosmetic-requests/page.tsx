import { BasicFilter } from '@/components/common/BasicFilter';
import { Suspense } from 'react';
import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { cosmeticService } from '@/services/cosmetic';
import { CosmeticRequestTable } from './table';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { SearchParams } from 'nuqs';
import { Skeleton } from '@/components/ui';
import { STATUS } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phê duyệt cơ sở - Review Thẩm Mỹ',
};

export default async function CosmeticRequestsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, limit, page } = await loadCommonSearchParams(
    props.searchParams,
  );
  const { sortByCreatedAt } = await loadCommonSortParams(props.searchParams);
  const { categories } = await loadCommonFilterParams(props.searchParams);

  const filterPromise = cosmeticService.getCosmeticFilters();

  const promise = cosmeticService.getCosmetics({
    page,
    limit,
    search,
    searchType: 'name',
    statuses: [STATUS.PENDING],
    categories,
    sortByCreatedAt: sortByCreatedAt,
  });

  return (
    <div>
      <div className="mb-[42px]">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Yêu cầu thêm cơ sở
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
            <CosmeticRequestTable
              data={success ? data.data : []}
              total={success ? data.total : -1}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
