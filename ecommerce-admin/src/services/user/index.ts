import { axios, withAxiosHandler } from '@/lib/axios';
import { userFilters } from '@/mock/users';
import { ProfileResponse } from '../auth/type';
import {
  GetUserDetailResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpsertUserRequest,
} from './type';

export const userService = {
  profile: withAxiosHandler((token?: string | void) => {
    return axios.get<ProfileResponse>('/users/profile ', {
      headers: token
        ? {
            Authorization: 'Bearer ' + token,
          }
        : {},
    });
  }),

  getUsers: withAxiosHandler((params: GetUsersRequest) =>
    axios.get<GetUsersResponse>('/user', { params }),
  ),

  getUserDetail: withAxiosHandler((id: number) =>
    axios.get<GetUserDetailResponse>(`/user/${id}`),
  ),

  upsertUser: withAxiosHandler(({ id, ...payload }: UpsertUserRequest) =>
    id
      ? axios.patch('/user/update', { id, ...payload })
      : axios.post(`/user/create`, payload),
  ),

  deleteUsers: withAxiosHandler((ids: number[]) =>
    axios.delete('/user', { params: { ids } }),
  ),

  getUserFilter: () => userFilters,
};
