'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { revalidate } from '@/utils/revalidate'

const SearchInput = () => {
  const searchParams = useSearchParams()

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  const pathname = usePathname()

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const term = searchInputRef.current?.value?.trim()
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    const newUrl = `${pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
    await revalidate({ path: pathname, type: 'page' })
    router.refresh()
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center">
        <div className="relative flex-1 w-full rounded-[5px] overflow-hidden">
          <input
            ref={searchInputRef}
            defaultValue={searchParams.get('search')?.toString()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
            type="search"
            name="search"
            id="search"
            placeholder="Nhập tên sản phẩm bạn muốn tìm..."
            autoComplete="off"
            className="custom-search w-full bg-gray-1 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-100"
          />

          <button
            type="submit"
            id="search-btn"
            aria-label="Search"
            className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-primary"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchInput
