import React from 'react'

import { Metadata } from 'next'

import MyAccount from '@/components/MyAccount'
export const metadata: Metadata = {
  title: 'My Account | NextCommerce Nextjs E-commerce template',
  description: 'This is My Account page for NextCommerce Template',
  // other metadata
}

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  )
}

export default MyAccountPage
