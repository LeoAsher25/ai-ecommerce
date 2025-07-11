import { FilterOption } from '@/components/common/BasicFilter';
import { Category, STATUS } from '@/types';
import { Star } from 'lucide-react';

export const approveReviewFilters: FilterOption[] = [
  {
    label: 'Trạng thái',
    name: 'statuses',
    value: null,
    options: [
      {
        value: STATUS.PENDING,
        name: 'Chờ phê duyệt',
      },
      {
        value: STATUS.REJECTED,
        name: 'Bị từ chối',
      },
    ],
  },
];
export const reviewFilters = (categories: Category[]): FilterOption[] => [
  {
    label: 'Phân loại',
    name: 'categories',
    value: [],
    multiple: true,
    options: categories.map((v) => ({ value: v.id, name: v.name })),
  },
  {
    label: 'Đánh giá',
    name: 'ratings',
    multiple: true,
    value: [],
    options: [
      {
        value: 1,
        name: (
          <div className="flex items-center gap-1">
            1
            <Star className="size-4 fill-[#f2c00e] stroke-[#f2c00e]" />
          </div>
        ),
      },
      {
        value: 2,
        name: (
          <div className="flex items-center gap-1">
            2
            <Star className="size-4 fill-[#f2c00e] stroke-[#f2c00e]" />
          </div>
        ),
      },
      {
        value: 3,
        name: (
          <div className="flex items-center gap-1">
            3
            <Star className="size-4 fill-[#f2c00e] stroke-[#f2c00e]" />
          </div>
        ),
      },
      {
        value: 4,
        name: (
          <div className="flex items-center gap-1">
            4
            <Star className="size-4 fill-[#f2c00e] stroke-[#f2c00e]" />
          </div>
        ),
      },
      {
        value: 5,
        name: (
          <div className="flex items-center gap-1">
            5
            <Star className="size-4 fill-[#f2c00e] stroke-[#f2c00e]" />
          </div>
        ),
      },
    ],
  },
  {
    label: 'Trạng thái',
    name: 'show',
    value: null,
    options: [
      {
        value: true,
        name: 'Đang hiển thị',
      },
      {
        value: false,
        name: 'Bị ẩn',
      },
    ],
  },
];
