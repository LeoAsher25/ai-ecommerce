'use client'

import React, { Fragment } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import ProductItem from '@/components/Common/ProductItem'
import { APP_ROUTES } from '@/constants/routes'
import { RootState, useAppSelector } from '@/redux/store'
import { productService } from '@/services/product'
import { IProductCategory } from '@/types/productCategory'

const CategoryProducts = ({ category }: { category: IProductCategory }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'category', category.slug],
    queryFn: () =>
      productService.getProducts({
        categories: category._id,
        pageSize: 8,
      }),
  })

  const products = data?.success ? data.data.data : []

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">{category.name}</h2>
        <Link
          href={`${APP_ROUTES.SHOP}?phan-loai=${category.slug}`}
          className="text-primary hover:underline"
        >
          Xem tất cả
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
          {products.map((product) => (
            <ProductItem key={product._id} item={product} />
          ))}
        </div>
      )}
    </div>
  )
}

const ProductsByCategories = () => {
  const { categories } = useAppSelector((state: RootState) => state.categoryReducer)

  // Filter out categories with no products or inactive categories if needed
  const activeCategories = categories.filter((category) => !category.parentId)

  return (
    <section className="my-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Sản phẩm theo danh mục</h1>

        {activeCategories.map((category, index) => (
          <Fragment key={index}>
            {index !== 0 && <div className="border-t border-gray-3 my-8"></div>}

            <CategoryProducts key={category._id} category={category} />
          </Fragment>
        ))}

        {activeCategories.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Không có danh mục sản phẩm nào.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsByCategories
