'use client'

import React from 'react'

import { logoutUser } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/store'

const LogoutTab = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10">
      <div className="text-center">
        <h3 className="text-xl font-medium text-dark mb-4">Đăng xuất</h3>
        <p className="text-custom-sm mb-6">
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản? Tất cả dữ liệu giỏ hàng sẽ bị xóa.
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex font-medium text-white bg-red-600 py-3 px-7 rounded-md ease-out duration-200 hover:bg-red-700"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default LogoutTab
