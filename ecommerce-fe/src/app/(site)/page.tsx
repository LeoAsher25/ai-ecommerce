import { Metadata } from 'next'

import Home from '@/components/Home'

export const metadata: Metadata = {
  title: 'Top xe đạp',
  description: 'Top xe đạp',
  keywords: [
    'Top xe đạp',
    'Xe đạp',
    'Xe đạp tốt nhất',
    'Xe đạp tốt',
    'Xe đạp giá rẻ',
    'Xe đạp trẻ em',
    'Xe đạp thể thao',
    'Phụ tùng',
    'Bán xe đạp',
    'Bán phụ tùng',
    'Bán xe đạp trẻ em',
    'Bán xe đạp thể thao',
    'Bán phụ tùng xe đạp',
  ],
  openGraph: {
    title: 'Top xe đạp',
    description: 'Top xe đạp',
    images: ['/images/logo.png'],
    url: 'https://topxedap.com',
    siteName: 'Top xe đạp',
  },
}

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  )
}
