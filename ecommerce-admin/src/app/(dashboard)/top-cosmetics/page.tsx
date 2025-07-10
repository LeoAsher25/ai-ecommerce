import { columns } from './columns';
import { cosmeticService } from '@/services/cosmetic';
import { TopCosmeticTable } from './table';
import {
  loadCommonFilterParams,
  loadCommonSearchParams,
  loadCommonSortParams,
} from '@/constants';
import { commonService } from '@/services';
import { FilterWithCategory } from './filter';
import { SearchParams } from 'nuqs';
import { SORT_ORDER } from '@/types';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lí cơ sở top - Review Thẩm Mỹ',
};

export default async function TopCosmeticsPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { search } = await loadCommonSearchParams(props.searchParams);
  const { sortByRating } = await loadCommonSortParams(props.searchParams);
  const { categoryId } = await loadCommonFilterParams(props.searchParams);

  const { success: categoriesSuccess, data: categories } =
    await commonService.getAllCategories({
      type: 'BASE',
    });

  if (!categoryId && categoriesSuccess)
    redirect('/top-cosmetics?categoryId=' + categories.data[0].id);

  const { success, data } = await cosmeticService.getTopCosmetics({
    categoryId: categoryId ?? undefined,
    search,
    sortByRating: sortByRating,
    sortByRanking: SORT_ORDER.ASC,
  });

  const lowestRank = success ? Math.max(...data.map((v) => v.ranking), 0) : 0;

  return (
    <div>
      <div className="mb-[42px] flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[28px]">
          Quản lý cơ sở top
        </h1>
        <Button asChild disabled={lowestRank >= 16}>
          <Link
            href={`/top-cosmetics/add?categoryId=${categoryId}&ranking=${lowestRank + 1}`}
          >
            <Plus />
            Thêm
          </Link>
        </Button>
      </div>
      <FilterWithCategory
        basicFilter={[]}
        categories={categoriesSuccess ? categories.data : []}
      />
      <TopCosmeticTable
        data={success ? data : []}
        columns={columns}
        total={success ? data.length : 0}
      />
    </div>
  );
}
