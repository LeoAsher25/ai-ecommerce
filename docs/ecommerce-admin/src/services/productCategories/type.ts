import { APIListResponse, APIResponse, IRequestQuery } from '@/types';
import {
  EProductCategoryStatus,
  IProductCategory,
} from '@/types/productCategory';

export interface GetProductCategoriesRequest extends IRequestQuery {
  parentId?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type GetProductCategoriesResponse = APIListResponse<IProductCategory>;

export type GetProductCategoryDetailResponse = APIResponse<IProductCategory>;

export interface UpsertProductCategoryRequest {
  id?: string;
  name?: string;
  parentId?: string;
  status?: EProductCategoryStatus;
}
