import React from 'react'

import { Metadata } from 'next'

import BlogGridWithSidebar from '@/components/BlogGridWithSidebar'

export const metadata: Metadata = {
  title: 'Blog Grid Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Blog Grid Page for NextCommerce Template',
  // other metadata
}

const BlogGridWithSidebarPage = () => {
  return (
    <>
      <BlogGridWithSidebar />
    </>
  )
}

export default BlogGridWithSidebarPage
