'use client';

import { useSearchParams } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { StaticPage } from '@/services/staticPage/type';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { DataTable } from '@/components/ui';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T>[];
  total: number;
}

export function StaticPageTable<T extends StaticPage>(props: Props<T>) {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);
  const page = Number(searchParams.get('page') || 1);

  return (
    <DataTable
      data={props.data}
      columns={props.columns}
      pageCount={Math.ceil(props.total / pageSize)}
      total={props.total}
    />
  );
}
