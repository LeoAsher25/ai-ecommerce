'use client'

import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

import { APP_ROUTES } from '@/constants/routes'
import { removeAllItemsFromCart, selectTotalPrice } from '@/redux/features/cart-slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { orderService } from '@/services/order'
import { EPaymentMethod } from '@/types/order'
import handleError from '@/utils/handleError'
import { formatPrice } from '@/utils/string'

import Breadcrumb from '../Common/Breadcrumb'

import Billing, { BillingForm } from './Billing'
import PaymentMethod from './PaymentMethod'

const orderSchema = yup.object().shape({
  fullName: yup.string().required('Tên không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  phoneNumber: yup.string().required('Số điện thoại không được để trống'),
  note: yup.string().optional(),
})

const Checkout = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.userReducer)
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  const totalPrice = useSelector(selectTotalPrice)

  const [isLoading, setIsLoading] = useState(false)

  const [payment, setPayment] = useState<EPaymentMethod>(EPaymentMethod.COD)

  const formModal = useForm<BillingForm>({
    defaultValues: {
      fullName: '',
      address: '',
      phoneNumber: '',
      note: '',
    },
    resolver: yupResolver(orderSchema),
  })

  const handleSubmit = async () => {
    try {
      const valid = await formModal.trigger()
      if (!valid) return

      const { fullName, address, phoneNumber, note } = formModal.getValues()

      const response = await orderService.createOrder({
        fullName,
        address,
        phoneNumber,
        note,
        paymentMethod: payment,
        orderItems: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.images[0],
          price: item.sellingPrice,
          quantity: item.quantity,
        })),
      })

      if (response.success) {
        dispatch(removeAllItemsFromCart())
        toast.success('Đặt hàng thành công')
        router.push(APP_ROUTES.ORDER)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      formModal.reset({
        fullName: `${currentUser?.lastName ?? ''} ${currentUser?.firstName ?? ''}`,
        address: currentUser?.address,
        phoneNumber: currentUser?.phone,
        note: '',
      })
    } else {
      // router.push(APP_ROUTES.LOGIN)
    }
  }, [currentUser])

  return (
    <>
      <Breadcrumb title={'Thanh toán'} items={[{ name: 'Thanh toán', path: '' }]} />
      <section className="overflow-hidden py-8 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5">
              <div className="w-full flex flex-col gap-7.5">
                <Billing formModal={formModal} />

                {/* <Shipping /> */}
              </div>

              <div className="lg:max-w-[450px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Đơn hàng của bạn</h3>
                  </div>

                  <div className="pb-4 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-3 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Sản phẩm</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">Tổng</h4>
                      </div>
                    </div>

                    {cartItems.map((item, key) => (
                      <div
                        key={key}
                        className="flex items-center justify-between py-3 border-b border-gray-3 gap-4"
                      >
                        <div>
                          <p className="text-dark line-clamp-1">{item.name}</p>
                        </div>
                        <div>
                          <p className="text-dark text-right">
                            {formatPrice(item.sellingPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div key={'Total'} className="flex items-center justify-between py-3 gap-4">
                      <div>
                        <p className="text-dark line-clamp-1 font-medium">Tổng</p>
                      </div>
                      <div>
                        <p className="text-dark text-right font-medium">
                          {formatPrice(totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <Coupon /> */}

                {/* <ShippingMethod /> */}

                <PaymentMethod payment={payment} setPayment={setPayment} />

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
                >
                  {isLoading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Checkout
