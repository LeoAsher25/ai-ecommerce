import React from 'react'

import { useSelector } from 'react-redux'

import { selectTotalPrice } from '@/redux/features/cart-slice'
import { useAppSelector } from '@/redux/store'
import { formatPrice } from '@/utils/string'
const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  const totalPrice = useSelector(selectTotalPrice)

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Tóm tắt đơn hàng</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3 gap-4">
            <div>
              <h4 className="font-medium text-dark">Sản phẩm</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Tổng</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3 gap-4"
            >
              <div>
                <p className="text-dark">{item.name}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  {formatPrice(item.sellingPrice * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
