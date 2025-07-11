import clsx from 'clsx'

import { EPaymentMethod } from '@/types/order'

interface PaymentMethodProps {
  payment: EPaymentMethod
  setPayment: (payment: EPaymentMethod) => void
}

const methodsList = [
  {
    key: EPaymentMethod.COD,
    name: 'Thanh toán khi nhận hàng',
    image: '/images/checkout/cash.svg',
    content: 'Trả tiền mặt khi giao hàng.',
  },
  {
    key: EPaymentMethod.BANK_TRANSFER,
    name: 'Thanh toán qua ngân hàng',
    image: '/images/checkout/bank.svg',
    content:
      'Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng viết Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc gọi xác nhận và giao sau khi tiền đã chuyển.',
  },
]

const PaymentMethod = ({ payment, setPayment }: PaymentMethodProps) => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Phương thức thanh toán</h3>
      </div>

      <div className="p-4 sm:p-8.5 sm:pt-6">
        <div className="flex flex-col gap-3">
          {methodsList.map((method) => (
            <div key={method.key}>
              <label
                htmlFor={method.key}
                className="flex cursor-pointer select-none items-center gap-4"
              >
                <div className="relative">
                  <input
                    id={method.key}
                    type="radio"
                    className="sr-only"
                    checked={payment === method.key}
                    onChange={() => setPayment(method.key as EPaymentMethod)}
                  />
                  <div
                    className={clsx(
                      'flex h-4 w-4 items-center justify-center rounded-full',
                      payment === method.key ? 'border-4 border-primary' : 'border border-gray-4'
                    )}
                  ></div>
                </div>

                {method.name}
              </label>

              {payment === method.key && (
                <div className="flex items-center gap-4">
                  <p className="pl-8 text-dark">{method.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
