'use client';

import { revalidate } from '@/actions';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';

import TrashIcon from '@/public/trash.svg';
import { cosmeticService } from '@/services/cosmetic';
import { useCallback } from 'react';

type Props<T, V> = DataTableProps<T, V>;

export function CosmeticTable<T extends { id: number }, V>(props: Props<T, V>) {
  const { toast } = useToast();

  const handleDelete = useCallback(
    async (ids: number[]) => {
      const confirm = await GlobalModal.confirm({
        title: 'Xoá cơ sở thẩm mỹ',
        content: 'Bạn chắc chắn muốn xoá cơ sở thẩm mỹ đã chọn?',
      });

      if (!confirm) return;
      GlobalLoading.show();
      const { success, message } = await cosmeticService.deleteCosmetics(ids);
      await revalidate({ path: '/cosmetics', type: 'page' });
      toast({
        variant: success ? 'success' : 'destructive',
        description: message,
      });
      GlobalLoading.hide();
    },
    [toast],
  );

  return (
    <DataTable
      {...props}
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
