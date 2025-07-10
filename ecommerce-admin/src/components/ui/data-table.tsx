'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  SortingState,
  Table as TanstackTable,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ReactNode, useEffect, useMemo, useState, useTransition } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import {
  commonSearchParams,
  commonSortParams,
  getSortingKey,
} from '@/constants';
import { Skeleton } from './skeleton';
import { LoaderCircle } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { SORT_ORDER } from '@/types';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  getAction?: (rows: Row<TData>[]) => ReactNode;
}

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
  getAction,
  total,
}: DataTableProps<TData, TValue>) {
  const [loading, startTransition] = useTransition();
  const [rowSelection, setRowSelection] = useState({});

  //const [sortingState, setSortingState] = useState<SortingState>([])
  const [sortingQuery, setSortingQuery] = useQueryStates(commonSortParams, {
    history: 'replace',
    shallow: false,
    startTransition,
  });
  const [paginationQuery, setPaginationQuery] = useQueryStates(
    commonSearchParams,
    {
      history: 'replace',
      shallow: false,
      startTransition,
    },
  );
  const sortingState = useMemo<SortingState>(
    () =>
      Object.entries(sortingQuery)
        .map(([key, value]) =>
          !!value && key.startsWith('sortBy')
            ? {
                id: key.charAt(6).toLowerCase() + key.slice(7),
                desc: value === SORT_ORDER.DESC,
              }
            : null,
        )
        .filter((v) => !!v),
    [sortingQuery],
  );
  const paginationState = useMemo(
    () => ({
      pageIndex: paginationQuery.page - 1,
      pageSize: paginationQuery.pageSize,
    }),
    [paginationQuery?.pageSize, paginationQuery?.page],
  );

  const table = useReactTable({
    data,
    rowCount: total ?? 0,
    columns,
    manualPagination: true,
    getRowId: (row) => row._id.toString(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: async (fn) => {
      const newState = typeof fn === 'function' ? fn(sortingState) : fn;
      setSortingQuery(null);
      setSortingQuery(
        Object.fromEntries(
          newState.map((state) => [
            getSortingKey(state.id),
            state.desc ? SORT_ORDER.DESC : SORT_ORDER.ASC,
          ]),
        ),
      );
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: async (fn) => {
      const state = typeof fn === 'function' ? fn(paginationState) : fn;
      await setPaginationQuery({
        page: state.pageIndex + 1,
        pageSize: state.pageSize,
      });
    },
    state: {
      sorting: sortingState,
      rowSelection,
      pagination: paginationState,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <Table className="min-w-max bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.getSize() === Number.MAX_SAFE_INTEGER
                          ? 'auto'
                          : header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === Number.MAX_SAFE_INTEGER
                          ? 'auto'
                          : cell.column.getSize(),
                    }}
                  >
                    {loading ? (
                      <Skeleton className="h-6 w-full min-w-5" />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {!loading ? (
                  'Không có kết quả.'
                ) : (
                  <LoaderCircle className="stroke-border mx-auto size-8 animate-spin" />
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} pageCount={table.getPageCount() || 0} />
      {!!getAction && !!table.getFilteredSelectedRowModel().rows.length && (
        <div className="border-border fixed bottom-4 left-1/2 mx-auto flex w-[520px] -translate-x-1/2 items-center justify-between rounded-2xl border bg-white px-6 py-4">
          <span className="block flex-1">
            Đã chọn {table.getFilteredSelectedRowModel().rows.length}
          </span>
          <div className="flex gap-4">
            {getAction?.(table.getFilteredSelectedRowModel().rows)}
          </div>
        </div>
      )}
    </div>
  );
}

function TablePagination<TData>({
  table,
  pageCount,
}: {
  table: TanstackTable<TData>;
  pageCount: number;
}) {
  const pagination = table.getState().pagination;

  const content = useMemo(() => {
    const currentPage = pagination.pageIndex + 1;
    const currentPageIndex = pagination.pageIndex;

    if (pageCount >= 0 && pageCount <= 4) {
      return Array(pageCount)
        .keys()
        .map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPageIndex === index}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ));
    }

    if (currentPage >= 3) {
      return (
        <>
          <PaginationItem>
            <PaginationLink onClick={table.firstPage}>1</PaginationLink>
          </PaginationItem>
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {[-1, 0, 1].map((index) =>
            currentPage + index < pageCount ? (
              <PaginationItem key={index + currentPageIndex}>
                <PaginationLink
                  isActive={index === 0}
                  onClick={() => table.setPageIndex(currentPageIndex + index)}
                >
                  {currentPage + index}
                </PaginationLink>
              </PaginationItem>
            ) : null,
          )}
          {currentPage + 2 < pageCount && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === pageCount}
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
        </>
      );
    }
    return (
      <>
        {[0, 1, 2].map((index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index === currentPageIndex}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageCount > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            isActive={currentPage === pageCount}
            onClick={() => table.setPageIndex(pageCount - 1)}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      </>
    );
  }, [pagination.pageIndex, pageCount, table]);

  return (
    <Pagination className="border-border border-t bg-white px-4 py-3">
      <PaginationContent className="ml-auto">
        <PaginationItem>
          <PaginationPrevious
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {content}
        <PaginationItem>
          <PaginationNext
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
