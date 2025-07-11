import { IProfile } from '@/types/user'
import { axiosInstance } from '@/utils/axiosHandler'

export const userService = {
  profile: (token?: string) => {
    return axiosInstance.get<IProfile>('/users/profile', {
      headers: token
        ? {
            Authorization: 'Bearer ' + token,
          }
        : {},
    })
  },
}
