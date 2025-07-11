import React from 'react'
interface PaginationProps {
  currentPage: number // start at 1
  pageSize: number
  totalItems: number
  onPageChange: (page: number, pageSize: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    const maxVisible = 7 // Maximum visible numbers in the pagination bar
    const halfVisible = Math.floor((maxVisible - 2) / 2) // Used to center the current page

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let start = Math.max(2, currentPage - halfVisible) // Prevents pages before 2
      let end = Math.min(totalPages - 1, currentPage + halfVisible) // Prevents pages after totalPages - 1
      if (currentPage - 1 <= halfVisible) {
        end = maxVisible - 1 // Ensure enough buttons are shown at the start
      }
      if (totalPages - currentPage <= halfVisible) {
        start = totalPages - maxVisible + 2 // Ensure enough buttons are shown at the end
      }
      pageNumbers.push(1)
      if (start > 2) pageNumbers.push('...')
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }
      if (end < totalPages - 1) pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5">
      <button
        onClick={() => onPageChange(currentPage - 1, pageSize)}
        disabled={currentPage === 1}
        className="w-[32px] h-[32px] md:w-[39px] md:h-[39px] flex items-center justify-center text-black-secondary rounded-full disabled:opacity-50 bg-[#F0F0F0]"
      >
        {/* &lt; */}

        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 9.5L0.75 5L5.25 0.5"
            stroke="#6A6A67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-[10px]">
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page, pageSize)}
              className={`w-[32px] h-[32px] md:w-[39px] md:h-[39px] flex items-center justify-center text-black-secondary rounded-full duration-300 hover:bg-[#5FB677AA] hover:text-white ${
                page === currentPage ? 'bg-[#5FB677] text-white' : 'bg-[#F0F0F0]'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1">
              {page}
            </span>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1, pageSize)}
        disabled={currentPage === totalPages}
        className="w-[32px] h-[32px] md:w-[39px] md:h-[39px] flex items-center justify-center text-black-secondary rounded-full disabled:opacity-50 bg-[#F0F0F0]"
      >
        {/* &gt; */}

        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 9.5L5.25 5L0.75 0.5"
            stroke="#6A6A67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
