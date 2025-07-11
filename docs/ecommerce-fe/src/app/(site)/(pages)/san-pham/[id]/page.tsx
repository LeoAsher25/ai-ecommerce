import { Metadata } from 'next'

import { AwaitComponent } from '@/components/Common/AwaitComponent'
import ShopDetails from '@/components/ShopDetails'
import { productService } from '@/services/product'

export const metadata: Metadata = {
  title: 'Shop Details Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Shop Details Page for NextCommerce Template',
  // other metadata
}

async function ShopDetailsPage(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await props.params

  const promise = productService.getProductById(id as string)

  return (
    <main>
      <AwaitComponent promise={promise}>
        {({ success, data }) => {
          return <ShopDetails product={success ? data : null} />
        }}
      </AwaitComponent>
    </main>
  )
}

export default ShopDetailsPage
