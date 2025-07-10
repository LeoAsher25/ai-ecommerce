'use client';

import { revalidate } from '@/actions';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';
import { useClientOptimistic } from '@/hooks/use-client-optimistic';
import { useToast } from '@/hooks/use-toast';

import TrashIcon from '@/public/trash.svg';
import { reviewService } from '@/services/review';
import { Review } from '@/types';
import { useCallback } from 'react';
import { columns } from './columns';

type Props<V> = Omit<DataTableProps<Review, V>, 'columns'>;

export function ReviewTable<V>(props: Props<V>) {
  const { toast } = useToast();
  const [optimisticData, updateOptimisticData] = useClientOptimistic<
    Review[],
    { id: number; show: boolean }
  >(props.data, (curr, action) => {
    return [
      ...curr.map((v) =>
        v.id === action.id ? { ...v, show: action.show } : v,
      ),
    ];
  });

  const updateShow = async (id: number, show: boolean) => {
    GlobalLoading.show();
    updateOptimisticData({ id, show });
    const { success, message } = await reviewService.upsertReview({
      id: id,
      show,
    });
    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });
    await revalidate({ path: '/reviews', type: 'page' });
    GlobalLoading.hide();
  };

  const handleDelete = useCallback(
    async (ids: number[]) => {
      const confirm = await GlobalModal.confirm({
        title: 'Xoá review',
        content: 'Bạn chắc chắn muốn xoá review đã chọn?',
      });
      if (!confirm) return;
      GlobalLoading.show();
      const { success, message } = await reviewService.deleteReviews(ids);
      await revalidate({ path: '/reviews', type: 'page' });
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
      data={optimisticData}
      columns={columns({ updateShow })}
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
