'use client';

import { revalidate } from '@/actions';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';
import { useClientOptimistic } from '@/hooks/use-client-optimistic';
import { toast } from '@/hooks/use-toast';
import { reviewService } from '@/services/review';
import { Review, STATUS } from '@/types';

import { useCallback } from 'react';
import { columns } from './columns';

type Props<V> = Omit<DataTableProps<Review, V>, 'columns'>;

export function ReviewTable<V>(props: Props<V>) {
  const [optimisticData, updateOptimisticData] = useClientOptimistic<
    Review[],
    { ids: number[]; approval: boolean }
  >(props.data, (curr, action) => {
    return [
      ...curr.map((v) =>
        action.ids.includes(v.id)
          ? {
              ...v,
              status: action.approval ? STATUS.APPROVED : STATUS.REJECTED,
            }
          : v,
      ),
    ];
  });

  const handleApprove = useCallback(
    async (id: number | number[], approval: boolean) => {
      const confirm =
        typeof id === 'object'
          ? await GlobalModal.confirm({
              title: approval ? 'Phê duyệt review' : 'Từ chối review',
              content: approval
                ? 'Bạn chắc chắn muốn phê duyệt các review đã chọn?'
                : 'Bạn chắc chắn muốn từ chối các review đã chọn?',
            })
          : true;
      if (!confirm) return;
      const ids = typeof id === 'number' ? [id] : id;

      GlobalLoading.show();
      updateOptimisticData({ ids, approval });
      const { success, message } = await reviewService.updateReviews({
        ids: ids,
        isApproved: approval,
      });
      toast({
        title: success ? 'Thành công' : 'Có lỗi xảy ra',
        description: message,
        variant: success ? 'success' : 'destructive',
        duration: 5000,
      });
      await revalidate({ path: '/reviews', type: 'page' });
      GlobalLoading.hide();
    },
    [updateOptimisticData],
  );
  return (
    <DataTable
      {...props}
      data={optimisticData}
      columns={columns}
      getAction={(rows) => (
        <>
          <Button
            variant="outline"
            color="destructive"
            onClick={() =>
              handleApprove(
                rows.map((v) => v.original.id),
                false,
              )
            }
          >
            Từ chối
          </Button>
          <Button
            onClick={() =>
              handleApprove(
                rows.map((v) => v.original.id),
                true,
              )
            }
          >
            Phê duyệt
          </Button>
        </>
      )}
    />
  );
}
