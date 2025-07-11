/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { revalidate } from '@/actions';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';
import { useClientOptimistic } from '@/hooks/use-client-optimistic';
import { useToast } from '@/hooks/use-toast';
import { cosmeticService } from '@/services/cosmetic';
import { Cosmetic, STATUS } from '@/types';
import { useCallback } from 'react';
import { generateCosmeticCode } from '../../../utils';
import { columns } from './columns';

type Props<V> = Omit<DataTableProps<Cosmetic, V>, 'columns'>;

export function CosmeticRequestTable<V>({ data, ...props }: Props<V>) {
  const { toast } = useToast();
  const [optimisticData, updateOptimisticData] = useClientOptimistic<
    Cosmetic[],
    { ids: number[]; status: STATUS }
  >(data, (curr, action) => {
    return [
      ...curr.map((v) =>
        action.ids.includes(v.id) ? { ...v, status: action.status } : v,
      ),
    ];
  });

  const handleApprove = useCallback(
    async (id: number | number[], status: STATUS, skipConfirm?: boolean) => {
      const confirm = skipConfirm
        ? true
        : await GlobalModal.confirm({
            title:
              status === STATUS.APPROVED
                ? 'Phê duyệt yêu cầu'
                : 'Từ chối phê duyệt',
            content:
              status === STATUS.APPROVED
                ? 'bạn chắc chắn muốn phê duyệt các yêu cầu đã chọn?'
                : 'Bạn chắc chắn muốn từ chối cơ sở thẩm mỹ đã chọn?',
          });

      if (!confirm) return;
      const ids = typeof id === 'number' ? [id] : id;

      GlobalLoading.show();
      updateOptimisticData({ ids, status });
      const { success, message } = await cosmeticService.upsertCosmeticsStatus({
        cosmetics: ids.map((id) => ({
          id,
          status: status,
          code: status ? generateCosmeticCode(id) : '',
        })),
      });

      toast({
        title: success ? 'Thành công' : 'Có lỗi xảy ra',
        description: message,
        variant: success ? 'success' : 'destructive',
        duration: 5000,
      });
      await revalidate({ path: '/cosmetic-requests', type: 'page' });
      GlobalLoading.hide();
    },
    [toast, updateOptimisticData],
  );
  return (
    <DataTable
      {...props}
      data={optimisticData}
      columns={columns((id, approved) =>
        handleApprove(id, approved ? STATUS.APPROVED : STATUS.REJECTED, true),
      )}
      getAction={(rows) => (
        <>
          <Button
            variant="outline"
            color="destructive"
            onClick={() =>
              handleApprove(
                rows.map((v) => v.original.id),
                STATUS.REJECTED,
              )
            }
          >
            Từ chối
          </Button>
          <Button
            onClick={() =>
              handleApprove(
                rows.map((v) => v.original.id),
                STATUS.APPROVED,
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
