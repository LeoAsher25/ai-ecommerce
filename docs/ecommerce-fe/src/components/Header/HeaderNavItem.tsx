import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LOWER_HEADER_HEIGHT } from '@/constants'
import { Menu } from '@/types/Menu'

import Dropdown from './Dropdown'

const NavMenuItem = ({
  menuItem,
  isLargeMenu,
}: {
  menuItem: Menu
  isLargeMenu: boolean
  key: number
}) => {
  const pathname = usePathname()

  // Check if current path matches menu item path or starts with it (for submenu items)
  const isActive =
    pathname === menuItem.path ||
    (menuItem.submenu && menuItem.submenu.some((item) => pathname === item.path)) ||
    (pathname.startsWith(menuItem.path) && menuItem.path !== '/')

  return menuItem.submenu ? (
    <Dropdown
      style={{
        height: isLargeMenu ? LOWER_HEADER_HEIGHT : LOWER_HEADER_HEIGHT - 10,
      }}
      menuItem={menuItem}
      isLargeMenu={isLargeMenu}
      isActive={isActive}
    />
  ) : (
    <li
      className={`group relative before:w-0 before:h-[3px] before:bg-primary before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full flex items-center ${
        isActive ? 'before:w-full' : ''
      }`}
      style={{
        height: isLargeMenu ? LOWER_HEADER_HEIGHT : LOWER_HEADER_HEIGHT - 10,
      }}
    >
      <Link
        href={menuItem.path}
        className={`hover:text-primary text-custom-sm font-medium ${
          isActive ? 'text-primary' : 'text-dark'
        } flex h-full items-center`}
      >
        {menuItem.name}
      </Link>
    </li>
  )
}

export default NavMenuItem
