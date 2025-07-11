import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetProductCategoriesRequest,
  GetProductCategoriesResponse,
  GetProductCategoryDetailResponse,
  UpsertProductCategoryRequest,
} from './type';
import { useQuery } from '@tanstack/react-query';

export const productCategoryService = {
  getProductCategories: withAxiosHandler(
    (params: GetProductCategoriesRequest) =>
      axios.get<GetProductCategoriesResponse>('/product-categories', {
        params,
      }),
  ),

  getProductCategoryDetail: withAxiosHandler((id: string) =>
    axios.get<GetProductCategoryDetailResponse>(`/product-categories/${id}`),
  ),

  upsertProductCategory: withAxiosHandler(
    ({ id, ...payload }: UpsertProductCategoryRequest) =>
      id
        ? axios.put(`/product-categories/${id}`, payload)
        : axios.post('/product-categories', payload),
  ),

  deleteProductCategory: withAxiosHandler((id: string) =>
    axios.delete(`/product-categories/${id}`),
  ),

  updateMultipleProductCategories: withAxiosHandler(() =>
    axios.put('/product-categories'),
  ),

  createMockProductCategories: withAxiosHandler(() =>
    axios.post('/product-categories/create-mock'),
  ),
};

export const useGetProductCategories = (params: GetProductCategoriesRequest) =>
  useQuery({
    queryKey: ['product-categories'],
    queryFn: () =>
      withAxiosHandler((params: GetProductCategoriesRequest) =>
        axios.get<GetProductCategoriesResponse>('/product-categories', {
          params,
        }),
      )(params),
  });
