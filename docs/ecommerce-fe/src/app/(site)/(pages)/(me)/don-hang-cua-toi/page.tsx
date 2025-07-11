import { Metadata } from 'next'

import { AwaitComponent } from '@/components/Common/AwaitComponent'
import { orderService } from '@/services/order'

import MyOrderList from './components/MyOrderList'

export const metadata: Metadata = {
  title: 'Đơn hàng của tôi',
  description: 'Đơn hàng của tôi',
  keywords: [
    'Đơn hàng của tôi',
    'Đơn hàng',
    'Đơn hàng đã đặt',
    'Sản phẩm đã đặt',
    'Order',
    'Orders',
    'My Orders',
  ],
}

const MyOrdersPage = () => {
  const promise = orderService.getMyOrders({})
  return (
    <div>
      <AwaitComponent promise={promise}>
        {({ success, data }) => {
          return <MyOrderList orders={success ? data.data : []} />
        }}
      </AwaitComponent>
    </div>
  )
}

export default MyOrdersPage
