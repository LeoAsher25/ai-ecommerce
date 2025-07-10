import { APIListResponse, APIResponse, IRequestQuery } from '@/types';
import { IProduct } from '@/types/product';

export interface GetProductsRequest extends IRequestQuery {
  categories?: string;
  priceRange?: string;
  sort?: string;
  ratings?: string;
}

export type GetProductsResponse = APIListResponse<IProduct>;
export type GetProductDetailResponse = APIResponse<IProduct>;

export type UpsertProductRequest = Partial<
  Pick<
    IProduct,
    | 'name'
    | 'description'
    | 'images'
    | 'importPrice'
    | 'sellingPrice'
    | 'originalPrice'
    | 'categories'
    | 'slug'
  >
> & {
  id?: string;
};
