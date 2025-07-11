import { APIResponse } from '@/types';

export enum TIME_FILTER {
  WEEK = '1_week',
  MONTH = '1_month',
  THREE_MONTH = '3_months',
  SIX_MONTH = '6_months',
  YEAR = '1_year',
}

export type GetDashboardRequest = {
  filter?: TIME_FILTER;
};
export type GetDashboardResponse = APIResponse<{
  user: {
    total: number;
    change: number;
  };
  review: {
    total: number;
    change: number;
  };
  cosmetic: {
    total: number;
    change: number;
  };
  request: {
    review: number;
    cosmetic: number;
  };
  cosmeticByCategories: Array<{
    label: string;
    color: string;
    data: number;
  }>;
  reviewDataset: Array<{
    date: Date;
    data: number;
  }>;
}>;
