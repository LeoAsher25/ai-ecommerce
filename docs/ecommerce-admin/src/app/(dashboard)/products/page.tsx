import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { Button } from '@/components/ui';
import PageContentHeader from '@/components/ui/PageContentHeader';
import { loadCommonFilterParams, loadCommonSearchParams } from '@/constants';
import { APP_ROUTES } from '@/constants/routes';
import { productService } from '@/services/product';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { columns } from './columns';
import { ProductTable } from './table';

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm',
};

export default async function ProductsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, pageSize, page } = await loadCommonSearchParams(
    props.searchParams,
  );

  const { categories } = await loadCommonFilterParams(props.searchParams);

  const promise = productService.getProducts({
    page,
    pageSize,
    search,
    categories: categories!,
  });

  return (
    <div>
      <PageContentHeader
        title="Quản lý sản phẩm"
        headerExtra={
          <Button asChild>
            <Link href={`${APP_ROUTES.PRODUCTS}/add`}>
              <Plus />
              Thêm
            </Link>
          </Button>
        }
      />

      <Suspense
        fallback={
          <TableSkeleton rows={5} columns={6} className="w-full rounded-lg" />
        }
      >
        <Await promise={promise}>
          {({ success, data }) => {
            return (
              <ProductTable
                data={success ? data.data : []}
                columns={columns}
                total={success ? (data.responseInfo?.totalItems ?? 0) : 0}
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
