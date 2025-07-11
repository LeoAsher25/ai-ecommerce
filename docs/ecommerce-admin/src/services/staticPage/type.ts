import { APIListResponse, APIResponse, IRequestQuery } from '@/types';

export interface StaticPage {
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  metadata?: Record<string, any>;
  isActive: boolean;
  lastUpdatedAt?: Date;
}

export interface GetStaticPagesRequest extends IRequestQuery {
  category?: string;
  activeOnly?: boolean;
}

export type GetStaticPagesResponse = APIListResponse<StaticPage>;
export type GetStaticPageResponse = APIResponse<StaticPage>;

export interface UpsertStaticPageRequest {
  slug?: string;
  title?: string;
  content?: string;
  metaDescription?: string;
  metadata?: Record<string, any>;
  isActive?: boolean;
}
