import { APIListResponse } from '@/types/api'
import { IOrder, IOrderParams, IOrderPayload } from '@/types/order'
import { axiosHandler, axiosInstance } from '@/utils/axiosHandler'

export const orderService = {
  createOrder: axiosHandler(async (payload: IOrderPayload) => {
    return axiosInstance.post<IOrder>('/orders', payload)
  }),
  getMyOrders: axiosHandler(async (params?: IOrderParams) => {
    return axiosInstance.get<APIListResponse<IOrder>>('/orders', {
      params,
    })
  }),
}
