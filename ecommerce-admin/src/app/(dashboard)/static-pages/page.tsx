import { Await } from '@/components/common/Await';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { Button } from '@/components/ui';
import PageContentHeader from '@/components/ui/PageContentHeader';
import { loadCommonSearchParams } from '@/constants';
import { APP_ROUTES } from '@/constants/routes';
import { staticPageService } from '@/services/staticPage';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import { Suspense } from 'react';
import { columns } from './columns';
import { StaticPageTable } from './table';

export const metadata: Metadata = {
  title: 'Quản lý trang tĩnh',
};

export default async function StaticPagesPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search, pageSize, page } = await loadCommonSearchParams(
    props.searchParams,
  );

  const promise = staticPageService.getStaticPages({
    page,
    pageSize,
    search,
  });

  return (
    <div>
      <PageContentHeader
        title="Quản lý trang tĩnh"
        headerExtra={
          <Button asChild>
            <Link href={`${APP_ROUTES.STATIC_PAGES}/add`}>
              <Plus />
              Thêm
            </Link>
          </Button>
        }
      />

      <Suspense
        fallback={
          <TableSkeleton rows={5} columns={5} className="w-full rounded-lg" />
        }
      >
        <Await promise={promise}>
          {({ success, data, ...rest }) => {
            console.log('data: ', data, rest);
            return (
              <StaticPageTable
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
