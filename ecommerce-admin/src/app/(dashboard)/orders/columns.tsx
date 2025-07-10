'use client';
import { Badge, Button, Checkbox } from '@/components/ui';
import { Cosmetic, Category, STATUS } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Image } from '@/components/common/Image';
import ViewIcon from '@/public/view.svg';
import EditIcon from '@/public/edit.svg';
import SortNoneIcon from '@/public/sort_none.svg';
import SortAscIcon from '@/public/sort_asc.svg';
import SortDescIcon from '@/public/sort_desc.svg';
import Link from 'next/link';
import dayjs from 'dayjs';

export const columns: ColumnDef<Cosmetic>[] = [
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
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Cơ sở thẩm mỹ',
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <Image
          className="size-9 rounded-sm"
          src={row.original.logo || '/default.png'}
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
    accessorKey: 'code',
    header: 'Mã đăng nhập',
  },
  {
    accessorKey: 'category',
    header: 'Phân loại',
    cell: ({ getValue }) => (
      <Badge
        className="whitespace-nowrap"
        color="none"
        customColor={(getValue() as Category)?.labelColor}
      >
        {(getValue() as Category)?.name}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    size: 200,
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <div className="flex flex-nowrap items-center justify-between">
          Tham gia từ
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
    accessorKey: 'pendingReview',
    size: 250,
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <div className="flex flex-nowrap items-center justify-between">
          Số review chờ duyệt
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
    cell: ({ row }) =>
      row.original.reviews.filter((v) => v.status === STATUS.PENDING).length,
  },
  {
    id: 'actions',
    size: 120,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/cosmetics/${row.id}`}>
            <ViewIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/cosmetics/edit/${row.id}`}>
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
