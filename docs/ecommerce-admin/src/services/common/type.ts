import { APIListResponse, APIResponse, Category } from '@/types';

export type GetCategoriesRequest = {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'BASE' | 'TAG';
};
export type GetCategoriesResponse = APIListResponse<Category>;
export type GetCategoryDetailResponse = APIResponse<Category>;

export type UpsertCategoryRequest = Partial<Category>;
export type UpsertResponse = APIResponse<string[]>;
