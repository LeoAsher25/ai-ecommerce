'use client'

import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { axiosInstance } from '@/utils/axiosHandler'
import handleError from '@/utils/handleError'

const contactSchema = yup.object({
  phoneNumber: yup.string().required('Số điện thoại không được để trống'),
  userHeight: yup.string().required('Chiều cao không được để trống'),
  note: yup.string().optional(),
})

type ContactFormData = {
  phoneNumber: string
  userHeight: string
  note?: string
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      phoneNumber: '',
      userHeight: '',
      note: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true)

      // Call API to send contact form data
      const response = await axiosInstance.post('/contacts', data)

      if (response.status === 200 || response.status === 201) {
        toast.success('Gửi yêu cầu tư vấn thành công!')
        reset() // Reset form after successful submission
      } else {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại sau')
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Số điện thoại"
        {...register('phoneNumber')}
        className={`w-full px-4 py-2 mb-2 outline-none bg-white text-dark border ${
          errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
        } rounded`}
      />
      {errors.phoneNumber && (
        <p className="text-red-dark text-sm mb-4">{errors.phoneNumber.message}</p>
      )}

      <input
        type="text"
        placeholder="Chiều cao người sử dụng"
        {...register('userHeight')}
        className={`w-full px-4 py-2 mb-2 outline-none bg-white text-dark border ${
          errors.userHeight ? 'border-red-500' : 'border-gray-600'
        } rounded`}
      />
      {errors.userHeight && (
        <p className="text-red-dark text-sm mb-4">{errors.userHeight.message}</p>
      )}

      <textarea
        placeholder="Ghi chú"
        {...register('note')}
        className={`w-full px-4 py-2 mb-2 outline-none bg-white text-dark border ${
          errors.note ? 'border-red-500' : 'border-gray-600'
        } rounded`}
        rows={2}
      ></textarea>
      {errors.note && <p className="text-red-dark text-sm mb-4">{errors.note.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex font-medium text-base px-5 py-2 rounded-[5px] bg-primary text-white ease-out duration-200 hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Đang gửi...' : 'Yêu cầu tư vấn và giúp đỡ'}
      </button>
    </form>
  )
}

export default ContactForm
