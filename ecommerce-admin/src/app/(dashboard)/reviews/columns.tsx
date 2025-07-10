import { Image } from '@/components/common/Image';
import { Rating } from '@/components/common/Rating';
import {
  Button,
  Checkbox,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import SortAscIcon from '@/public/sort_asc.svg';
import SortDescIcon from '@/public/sort_desc.svg';
import SortNoneIcon from '@/public/sort_none.svg';
import ViewIcon from '@/public/view.svg';
import { Review } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import dayjs from 'dayjs';

export const columns = ({
  updateShow,
}: {
  updateShow: (id: number, show: boolean) => Promise<void>;
}): ColumnDef<Review>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user.name',
    header: 'Người dùng',
  },
  {
    accessorKey: 'cosmetic.name',
    header: 'Cơ sở thẩm mỹ',
    cell: ({ row, getValue }) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            className="size-9 rounded-sm"
            src={row.original.cosmetic.logo}
            alt="cosmetic_logo"
            width={36}
            height={36}
          />
          <span className="whitespace-nowrap">{getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    size: 200,
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <div className="flex flex-nowrap items-center justify-between">
          Đánh giá
          <Button
            size="icon"
            variant="ghost"
            onClick={column.getToggleSortingHandler()}
          >
            {!sorted ? (
              <SortNoneIcon />
            ) : sorted === 'asc' ? (
              <SortAscIcon />
            ) : (
              <SortDescIcon />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ getValue }) => <Rating rating={getValue() as number} />,
  },
  {
    accessorKey: 'createdAt',
    size: 200,
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <div className="flex flex-nowrap items-center justify-between">
          Ngày đăng
          <Button
            size="icon"
            variant="ghost"
            onClick={column.getToggleSortingHandler()}
          >
            {!sorted ? (
              <SortNoneIcon />
            ) : sorted === 'asc' ? (
              <SortAscIcon />
            ) : (
              <SortDescIcon />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ getValue }) => dayjs(getValue() as Date).format('DD/MM/YYYY'),
  },
  {
    accessorKey: 'show',
    header: 'Hiển thị',
    size: 100,
    cell: ({ getValue, row }) =>
      !row.original.user.isActive ? (
        <Tooltip>
          <TooltipTrigger>
            <Switch checked={getValue() as boolean} disabled />
          </TooltipTrigger>
          <TooltipContent className="bg-muted-foreground text-muted">
            Người dùng đã bị vô hiệu
          </TooltipContent>
        </Tooltip>
      ) : (
        <Switch
          checked={getValue() as boolean}
          onCheckedChange={(checked) => updateShow(row.original.id, checked)}
        />
      ),
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/reviews/${row.id}`}>
            <ViewIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
