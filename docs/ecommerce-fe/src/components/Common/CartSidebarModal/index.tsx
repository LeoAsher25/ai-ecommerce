'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import Drawer from '../Drawer'

import EmptyCart from './EmptyCart'
import SingleItem from './SingleItem'

import { useCartModalContext } from '@/app/context/CartSidebarModalContext'
import { APP_ROUTES } from '@/constants/routes'
import { removeItemFromCart, selectTotalPrice } from '@/redux/features/cart-slice'
import { useAppSelector } from '@/redux/store'
import { formatPrice } from '@/utils/string'

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext()
  const cartItems = useAppSelector((state) => (state.cartReducer as any).items)

  const totalPrice = useSelector(selectTotalPrice)

  return (
    <Drawer open={isCartModalOpen} title="Giỏ hàng" onClose={closeCartModal}>
      <div className="relative h-full flex flex-col">
        <div className="flex flex-col gap-4 flex-1 pt-4 pb-34 px-4 overflow-y-auto">
          {/* <!-- cart item --> */}
          {cartItems.length > 0 ? (
            cartItems.map((item, key) => (
              <SingleItem key={key} item={item} removeItemFromCart={removeItemFromCart} />
            ))
          ) : (
            <div className="my-auto">
              <EmptyCart />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-3 bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between gap-5 mb-4">
              <p className="font-medium text-base lg:text-lg text-dark">Tổng:</p>

              <p className="font-medium text-base lg:text-lg text-dark">
                {formatPrice(totalPrice)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                onClick={() => closeCartModal()}
                href={APP_ROUTES.CART}
                className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark"
              >
                Xem giỏ hàng
              </Link>

              <Link
                onClick={() => closeCartModal()}
                href={APP_ROUTES.CHECKOUT}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default CartSidebarModal
