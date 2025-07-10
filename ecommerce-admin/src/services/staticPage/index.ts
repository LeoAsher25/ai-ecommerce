import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetStaticPagesRequest,
  GetStaticPagesResponse,
  GetStaticPageResponse,
  UpsertStaticPageRequest,
} from './type';

export const staticPageService = {
  getStaticPages: withAxiosHandler((params: GetStaticPagesRequest) =>
    axios.get<GetStaticPagesResponse>('/static-pages', { params }),
  ),

  getStaticPage: withAxiosHandler((slug: string) =>
    axios.get<GetStaticPageResponse>(`/static-pages/${slug}`),
  ),

  createStaticPage: withAxiosHandler((payload: UpsertStaticPageRequest) =>
    axios.post('/static-pages', payload),
  ),

  updateStaticPage: withAxiosHandler(
    (slug: string, payload: UpsertStaticPageRequest) =>
      axios.patch(`/static-pages/${slug}`, payload),
  ),

  deleteStaticPage: withAxiosHandler((slug: string) =>
    axios.delete(`/static-pages/${slug}`),
  ),
};
