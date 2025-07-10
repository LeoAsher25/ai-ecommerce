import { APIListResponse, APIResponse, SORT_ORDER } from '@/types';
import { User } from '@/types/entities';

export type GetUsersRequest = {
  sortByCreatedAt?: SORT_ORDER;
  sortByTotalReview?: SORT_ORDER;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
};
export type GetUsersResponse = APIListResponse<
  User & {
    totalReview: number;
  }
>;
export type GetUserDetailResponse = APIResponse<User>;

export type UpsertUserRequest = Partial<User & { password?: string }>;

export type UpsertUserResponse = APIResponse<string[]>;
