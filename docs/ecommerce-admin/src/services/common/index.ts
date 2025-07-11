import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryDetailResponse,
  UpsertCategoryRequest,
} from './type';

export const commonService = {
  getCategories: withAxiosHandler((params: GetCategoriesRequest) =>
    axios.get<GetCategoriesResponse>('/categories', { params }),
  ),

  getAllCategories: (params: GetCategoriesRequest) =>
    commonService.getCategories({ ...params, limit: 1000 }),

  getCategoryDetail: withAxiosHandler((id: number) =>
    axios.get<GetCategoryDetailResponse>(`/categories/${id}`),
  ),

  upsertCategory: withAxiosHandler(
    ({ id, ...payload }: UpsertCategoryRequest) =>
      id
        ? axios.put(`/categories/${id}`, payload)
        : axios.post('/categories', payload),
  ),

  deleteCategories: withAxiosHandler((ids: number[]) =>
    axios.delete('/categories', { params: { ids } }),
  ),
};
