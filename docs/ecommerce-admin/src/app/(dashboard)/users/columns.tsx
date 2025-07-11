import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import SortAscIcon from '@/public/sort_asc.svg';
import SortDescIcon from '@/public/sort_desc.svg';
import SortNoneIcon from '@/public/sort_none.svg';
import { User } from '@/types/entities';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '../../../components/ui';

interface Params {
  updateActivation: (id: number, active: boolean) => Promise<void>;
}
export const columns = ({ updateActivation }: Params): ColumnDef<User>[] => [
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
    accessorKey: 'name',
    header: 'Tên người dùng',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại',
  },
  {
    accessorKey: 'totalReview',
    size: 200,
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <div className="flex flex-nowrap items-center justify-between">
          Số lượt review
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
    cell: ({ getValue, row }) => (
      <Link
        className={cn('text-primary underline', {
          'pointer-events-none no-underline': getValue() === 0,
        })}
        href={`/users/${row.original.id}/reviews`}
      >
        {getValue() as number}
      </Link>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Hiển thị',
    size: 100,
    cell: ({ row }) => (
      <Switch
        checked={row.getValue('isActive')}
        onCheckedChange={(checked) =>
          updateActivation(row.original.id, checked)
        }
      />
    ),
  },
];
