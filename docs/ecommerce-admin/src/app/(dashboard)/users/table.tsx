'use client';

import { GlobalModal } from '@/components/common/GlobalModal';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableProps } from '@/components/ui/data-table';

import TrashIcon from '@/public/trash.svg';
import { useCallback } from 'react';
import { columns } from './columns';
import { User } from '@/types';
import { userService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { revalidate } from '@/actions';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { useClientOptimistic } from '@/hooks/use-client-optimistic';

type Props<T, V> = Omit<DataTableProps<T, V>, 'columns'>;

export function UserTable<V>(props: Props<User, V>) {
  const { toast } = useToast();
  const [optimisticData, updateOptimisticData] = useClientOptimistic<
    User[],
    { id: number; active: boolean }
  >(props.data, (curr, action) => {
    return [
      ...curr.map((v) =>
        v.id === action.id ? { ...v, isActive: action.active } : v,
      ),
    ];
  });

  const handleDelete = useCallback(
    async (ids: number[]) => {
      const confirm = await GlobalModal.confirm({
        title: 'Xoá thông tin người dùng',
        content: 'Bạn chắc chắn muốn xoá thông tin người dùng đã chọn?',
      });
      if (!confirm) return;
      GlobalLoading.show();
      const { success, message } = await userService.deleteUsers(ids);
      await revalidate({ path: '/users', type: 'page' });
      toast({
        variant: success ? 'success' : 'destructive',
        description: message,
      });
      GlobalLoading.hide();
    },
    [toast],
  );

  const updateActivation = async (id: number, active: boolean) => {
    GlobalLoading.show();
    updateOptimisticData({ id, active });
    const { success, message } = await userService.upsertUser({
      id: id,
      isActive: active,
    });
    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });
    await revalidate({ path: '/users', type: 'page' });
    GlobalLoading.hide();
  };

  return (
    <DataTable
      {...props}
      data={optimisticData}
      columns={columns({ updateActivation })}
      getAction={(row) => (
        <>
          <Button
            variant="outline"
            color="destructive"
            className="stroke-destructive"
            onClick={() => handleDelete(row.map((v) => v.original.id))}
          >
            <TrashIcon />
            Xoá
          </Button>
        </>
      )}
    />
  );
}
