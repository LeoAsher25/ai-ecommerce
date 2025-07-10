'use client';
import { Image } from '@/components/common/Image';
import { Button, Checkbox } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import EditIcon from '@/public/edit.svg';
import ViewIcon from '@/public/view.svg';
import { IProduct } from '@/types/product';
import { IProductCategory } from '@/types/productCategory';
import resolveImageUrl from '@/utils/resolveImageUrl';
import { formatPrice } from '@/utils/string';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: 'idReadable',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Sản phẩm',
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <Image
          className="size-9 rounded-sm"
          src={resolveImageUrl(row.original.images[0]) || '/default.png'}
          alt="product_image"
          width={36}
          height={36}
          onError={(e) => (e.currentTarget.srcset = '/default.png')}
        />
        <span className="whitespace-nowrap">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Phân loại',
    cell: ({ getValue }) => (
      <div className="whitespace-nowrap">
        {(getValue() as IProductCategory[])
          ?.map((item) => item.name)
          .join(', ')}
      </div>
    ),
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Giá bán',
    cell: ({ getValue }) => formatPrice(getValue() as number),
  },
  {
    accessorKey: 'originalPrice',
    header: 'Giá gốc',
    cell: ({ getValue }) =>
      getValue() ? formatPrice(getValue() as number) : '---',
  },
  {
    id: 'actions',
    header: 'Hành dộng',
    size: 120,
    cell: ({ row }) => (
      <div className="flex flex-nowrap items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`${APP_ROUTES.PRODUCTS}/${row.id}`}>
            <ViewIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`${APP_ROUTES.PRODUCTS}/edit/${row.id}`}>
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  },
];
