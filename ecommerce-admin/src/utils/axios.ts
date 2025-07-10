'use server';

import { InternalAxiosRequestConfig } from 'axios';
import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';

export const axiosRequestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const jwt = await getToken({
    req: {
      headers: Object.fromEntries(await headers()),
      cookies: Object.fromEntries(
        (await cookies()).getAll().map((c) => [c.name, c.value]),
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });

  if (jwt?.accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${jwt.accessToken}`;
  }

  return config;
};
