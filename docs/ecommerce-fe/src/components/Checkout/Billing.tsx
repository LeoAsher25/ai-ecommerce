import { UseFormReturn } from 'react-hook-form'

import { useAppSelector } from '@/redux/store'
import { IOrderPayload } from '@/types/order'

import TextInput from '../Common/Form/TextInput'

export type BillingForm = Partial<
  Pick<IOrderPayload, 'fullName' | 'address' | 'phoneNumber' | 'note'>
>

interface BillingProps {
  formModal: UseFormReturn<BillingForm>
}

const Billing = ({ formModal }: BillingProps) => {
  const { currentUser } = useAppSelector((state) => state.userReducer)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formModal

  return (
    <div className="bg-white rounded-[10px] shadow-1">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Thông tin thanh toán</h3>
      </div>

      <div className="p-4 sm:p-8.5 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
          <TextInput
            {...register('fullName')}
            placeholder="Nhập họ tên"
            label="Họ tên"
            required
            errorMessage={errors?.fullName?.message}
          />
        </div>

        {/* <TextInput
          {...register('email')}
          placeholder="Nhập email"
          label="Email"
          required
          errorMessage={errors?.email?.message}
        /> */}

        <TextInput
          {...register('phoneNumber')}
          placeholder="Nhập số điện thoại"
          label="Số điện thoại"
          required
          errorMessage={errors?.phoneNumber?.message}
        />

        <TextInput
          {...register('address')}
          placeholder="Nhập địa chỉ"
          label="Địa chỉ"
          required
          errorMessage={errors?.address?.message}
        />

        <TextInput
          {...register('note')}
          placeholder="Nhập ghi chú"
          label="Ghi chú"
          textarea
          errorMessage={errors?.note?.message}
        />
      </div>
    </div>
  )
}

export default Billing
