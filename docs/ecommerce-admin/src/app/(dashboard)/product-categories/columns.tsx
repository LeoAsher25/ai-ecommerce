'use client';

import { revalidate } from '@/actions';
import {
  Button,
  Checkbox,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { DeleteButtonWithConfirm } from '@/components/ui/delete-button-with-confirm';
import { APP_ROUTES } from '@/constants/routes';
import { toast } from '@/hooks/use-toast';
import EditIcon from '@/public/edit.svg';
import { productCategoryService } from '@/services/productCategories';

import {
  EProductCategoryStatus,
  IProductCategory,
} from '@/types/productCategory';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<IProductCategory>[] = [
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
    header: 'Tên phân loại',
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'parentId',
    header: 'Phân loại cha',
    cell: ({ row }) => (
      <div>{row.original.parent ? row.original.parent?.name : '---'}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ getValue, row }) => (
      <Tooltip>
        <TooltipTrigger>
          <Switch
            checked={getValue() === EProductCategoryStatus.ACTIVE}
            onCheckedChange={async (value) => {
              try {
                const { success, message } =
                  await productCategoryService.upsertProductCategory({
                    id: row.original._id,
                    status: value
                      ? EProductCategoryStatus.ACTIVE
                      : EProductCategoryStatus.INACTIVE,
                  });
                toast({
                  title: success ? 'Thành công' : 'Thất bại',
                  description: message,
                  variant: success ? 'success' : 'destructive',
                  duration: 5000,
                });
                await revalidate({
                  path: APP_ROUTES.PRODUCT_CATEGORIES,
                  type: 'page',
                });
              } catch {
                toast({
                  title: 'Thất bại',
                  description: 'Thất bại. Vui lòng thử lại',
                  variant: 'destructive',
                  duration: 5000,
                });
              }
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-muted-foreground text-muted">
          {getValue() === EProductCategoryStatus.ACTIVE ? 'Hoạt động' : 'Đã ẩn'}
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    id: 'actions',
    header: 'Hành dộng',
    size: 120,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        {/* <Button variant="ghost" size="icon" asChild>
          <Link href={`${APP_ROUTES.PRODUCT_CATEGORIES}/${row.original._id}`}>
            <ViewIcon />
          </Link>
        </Button> */}
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={`${APP_ROUTES.PRODUCT_CATEGORIES}/edit/${row.original._id}`}
          >
            <EditIcon />
          </Link>
        </Button>
        <DeleteButtonWithConfirm
          onDelete={async () => {
            try {
              const { success, message } =
                await productCategoryService.deleteProductCategory(
                  row.original._id,
                );
              toast({
                title: success ? 'Thành công' : 'Thất bại',
                description: message,
                variant: success ? 'success' : 'destructive',
                duration: 5000,
              });
              await revalidate({
                path: APP_ROUTES.PRODUCT_CATEGORIES,
                type: 'page',
              });
            } catch {
              toast({
                title: 'Thất bại',
                description: 'Thất bại. Vui lòng thử lại',
                variant: 'destructive',
                duration: 5000,
              });
            }
          }}
          title="Xóa sản phẩm"
          description={`Bạn có chắc chắn muốn xóa sản phẩm "${row.original.name}"?`}
          confirmText="Xóa"
          cancelText="Hủy"
        />
      </div>
    ),
  },
];
