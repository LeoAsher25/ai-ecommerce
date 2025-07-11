import React from 'react'

import { Metadata } from 'next'

import Signin from '@/components/Auth/Signin'
export const metadata: Metadata = {
  title: 'Signin Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Signin Page for NextCommerce Template',
  // other metadata
}

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  )
}

export default SigninPage
