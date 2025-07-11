export type APIResponse<T> = T;
export type APIListResponse<T> = {
  data: T[];
  message?: string;
  responseInfo?: {
    totalItems?: number;
    page?: number;
    pageSize?: number;
    totalPage?: number;
    error?: Error | string | null;
  };
};

interface ServiceSuccessResponse<T> {
  success: true;
  message: string;
  status: number;
  data: T;
}
interface ServiceFailedResponse {
  success: false;
  message: string;
  status: number;
  data: {
    errors: Record<string, string[]>;
  };
}

export type ServiceResponse<T> =
  | ServiceSuccessResponse<T>
  | ServiceFailedResponse;

export type APIErrorResponse = ServiceFailedResponse['data'];

export interface IRequestQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}
