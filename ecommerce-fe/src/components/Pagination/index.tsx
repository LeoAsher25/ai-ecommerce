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
  totalItems = 0,
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
    <div className="flex justify-center">
      <div className="bg-white shadow-1 rounded-md p-2">
        <ul className="flex items-center gap-1">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1, pageSize)}
              id="paginationLeft"
              aria-label="button for pagination left"
              type="button"
              disabled={currentPage === 1}
              className={`flex min-w-[36px] items-center justify-center w-8 h-9 ease-out duration-200 rounded-md disabled:text-gray-4 ${
                currentPage === 1 ? '' : 'hover:text-white hover:bg-primary '
              }`}
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
                  d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </li>

          {pageNumbers.map((page, index) => (
            <li key={String(page) + index}>
              <button
                onClick={() => onPageChange(Number(page), pageSize)}
                className={`flex py-1.5 px-2 min-w-[36px] select-none items-center justify-center duration-300 rounded-md hover:text-white hover:bg-primary ${
                  page === currentPage ? 'bg-primary text-white' : 'bg-white'
                } ${typeof page !== 'number' ? 'pointer-events-none' : ''}`}
              >
                <span className="mt-[1px] mb-[-1px]">{page}</span>
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => onPageChange(currentPage + 1, pageSize)}
              id="paginationLeft"
              aria-label="button for pagination left"
              type="button"
              disabled={currentPage === totalPages}
              className={`flex min-w-[36px] items-center justify-center w-8 h-9 ease-out duration-200 rounded-md disabled:text-gray-4 ${
                currentPage === totalPages ? '' : 'hover:text-white hover:bg-primary '
              }`}
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
                  d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Pagination
