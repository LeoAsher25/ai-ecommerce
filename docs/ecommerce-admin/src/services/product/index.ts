import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetProductDetailResponse,
  GetProductsRequest,
  GetProductsResponse,
  UpsertProductRequest,
} from './type';

export const productService = {
  getProducts: withAxiosHandler((params: GetProductsRequest) =>
    axios.get<GetProductsResponse>('/products', { params }),
  ),

  getProductDetail: withAxiosHandler((id: string) =>
    axios.get<GetProductDetailResponse>(`/products/${id}`),
  ),

  upsertProduct: withAxiosHandler(({ id, ...payload }: UpsertProductRequest) =>
    id
      ? axios.patch(`/products/${id}`, payload)
      : axios.post('/products', payload),
  ),

  deleteProduct: withAxiosHandler((id: string) =>
    axios.delete(`/products/${id}`),
  ),

  updateMultipleProducts: withAxiosHandler(() => axios.put('/products')),

  createMockProducts: withAxiosHandler(() =>
    axios.post('/products/create-mock'),
  ),
};
