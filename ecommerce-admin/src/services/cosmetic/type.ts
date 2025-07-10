import {
  APIListResponse,
  APIResponse,
  Cosmetic,
  SORT_ORDER,
  STATUS,
} from '@/types';

export type GetCosmeticsRequest = {
  page?: number;
  limit?: number;
  search?: string;
  statuses?: string[];
  searchType?: 'name' | 'address';
  categories?: number[];
  sortByCreatedAt?: SORT_ORDER;
  sortByRating?: SORT_ORDER;
  sortByPendingReview?: SORT_ORDER;
};

export type GetCosmeticsResponse = APIListResponse<Cosmetic>;
export type GetCosmeticDetailResponse = APIResponse<Cosmetic>;

export type GetTopCosmeticRequest = {
  sortByRating?: SORT_ORDER;
  sortByRanking?: SORT_ORDER;
  categoryId?: number;
  search?: string;
};

export type GetTopCosmeticResponse = APIResponse<Cosmetic[]>;

export type UpsertCosmeticRequest = Partial<
  Pick<
    Cosmetic,
    | 'name'
    | 'address'
    | 'description'
    | 'logo'
    | 'code'
    | 'linkWebsite'
    | 'linkFacebook'
    | 'status'
    | 'ranking'
  >
> & {
  id?: number;
  categoryId?: number;
};

export type UpsertTopCosmeticRankingRequest = {
  cosmetics: { id: number; ranking: number }[];
};

export type UpsertCosmeticsStatus = {
  cosmetics: {
    id: number;
    status: STATUS;
    code?: string;
  }[];
};
