'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { APP_ROUTES } from '@/constants/routes'
import { logoutUser } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'

const HeaderUserWrap = () => {
  const [dropdownToggler, setDropdownToggler] = useState(false)
  const { currentUser } = useAppSelector((state) => state.userReducer as any)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    if (!currentUser) {
      router.push(APP_ROUTES.LOGIN)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setDropdownToggler(true)}
      onMouseLeave={() => setDropdownToggler(false)}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1.25C9.37666 1.25 7.25001 3.37665 7.25001 6C7.25001 8.62335 9.37666 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75001 6C8.75001 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75001 7.79493 8.75001 6Z"
            fill="#FD0000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 12.25C9.68646 12.25 7.55494 12.7759 5.97546 13.6643C4.4195 14.5396 3.25001 15.8661 3.25001 17.5L3.24995 17.602C3.24882 18.7638 3.2474 20.222 4.52642 21.2635C5.15589 21.7761 6.03649 22.1406 7.22622 22.3815C8.41927 22.6229 9.97424 22.75 12 22.75C14.0258 22.75 15.5808 22.6229 16.7738 22.3815C17.9635 22.1406 18.8441 21.7761 19.4736 21.2635C20.7526 20.222 20.7512 18.7638 20.7501 17.602L20.75 17.5C20.75 15.8661 19.5805 14.5396 18.0246 13.6643C16.4451 12.7759 14.3136 12.25 12 12.25ZM4.75001 17.5C4.75001 16.6487 5.37139 15.7251 6.71085 14.9717C8.02681 14.2315 9.89529 13.75 12 13.75C14.1047 13.75 15.9732 14.2315 17.2892 14.9717C18.6286 15.7251 19.25 16.6487 19.25 17.5C19.25 18.8078 19.2097 19.544 18.5264 20.1004C18.1559 20.4022 17.5365 20.6967 16.4762 20.9113C15.4193 21.1252 13.9742 21.25 12 21.25C10.0258 21.25 8.58075 21.1252 7.5238 20.9113C6.46354 20.6967 5.84413 20.4022 5.4736 20.1004C4.79033 19.544 4.75001 18.8078 4.75001 17.5Z"
            fill="#FD0000"
          />
        </svg>

        <div className="relative">
          <span className="block text-2xs text-dark-4 uppercase">account</span>
          <p className="font-medium text-custom-sm text-dark">
            {currentUser ? `${currentUser.lastName} ${currentUser.firstName}` : 'Đăng nhập'}
          </p>
        </div>
      </div>

      {/* Dropdown menu */}
      {currentUser && (
        <ul
          className={`dropdown ${dropdownToggler ? 'flex' : 'hidden'} absolute right-0 top-0 min-w-[160px] bg-white shadow-md rounded-md py-2 z-50`}
        >
          <li>
            <Link
              href={APP_ROUTES.PROFILE}
              className="inline-block w-full text-left text-custom-sm hover:text-primary hover:bg-gray-1 py-[7px] px-4.5"
            >
              Tài khoản
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left text-custom-sm hover:text-primary hover:bg-gray-1 py-[7px] px-4.5"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default HeaderUserWrap
