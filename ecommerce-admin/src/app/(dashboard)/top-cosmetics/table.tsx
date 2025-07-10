'use client';
import { useCallback, useEffect, useState } from 'react';

import {
  SortableDataTable,
  SortableDataTableProps,
} from '@/components/ui/sortable-data-table';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Cosmetic } from '@/types';
import { useDebouncedCallback } from 'use-debounce';
import { GlobalLoading } from '@/components/common/GlobalLoading';
import { cosmeticService } from '@/services/cosmetic';
import { useToast } from '@/hooks/use-toast';
import { revalidate } from '@/actions';

type Props<V> = Omit<SortableDataTableProps<Cosmetic, V>, 'onDragEnd'>;

export function TopCosmeticTable<V>(props: Props<V>) {
  const [data, setData] = useState(props.data);

  const { toast } = useToast();

  const updateRanking = useDebouncedCallback(async (data: Cosmetic[]) => {
    GlobalLoading.show();
    const { success, message } = await cosmeticService.upsertCosmeticRanking({
      cosmetics: data.map((v) => ({ id: v.id, ranking: v.ranking })),
    });

    toast({
      title: success ? 'Thành công' : 'Có lỗi xảy ra',
      description: message,
      variant: success ? 'success' : 'destructive',
      duration: 5000,
    });
    await revalidate({ path: '/top-cosmetics', type: 'page' });
    GlobalLoading.hide();
  }, 500);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        setData((data) => {
          const dataIds = data.map(({ id }) => id as UniqueIdentifier);
          const oldIndex = dataIds.indexOf(Number(active.id));
          const newIndex = dataIds.indexOf(Number(over.id));
          const currRank = data.map((v) => v.ranking);
          const newData = arrayMove(data, oldIndex, newIndex).map((v, idx) => ({
            ...v,
            ranking: currRank[idx],
          }));
          updateRanking(newData);
          return newData;
        });
      }
    },
    [updateRanking],
  );

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <SortableDataTable
      {...props}
      className="rounded-none border-none"
      hidePagination
      data={data}
      onDragEnd={handleDragEnd}
    />
  );
}
