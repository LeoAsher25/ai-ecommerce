import { ITokenReponse } from '@/types/common'
import { ILoginPayload } from '@/types/user'
import { axiosInstance } from '@/utils/axiosHandler'

export const authService = {
  // login: axiosHandler(async (data: ILoginPayload) => {
  //   return axiosInstance.post<ITokenReponse>('/auth/login', data)
  // }),
  login: async (data: ILoginPayload) => {
    return axiosInstance.post<ITokenReponse>('/auth/login', data)
  },
}
