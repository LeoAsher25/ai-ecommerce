// export type Product = {
//   title: string;
//   reviews: number;
//   price: number;
//   sellingPrice: number;
//   id: number;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };

import { IQueryParams } from './common'
import { IProductCategory } from './productCategory'

export interface IProduct {
  // Removed fields: title, reviews, sellingPrice, imgs
  _id: string
  idReadable?: string
  name: string
  images: string[]

  importPrice: number
  originalPrice: number
  sellingPrice: number

  stock: number
  description: string
  categories: IProductCategory[] // Assuming categories are represented by their IDs
  createdAt: string
  updatedAt: string
  __v: number
  slug: string
  rating: number
  totalRating: number

  // generated by AI
  brand?: string
  tags?: string[]
  isFeatured?: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isPopular?: boolean
  isDiscounted?: boolean
  isStock?: boolean
  isActive?: boolean
  isDeleted?: boolean
}

export enum ProductStatus {
  IN_STOCK = 'Còn hàng',
  OUT_OF_STOCK = 'Hết hàng',
  COMING_SOON = 'Sắp ra mắt',
  DISCONTINUED = 'Ngừng bán',
  LIMITED = 'Gần hết hàng',
}

export interface IProductParams extends IQueryParams {
  /** Example: '1,2,3' */
  categories?: string
  /** Example: '100000,200000' */
  priceRange?: string
  /** Example: 'price:asc,name:desc,rating:asc' */
  sort?: string
  /** Example: '1,2,3' */
  ratings?: string
}
