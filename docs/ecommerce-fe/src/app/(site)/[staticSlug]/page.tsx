import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { staticPageService } from '@/services/staticPage'

// Tạo metadata động cho SEO
export async function generateMetadata({
  params,
}: {
  params: { staticSlug: string }
}): Promise<Metadata> {
  try {
    const response = await staticPageService.getStaticPageBySlug(params.staticSlug)

    if (!response.success) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found',
      }
    }

    const staticPage = response.data
    return {
      title: staticPage.title,
      description: staticPage.metaDescription || `${staticPage.title} - Official information`,
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found',
    }
  }
}

// Tạo các đường dẫn tĩnh khi build
export async function generateStaticParams() {
  try {
    const response = await staticPageService.getAllStaticPages()
    if (!response.success) return []

    return response.data.data.map((page) => ({
      staticSlug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function StaticContentPage({ params }: { params: { staticSlug: string } }) {
  try {
    const response = await staticPageService.getStaticPageBySlug(params.staticSlug)

    if (!response.success) {
      notFound()
    }

    const staticPage = response.data

    return (
      <div className="container mx-auto py-8 px-4">
        <div className=" mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* <h1 className="text-3xl font-bold mb-6">{staticPage.title}</h1> */}
          <div
            dangerouslySetInnerHTML={{ __html: staticPage.content }}
            className="prose max-w-none"
          />
          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date(staticPage.lastUpdatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
