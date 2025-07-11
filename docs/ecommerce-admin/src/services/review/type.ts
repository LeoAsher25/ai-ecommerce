import {
  APIListResponse,
  APIResponse,
  Review,
  SORT_ORDER,
  STATUS,
} from '@/types';

export type GetReviewsRequest = {
  page?: number;
  limit?: number;
  search?: string;
  userId?: number;
  sortByCreatedAt?: SORT_ORDER;
  sortByRating?: SORT_ORDER;
  show?: boolean;
  ratings?: number[];
  statuses?: STATUS[];
  categories?: number[];
  isApproved?: boolean;
};

export type GetReviewsResponse = APIListResponse<Review>;

export type GetReviewDetailResponse = APIResponse<Review>;

export type UpsertReviewRequest = Partial<Review>;

export type UpsertReviewsRequest = {
  ids: number[];
  show?: boolean;
  isApproved?: boolean;
};
