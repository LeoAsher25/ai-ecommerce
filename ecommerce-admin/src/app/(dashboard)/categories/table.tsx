'use client';

import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';

import TrashIcon from '@/public/trash.svg';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { columns } from './columns';
import { Category } from '@/types';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { revalidate } from '@/actions';
import { commonService } from '@/services';
import { useToast } from '@/hooks/use-toast';

type Props<T, V> = Omit<DataTableProps<T, V>, 'columns'> & {
  columns: (type: string) => ColumnDef<T, V>[];
};

export function CategoriesTable<T extends Category, V>({
  ...props
}: Props<T, V>) {
  const { type } = useParams<{ type: string }>();
  const { toast } = useToast();

  const handleDelete = useCallback(
    async (ids: number[]) => {
      const confirm = await GlobalModal.confirm({
        title: type === 'cosmetic' ? 'Xoá phân loại' : 'Xoá tag review',
        content:
          type === 'cosmetic'
            ? 'Bạn chắc chắn muốn xoá phân loại đã chọn?'
            : 'Bạn chắc chắn muốn xoá tag review đã chọn?',
      });
      if (!confirm) return;

      GlobalLoading.show();
      const { success, message } = await commonService.deleteCategories(ids);
      await revalidate({ path: '/categories', type: 'page' });
      toast({
        variant: success ? 'success' : 'destructive',
        description: message,
      });
      GlobalLoading.hide();
    },
    [toast, type],
  );

  return (
    <DataTable
      {...props}
      columns={columns(type)}
      getAction={(rows) => (
        <>
          <Button
            variant="outline"
            color="destructive"
            className="stroke-destructive"
            onClick={() => handleDelete(rows.map((v) => v.original.id))}
          >
            <TrashIcon />
            Xoá
          </Button>
        </>
      )}
    />
  );
}
