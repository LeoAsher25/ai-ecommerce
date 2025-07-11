'use client'

import { useState } from 'react'

import clsx from 'clsx'

export interface Column<T> {
  key: keyof T | string
  title: string
  render?: (value: any, item: T, index: number) => React.ReactNode
  width?: string | number
  sortable?: boolean
}

export interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  onRowClick?: (item: T) => void
  loading?: boolean
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  className,
  onRowClick,
  loading = false,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string
    direction: 'asc' | 'desc'
  } | null>(null)

  const handleSort = (key: keyof T | string) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: 'asc' })
    } else {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      })
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-1">
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={clsx(
                  'px-4 py-3 text-left text-sm font-medium text-dark',
                  column.sortable && 'cursor-pointer hover:bg-gray-2'
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.title}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <svg
                        className={clsx(
                          'w-2 h-2 fill-current',
                          sortConfig?.key === column.key &&
                            sortConfig?.direction === 'asc' &&
                            'text-primary'
                        )}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                      </svg>
                      <svg
                        className={clsx(
                          'w-2 h-2 fill-current',
                          sortConfig?.key === column.key &&
                            sortConfig?.direction === 'desc' &&
                            'text-primary'
                        )}
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                      </svg>
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-dark-4">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            sortedData.map((item, index) => (
              <tr
                key={index}
                className={clsx(
                  'border-b border-gray-3 hover:bg-gray-1 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-4 py-3 text-sm">
                    {/* {column.render ? column.render(item) : item[column.key]} */}
                    {column.render
                      ? column.render(item[column.key], item, index)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
