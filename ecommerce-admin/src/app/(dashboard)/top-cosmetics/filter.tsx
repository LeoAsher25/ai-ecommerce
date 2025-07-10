'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { BasicFilter, FilterOption } from '@/components/common/BasicFilter';
import { Category } from '@/types';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { revalidate } from '@/actions';

export function FilterWithCategory({
  categories,
  basicFilter,
}: {
  categories: Category[];
  basicFilter: FilterOption[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { refresh } = useRouter();

  const handleFilter = useCallback(
    async (category: string) => {
      const params = new URLSearchParams(searchParams);
      if (category) {
        params.set('categoryId', category);
      } else {
        params.delete('categoryId');
      }
      window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
      await revalidate({ path: '/top-cosmetics', type: 'page' });
      refresh();
    },
    [pathname, refresh, searchParams],
  );

  return (
    <div className="mb-8 flex w-max gap-4">
      <Select
        onValueChange={handleFilter}
        defaultValue={searchParams.get('categoryId') ?? undefined}
      >
        <SelectTrigger className="h-10 w-[240px]">
          <SelectValue placeholder="Chọn phân loại" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, idx) => (
            <SelectItem key={idx} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <BasicFilter className="w-max [&>div]:w-max" options={basicFilter} />
    </div>
  );
}
