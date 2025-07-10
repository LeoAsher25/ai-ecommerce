import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { Button } from '@/components/ui';
import PageContentHeader from '@/components/ui/PageContentHeader';
import { loadCommonSearchParams } from '@/constants';
import { APP_ROUTES } from '@/constants/routes';
import { productCategoryService } from '@/services/productCategories';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { columns } from './columns';
import { ProductCategoryTable } from './table';

export const metadata: Metadata = {
  title: 'Quản lý phân loại',
};

export default async function ProductsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, pageSize, page } = await loadCommonSearchParams(
    props.searchParams,
  );

  const promise = productCategoryService.getProductCategories({
    page,
    pageSize,
    search,
  });

  return (
    <div>
      <PageContentHeader
        title="Quản lý phân loại"
        headerExtra={
          <Button asChild>
            <Link href={`${APP_ROUTES.PRODUCT_CATEGORIES}/add`}>
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
              <ProductCategoryTable
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
