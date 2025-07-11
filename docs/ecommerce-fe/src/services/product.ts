import { APIListResponse, APIResponse } from '@/types/api'
import { IProduct, IProductParams } from '@/types/product'
import { axiosHandler, axiosInstance } from '@/utils/axiosHandler'

export const productService = {
  getProducts: axiosHandler(async (params: IProductParams) => {
    return axiosInstance.get<APIListResponse<IProduct>>('/products', {
      params,
    })
  }),
  getProductById: axiosHandler(async (id: string) => {
    return axiosInstance.get<APIResponse<IProduct>>(`/products/${id}`)
  }),
}
