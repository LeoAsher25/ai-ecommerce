import { APIResponse, ServiceResponse } from '@/types';
import { isClient } from '@/utils';
import { axiosRequestInterceptor } from '@/utils/axios';
import baseAxios, { AxiosError, AxiosResponse } from 'axios';

export function withAxiosHandler<T, P = void>(
  func: (p: P) => Promise<AxiosResponse<APIResponse<T>>>,
): (params: P) => Promise<ServiceResponse<T>> {
  return async (params: P) => {
    try {
      const resp = await func(params);
      return {
        success: true,
        message: 'Thành công',
        data: resp.data,
        status: resp.status,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log({ e });
      return {
        success: false,
        message: e.response?.data.message || e.message,
        data: e?.response?.data?.data || {},
        status: e?.response?.status,
      };
    }
  };
}

export const axios = baseAxios.create({
  baseURL: isClient() ? '/api/proxy' : process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

if (!isClient()) {
  axios.interceptors.request.use(async (config) => {
    return axiosRequestInterceptor(config);
  });
}

axios.interceptors.response.use(
  (response) => {
    recursivelyHydrateDates(response.data);
    return response;
  },
  (err: AxiosError | Error) => {
    if (isClient() && baseAxios.isAxiosError(err)) {
      if (
        err.response?.status === 401 &&
        !window.location.pathname.startsWith('/login')
      ) {
        window.location.href = '/login';
      }
    }
    throw err;
  },
);

const dateRegexp =
  /^(?:\d{4})[-/](?:\d{2})[-/](?:\d{2})(T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?))?$/;

const isDateString = (value: unknown) =>
  value && typeof value === 'string' && dateRegexp.test(value);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recursivelyHydrateDates(data: any) {
  if (data === null || data === undefined || typeof data !== 'object')
    return data;

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (isDateString(value)) data[key] = new Date(value);
    else if (typeof value === 'object')
      data[key] = recursivelyHydrateDates(value);
  }
  return data;
}
