import baseAxios, { AxiosError, AxiosResponse } from 'axios'

import { store } from '@/redux/store'
import { APIResponse, ServiceResponse } from '@/types/api'

import { axiosRequestInterceptor } from './axiosRequestInterceptor'

import { isClient } from '.'

// use for SSR request
export function axiosHandler<T, P = void>(
  func: (p: P) => Promise<AxiosResponse<APIResponse<T>>>
): (params: P) => Promise<ServiceResponse<T>> {
  return async (params: P) => {
    try {
      const resp = await func(params)
      return {
        success: true,
        status: resp.status,
        message: 'Thành công',
        data: resp.data,
      }
    } catch (e: any) {
      return {
        success: false,
        status: e?.response?.status,
        message: e.response?.data.message || e.message,
        errorCode: e?.response?.data?.errorCode || '',
        data: e?.response?.data?.data || {},
      }
    }
  }
}

export const axiosInstance = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    indexes: null,
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  // trường hợp call ở client thì lấy accessToken từ redux
  if (isClient()) {
    const accessToken = store.getState().userReducer.accessToken

    if (accessToken && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }

    return config
  } else {
    // trường hợp call ở server thì lấy accessToken từ cookies (nếu có)
    return axiosRequestInterceptor(config)
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    recursivelyHydrateDates(response.data)
    return response
  },
  (err: AxiosError | Error) => {
    if (isClient() && baseAxios.isAxiosError(err)) {
      // if (err.response?.status === 401 && !window.location.pathname.startsWith(APP_ROUTES.LOGIN)) {
      //   window.location.href = APP_ROUTES.LOGIN
      // }
    }
    throw err
  }
)

const dateRegexp =
  /^(?:\d{4})[-/](?:\d{2})[-/](?:\d{2})(T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?))?$/

const isDateString = (value: unknown) =>
  value && typeof value === 'string' && dateRegexp.test(value)

export function recursivelyHydrateDates(data: any) {
  if (data === null || data === undefined || typeof data !== 'object') return data

  for (const key of Object.keys(data)) {
    const value = data[key]
    if (isDateString(value)) data[key] = new Date(value)
    else if (typeof value === 'object') data[key] = recursivelyHydrateDates(value)
  }
  return data
}
