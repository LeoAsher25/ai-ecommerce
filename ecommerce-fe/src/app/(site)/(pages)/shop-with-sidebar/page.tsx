import { Suspense } from 'react'

import { Metadata } from 'next'

import { AwaitComponent } from '@/components/Common/AwaitComponent'
import PreLoader from '@/components/Common/PreLoader'
import ShopWithSidebar from '@/components/ShopWithSidebar'
import { productService } from '@/services/product'

export const metadata: Metadata = {
  title: 'Shop Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Shop Page for NextCommerce Template',
  // other metadata
}

const ShopWithSidebarPage = () => {
  const promise = productService.getProducts({})

  return (
    <main>
      <Suspense fallback={<PreLoader />}>
        <AwaitComponent promise={promise}>
          {({ success, data }) => {
            return <ShopWithSidebar productsList={success ? data.data : []} />
          }}
        </AwaitComponent>
      </Suspense>
    </main>
  )
}

export default ShopWithSidebarPage
