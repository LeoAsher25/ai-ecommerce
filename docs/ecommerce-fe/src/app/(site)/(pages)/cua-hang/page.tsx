import { Suspense } from 'react'

import { Metadata } from 'next'
import { SearchParams } from 'nuqs'

import { AwaitComponent } from '@/components/Common/AwaitComponent'
import PreLoader from '@/components/Common/PreLoader'
import ShopContentPage from '@/components/Shop/ShopContentPage'
import { loadCommonFilterParams } from '@/constants/filterParams'
import { productService } from '@/services/product'

export const metadata: Metadata = {
  title: 'Shop Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Shop Page for NextCommerce Template',
  // other metadata
}

async function ShopWithSidebarPage(props: { searchParams: Promise<SearchParams> }) {
  const {
    search,
    page,
    pageSize,
    ['phan-loai']: categories,
    priceRange,
    sort,
    ratings,
  } = await loadCommonFilterParams(props.searchParams)

  const promise = productService.getProducts({
    search,
    page,
    pageSize,
    categories,
    priceRange,
    sort,
    ratings,
  })

  return (
    <main>
      <Suspense fallback={<PreLoader />}>
        <AwaitComponent promise={promise}>
          {(response) => {
            return (
              <ShopContentPage
                productsList={response?.success ? response?.data.data : []}
                totalItems={response?.success ? response?.data.responseInfo.totalItems : 0}
              />
            )
          }}
        </AwaitComponent>
      </Suspense>
    </main>
  )
}

export default ShopWithSidebarPage
