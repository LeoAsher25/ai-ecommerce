'use client';
import { Badge, Button } from '@/components/ui';
import { Cosmetic, Category } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Image } from '@/components/common/Image';
import ViewIcon from '@/public/view.svg';
import EditIcon from '@/public/edit.svg';
import SortNoneIcon from '@/public/sort_none.svg';
import SortAscIcon from '@/public/sort_asc.svg';
import SortDescIcon from '@/public/sort_desc.svg';
import Link from 'next/link';
import { RatingStar } from '@/components/common/Rating';
import { GripHorizontal } from 'lucide-react';

import { useSortable } from '@dnd-kit/sortable';

const DraggableCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });

  return (
    <button {...attributes} {...listeners} aria-describedby="">
      <GripHorizontal className="stroke-secondary" />
    </button>
  );
};

export const columns: ColumnDef<Cosmetic>[] = [
  {
    id: 'drag-handle',
    size: 60,
    header: () => (
      <div className="flex gap-4">
        <GripHorizontal visibility="hidden" />
        STT
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex gap-4">
        <DraggableCell rowId={row.id} />
        {row.original.ranking}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Cơ sở thẩm mỹ',
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <Image
          className="size-9 rounded-sm"
          src={row.original.logo || '/default.png'}
          alt="logo"
          width={36}
          height={36}
          onError={(e) => {
            if (e.currentTarget.srcset !== 'default.png')
              e.currentTarget.srcset = '/default.png';
          }}
        />
        <span className="whitespace-nowrap">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Phân loại',
    cell: ({ getValue }) => (
      <Badge
        className="whitespace-nowrap"
        color="none"
        customColor={(getValue() as Category).labelColor}
      >
        {(getValue() as Category).name}
      </Badge>
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
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <RatingStar active />
        {getValue() as number}
      </div>
    ),
  },
  {
    id: 'actions',
    size: 120,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/top-cosmetics/${row.id}`}>
            <ViewIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={`/top-cosmetics/edit?ranking=${row.original.ranking}&categoryId=${row.original.category.id}`}
          >
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
