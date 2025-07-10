import { APIListResponse } from '@/types/api'
import { IProductCategory } from '@/types/productCategory'
import { axiosHandler, axiosInstance } from '@/utils/axiosHandler'

export const categoryService = {
  getCategories: axiosHandler(async () =>
    axiosInstance.get<APIListResponse<IProductCategory>>('/product-categories', {
      params: {
        pageSize: 9999,
      },
    })
  ),
}
