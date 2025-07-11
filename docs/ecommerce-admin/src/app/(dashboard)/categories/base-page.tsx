import { columns } from './columns';
import { Suspense } from 'react';
import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { CategoriesTable } from './table';
import { loadCommonSearchParams } from '@/constants';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { commonService } from '@/services';
import { BasicFilter } from '@/components/common/BasicFilter';
import { SearchParams } from 'nuqs';

export default async function CategoriesPage(props: {
  params?: Promise<{
    type?: string;
  }>;
  searchParams: Promise<SearchParams>;
}) {
  const { page, limit, search } = await loadCommonSearchParams(
    props.searchParams,
  );
  const params = await props.params;
  const type = params?.type;

  if (type !== 'cosmetic' && type !== 'review') return null;

  const promise = commonService.getCategories({
    page,
    limit,
    search,
    type: type === 'cosmetic' ? 'BASE' : 'TAG',
  });

  return (
    <div>
      <div className="mb-[42px] flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          {type === 'cosmetic' ? 'Phân loại cơ sở' : 'Tag review'}
        </h1>
        <Button asChild>
          <Link href={`/categories/${type}/add`}>
            <Plus />
            Thêm
          </Link>
        </Button>
      </div>
      <BasicFilter className="mb-8 flex w-max flex-row gap-4" />
      <Suspense
        fallback={
          <TableSkeleton rows={5} columns={6} className="w-full rounded-lg" />
        }
      >
        <Await promise={promise}>
          {({ success, data }) => (
            <CategoriesTable
              data={success ? data.data : []}
              columns={columns}
              total={success ? data.total : -1}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
