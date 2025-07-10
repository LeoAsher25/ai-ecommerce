import { Await } from '@/components/common/Await';
import { BasicFilter } from '@/components/common/BasicFilter';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { Button } from '@/components/ui';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { userService } from '@/services/user';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { UserTable } from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lí người dùng - Review Thẩm Mỹ',
};

export default async function UsersPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, limit, page } = await loadCommonSearchParams(
    props.searchParams,
  );
  const { isActive } = await loadCommonFilterParams(props.searchParams);
  const { sortByTotalReview } = await loadCommonSortParams(props.searchParams);

  const userFilters = userService.getUserFilter();

  const promise = userService.getUsers({
    page,
    limit,
    search,
    isActive: isActive ?? undefined,
    sortByTotalReview,
  });

  return (
    <div>
      <div className="mb-[42px] flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Quản lý người dùng
        </h1>
        <Button asChild>
          <Link href="/users/add">
            <Plus />
            Thêm
          </Link>
        </Button>
      </div>
      <BasicFilter
        className="mb-8 flex w-max flex-row gap-4"
        options={userFilters}
      />
      <Suspense
        fallback={
          <TableSkeleton rows={5} columns={6} className="w-full rounded-lg" />
        }
      >
        <Await promise={promise}>
          {({ success, data }) => (
            <UserTable
              key={new Date().getTime()}
              data={success ? data.data : []}
              total={success ? data.total : 0}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
