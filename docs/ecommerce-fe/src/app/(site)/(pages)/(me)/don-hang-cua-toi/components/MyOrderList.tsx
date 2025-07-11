'use client'

import Table, { Column } from '@/components/Common/Table'
import { IOrder } from '@/types/order'
import { formatDate, formatPrice } from '@/utils/string'

interface MyOrderListProps {
  orders: IOrder[]
}

const MyOrderList = ({ orders }: MyOrderListProps) => {
  const columns = [
    {
      key: 'id',
      title: '#',
      render: (_: number, __: IOrder, index: number) => {
        return <span>{index + 1}</span>
      },
    },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      render: (value: string) => {
        return <span>{formatDate(new Date(value))}</span>
      },
    },
    {
      key: 'totalCost',
      title: 'Tổng',
      render: (value: number) => {
        return <span>{formatPrice(value)}</span>
      },
    },
    {
      key: 'orderStatus',
      title: 'Trạng thái đơn hàng',
    },
    {
      key: 'paymentStatus',
      title: 'Trạng thái thanh toán',
    },
    {
      key: 'action',
      title: 'Hành động',
    },
  ] as Column<IOrder>[]
  return <Table columns={columns} data={orders} />
}

export default MyOrderList
