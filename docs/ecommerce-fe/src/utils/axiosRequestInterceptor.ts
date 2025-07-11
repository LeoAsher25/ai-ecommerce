'use server'

import { InternalAxiosRequestConfig } from 'axios'
import { cookies, headers } from 'next/headers'
import { getToken } from 'next-auth/jwt'

export const axiosRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const jwt = await getToken({
    req: {
      headers: Object.fromEntries(await headers()),
      cookies: Object.fromEntries((await cookies()).getAll().map((c) => [c.name, c.value])),
    } as any,
  })

  if (jwt?.accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${jwt.accessToken}`
  }

  return config
}
