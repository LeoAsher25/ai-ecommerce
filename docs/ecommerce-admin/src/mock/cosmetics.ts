/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOption } from '@/components/common/BasicFilter';
import { Category } from '@/types';

export const cosmeticFilters = (categories: Category[]): FilterOption[] => [
  {
    label: 'Phân loại',
    name: 'categories',
    value: [],
    multiple: true,
    options: categories.map((v) => ({
      value: v.id,
      name: v.name,
    })),
  },
];
