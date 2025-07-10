export interface ResponseObject<T = void> {
  data?: T;
  message?: string;
  responseInfo?: {
    totalItems?: number;
    page?: number;
    pageSize?: number;
    totalPage?: number;
    error?: any;
  };
}

export interface IUserPayload {
  id?: number | string;
  sub?: number | string;
  name: string;
  email: string;
  createdBy: string;
  phone: string;
  status?: string | number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin: string;
}
