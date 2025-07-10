import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Dropdown = ({ menuItem, isLargeMenu, style, isActive }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false)
  const pathUrl = usePathname()

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className={`group h-full relative before:w-0 before:h-[3px] before:bg-primary before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        isActive ? 'before:w-full' : ''
      }`}
      style={style}
    >
      <Link
        href={menuItem.path}
        className={`inline-block h-full hover:text-primary text-custom-sm font-medium ${
          isActive ? 'text-primary' : 'text-dark'
        } flex items-center gap-1.5 capitalize`}
      >
        {menuItem.name}
        <svg
          className="fill-current cursor-pointer"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z"
            fill=""
          />
        </svg>
      </Link>

      <ul
        className={`dropdown ${dropdownToggler ? 'flex' : ''} ${
          isLargeMenu ? 'xl:group-hover:translate-y-0' : 'xl:group-hover:translate-y-0'
        }`}
      >
        {menuItem.submenu.map((item, i) => {
          const isSubmenuItemActive = pathUrl === item.path
          return (
            <li key={i}>
              <Link
                href={item.path}
                className={`flex text-custom-sm hover:text-primary hover:bg-gray-1 py-[7px] px-4.5 ${
                  isSubmenuItemActive ? 'text-primary bg-gray-1' : ''
                } `}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default Dropdown
