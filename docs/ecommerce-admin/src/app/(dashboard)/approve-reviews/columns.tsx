import { Badge, Button, Checkbox } from '@/components/ui';
import { Review, STATUS } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Image } from '@/components/common/Image';
import ViewIcon from '@/public/view.svg';
import SortNoneIcon from '@/public/sort_none.svg';
import SortAscIcon from '@/public/sort_asc.svg';
import SortDescIcon from '@/public/sort_desc.svg';
import Link from 'next/link';
import { Rating } from '@/components/common/Rating';
import { getStatusBadgeProps } from '@/constants';
import dayjs from 'dayjs';

export const columns: ColumnDef<Review>[] = [
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
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <Image
          className="size-9 rounded-sm"
          src={row.original.cosmetic?.logo || '/default.png'}
          alt="cosmetic_logo"
          width={36}
          height={36}
          onError={(e) => (e.currentTarget.srcset = '/default.png')}
        />
        <span className="whitespace-nowrap">{getValue() as string}</span>
      </div>
    ),
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
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 120,
    cell: ({ getValue }) => (
      <Badge
        className="whitespace-nowrap"
        color="none"
        {...getStatusBadgeProps(getValue() as STATUS)}
      />
    ),
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/approve-reviews/${row.id}`}>
            <ViewIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
