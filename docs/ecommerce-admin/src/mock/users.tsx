import { FilterOption } from '@/components/common/BasicFilter';

export const userFilters: FilterOption[] = [
  {
    label: 'Trạng thái',
    name: 'isActive',
    value: null,
    options: [
      {
        value: 'false',
        name: 'Bị ẩn',
      },
      {
        value: 'true',
        name: 'Đang hiển thị',
      },
    ],
  },
];
