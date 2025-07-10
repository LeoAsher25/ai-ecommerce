export type APIResponse<T> = T
export type APIListResponse<T> = {
  data: T[]
  message?: string
  responseInfo?: {
    totalItems?: number
    page?: number
    pageSize?: number
    totalPage?: number
    error?: any
  }
}

export interface ServiceSuccessResponse<T> {
  success: true
  status: number
  message: string
  data: T
}
export interface ServiceFailedResponse {
  success: false
  status: number
  message: string
  errorCode: string
  data: {
    errors: Record<string, string[]>
  }
}

export type ServiceResponse<T> = ServiceSuccessResponse<T> | ServiceFailedResponse

export type APIErrorResponse = ServiceFailedResponse['data']
