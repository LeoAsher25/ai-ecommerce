'use client';
import { Badge, Button, Checkbox } from '@/components/ui';
import { Category } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import EditIcon from '@/public/edit.svg';
import Link from 'next/link';

export const columns = (type: string): ColumnDef<Category>[] => [
  {
    id: 'select',
    size: 34,
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
    accessorKey: 'name',
    header: type === 'cosmetic' ? 'Phân loại cơ sở' : 'Tag review',
  },
  {
    id: 'preview',
    header: 'Nhãn',
    size: 300,
    cell: ({ row }) => (
      <Badge
        className="whitespace-nowrap"
        color="none"
        customColor={row.original.labelColor}
      >
        {row.original.name}
      </Badge>
    ),
  },
  {
    id: 'actions',
    size: 80,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/categories/${type}/edit/${row.id}`}>
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
