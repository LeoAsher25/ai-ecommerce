'use client';

import { Badge, Button, Checkbox } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import EditIcon from '@/public/edit.svg';
import ViewIcon from '@/public/view.svg';
import { StaticPage } from '@/services/staticPage/type';
import { formatDate } from '@/utils/string';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<StaticPage>[] = [
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
    accessorKey: 'title',
    header: 'Tiêu đề',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'isActive',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge customColor={isActive ? '#258D01' : '#DE1515'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastUpdatedAt',
    header: 'Cập nhật lần cuối',
    cell: ({ row }) => {
      const date = row.getValue('lastUpdatedAt') as Date;
      return date ? formatDate(new Date(date)) : 'N/A';
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    size: 120,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`${APP_ROUTES.STATIC_PAGES}/${row.original.slug}`}>
            <ViewIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`${APP_ROUTES.STATIC_PAGES}/edit/${row.original.slug}`}>
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
