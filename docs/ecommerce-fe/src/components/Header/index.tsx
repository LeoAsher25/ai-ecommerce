'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { LOWER_HEADER_HEIGHT } from '@/constants'
import { APP_ROUTES } from '@/constants/routes'
import useScroll from '@/hooks/useScroll'
import { categoryActions } from '@/redux/features/category-clice'
import { userActions } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/store'
import { userService } from '@/services/user'
import { IProductCategory } from '@/types/productCategory'
import handleError from '@/utils/handleError'

import Dropdown from './Dropdown'
import NavMenuItem from './HeaderNavItem'
import { menuData } from './menuData'
import UpperHeader from './UpperHeader'

interface IHeaderProps {
  categories: IProductCategory[]
}

const Header = ({ categories }: IHeaderProps) => {
  const scrollPosition = useScroll()
  const router = useRouter()
  const { data: dataSession } = useSession()

  const [isLargeMenu, setIsLargeMenu] = useState(true)
  const [hasProfile, setHasProfile] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (scrollPosition < (isLargeMenu ? 150 : 80)) {
      setIsLargeMenu(true)
    } else {
      setIsLargeMenu(false)
    }
  }, [scrollPosition])

  useEffect(() => {
    if (categories) {
      dispatch(
        categoryActions.setItem({
          categories,
        })
      )
    }
  }, [categories])

  const initialSession = async () => {
    try {
      if (hasProfile) return
      const response = await userService.profile(dataSession?.accessToken)
      dispatch(
        userActions.setItem({
          currentUser: response.data,
          accessToken: dataSession?.accessToken,
        })
      )
      setHasProfile(true)
    } catch (error) {
      handleError(error, router)
    }
  }

  useEffect(() => {
    if (dataSession) {
      initialSession()
    } else if (dataSession === null) {
      dispatch(
        userActions.setItem({
          currentUser: null,
        })
      )
    }
  }, [dataSession])

  return (
    <header
      className={`sticky left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        !isLargeMenu && 'shadow-md'
      }`}
    >
      <UpperHeader isLargeMenu={isLargeMenu} />

      <div
        className="border-b border-gray-3 hidden xl:block"
        style={{
          height: isLargeMenu ? LOWER_HEADER_HEIGHT : LOWER_HEADER_HEIGHT - 10,
        }}
      >
        <div className="max-w-[1170px] mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between`}
            >
              <nav>
                <ul className="[& > *]:whitespace-nowrap flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData
                    .concat(
                      categories
                        .filter((category) => !category.parentId)
                        .map((item) => ({
                          id: item._id,
                          name: item.name,
                          newTab: false,
                          path: `${APP_ROUTES.SHOP}?phan-loai=${item.slug}`,
                          submenu: categories
                            .filter((subItem) => subItem.parentId === item._id)
                            .map((subItem) => ({
                              id: subItem._id,
                              name: subItem.name,
                              newTab: false,
                              path: `${APP_ROUTES.SHOP}?phan-loai=${subItem.slug}`,
                            })),
                        }))
                    )
                    .map((menuItem, i) => (
                      <NavMenuItem menuItem={menuItem} isLargeMenu={isLargeMenu} key={i} />
                    ))}
                </ul>
              </nav>
            </div>

            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5">
                <li className="py-4">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-primary"
                  >
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073ZM7.99992 3.66709L7.45955 4.18719C7.60094 4.33408 7.79604 4.41709 7.99992 4.41709C8.2038 4.41709 8.3989 4.33408 8.54028 4.18719L7.99992 3.66709ZM10.0254 12.6073L10.4897 13.1962L10.0254 12.6073ZM6.43872 12.0183C5.41345 11.21 4.33627 10.4524 3.47904 9.48717C2.64752 8.55085 2.08325 7.47831 2.08325 6.0914H0.583252C0.583252 7.94644 1.3588 9.35867 2.35747 10.4832C3.33043 11.5788 4.57383 12.4582 5.51009 13.1962L6.43872 12.0183ZM2.08325 6.0914C2.08325 4.75102 2.84027 3.63995 3.85342 3.17683C4.81929 2.73533 6.15155 2.82823 7.45955 4.18719L8.54028 3.14699C6.84839 1.38917 4.84732 1.07324 3.22983 1.8126C1.65962 2.53035 0.583252 4.18982 0.583252 6.0914H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4167 7.99992 14.4167V12.9167C7.85698 12.9167 7.65939 12.8601 7.37512 12.694C7.0911 12.5281 6.79171 12.2965 6.43872 12.0183L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4582 12.6694 11.5788 13.6424 10.4832C14.641 9.35867 15.4166 7.94644 15.4166 6.0914H13.9166C13.9166 7.47831 13.3523 8.55085 12.5208 9.48717C11.6636 10.4524 10.5864 11.21 9.56112 12.0183L10.4897 13.1962ZM15.4166 6.0914C15.4166 4.18982 14.3402 2.53035 12.77 1.8126C11.1525 1.07324 9.15145 1.38917 7.45955 3.14699L8.54028 4.18719C9.84828 2.82823 11.1805 2.73533 12.1464 3.17683C13.1596 3.63995 13.9166 4.75102 13.9166 6.0914H15.4166ZM9.56112 12.0183C9.20813 12.2965 8.90874 12.5281 8.62471 12.694C8.34044 12.8601 8.14285 12.9167 7.99992 12.9167V14.4167C8.52365 14.4167 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0183Z"
                        fill=""
                      />
                    </svg>
                    Yêu thích
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
