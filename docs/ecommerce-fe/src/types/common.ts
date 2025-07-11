import { ReactNode } from 'react'

export interface ITokenReponse {
  accessToken?: string
  expiresIn?: number
  refreshToken?: string
  refreshExpiresIn?: number
}

export interface IErrorResponse {
  code?: string
  message: string
  statusCode: number
}

export interface IQueryParams {
  /** Default: 0 */
  page?: number
  /** Default: 10 */
  pageSize?: number
  /** Search keyword */
  search?: string
}

export type ChildrenType = {
  children: ReactNode
}
