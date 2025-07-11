import { Fragment } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

interface IBreadcrumbProps {
  title: string
  items: {
    name: string
    path: string
  }[]
}

const Breadcrumb = ({ title, items }: IBreadcrumbProps) => {
  return (
    <div className="overflow-hidden shadow-breadcrumb">
      <div className="">
        <div className="xl:max-w-[1170px] px-4 sm:px-7.5 xl:px-0  w-full mx-auto py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-3">
            <h1 className="font-semibold text-dark text-xl">{title}</h1>

            <ul className="flex items-center gap-2">
              <li className="text-custom-sm hover:text-primary">
                <Link href="/">Trang chủ /</Link>
              </li>

              {items?.length > 0 &&
                items?.map((item, key) => {
                  const isLastItem = key === items?.length - 1
                  return (
                    <Fragment key={`${item?.name}-${item?.path}-${key}`}>
                      <li
                        className={clsx(
                          'text-custom-sm hover:text-primary capitalize',
                          isLastItem ? 'pointer-events-none text-primary' : ''
                        )}
                      >
                        <Link href={item?.path}>{item?.name}</Link>
                      </li>
                      {!isLastItem ? '/' : ''}
                    </Fragment>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
