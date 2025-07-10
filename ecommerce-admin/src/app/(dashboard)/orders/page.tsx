import { columns } from './columns';
import { BasicFilter } from '@/components/common/BasicFilter';
import { Suspense } from 'react';
import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { cosmeticService } from '@/services/cosmetic';
import { CosmeticTable } from './table';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { Button, Skeleton } from '@/components/ui';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs';
import { STATUS } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý cơ sở thẩm mỹ - Review Thẩm Mỹ',
};

export default async function CosmeticsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, limit, page } = await loadCommonSearchParams(
    props.searchParams,
  );
  const { sortByCreatedAt, sortByPendingReview } = await loadCommonSortParams(
    props.searchParams,
  );
  const { categories } = await loadCommonFilterParams(props.searchParams);

  const filterPromise = cosmeticService.getCosmeticFilters();

  const promise = cosmeticService.getCosmetics({
    page,
    limit,
    search,
    searchType: 'name',
    categories,
    statuses: [STATUS.APPROVED],
    sortByCreatedAt,
    sortByPendingReview,
  });

  return (
    <div>
      <div className="mb-[42px] flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Quản lý cơ sở thẩm mỹ
        </h1>
        <Button asChild>
          <Link href="/cosmetics/add">
            <Plus />
            Thêm
          </Link>
        </Button>
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
            <CosmeticTable
              data={success ? data.data : []}
              columns={columns}
              total={success ? data.total : 0}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
