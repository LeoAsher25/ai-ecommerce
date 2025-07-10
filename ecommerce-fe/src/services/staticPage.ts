import { APIListResponse, APIResponse } from '@/types/api'
import { axiosHandler, axiosInstance } from '@/utils/axiosHandler'

export interface IStaticPage {
  slug: string
  title: string
  content: string
  metaDescription?: string
  metadata?: Record<string, any>
  lastUpdatedAt: string
}

export const staticPageService = {
  getStaticPageBySlug: axiosHandler(async (slug: string) => {
    return axiosInstance.get<APIResponse<IStaticPage>>(`/static-pages/${slug}`)
  }),
  getAllStaticPages: axiosHandler(async () => {
    return axiosInstance.get<APIListResponse<IStaticPage>>('/static-pages')
  }),
}
