import React from 'react'

import { Metadata } from 'next'

import Checkout from '@/components/Checkout'
import AuthGuard from '@/components/Common/AuthGuard'

export const metadata: Metadata = {
  title: 'Checkout Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Checkout Page for NextCommerce Template',
  // other metadata
}

const CheckoutPage = () => {
  return (
    <main>
      <AuthGuard>
        <Checkout />
      </AuthGuard>
    </main>
  )
}

export default CheckoutPage
