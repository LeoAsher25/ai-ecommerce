import React from 'react'

import { Metadata } from 'next'

import Error from '@/components/Error'

export const metadata: Metadata = {
  title: 'Error Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Error Page for NextCommerce Template',
  // other metadata
}

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  )
}

export default ErrorPage
