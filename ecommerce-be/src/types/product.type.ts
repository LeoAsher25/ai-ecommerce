import { ProductCategory } from '@/modules/product-category/entities/product-category.entity';
import { ProductFeedback } from '@/modules/product-feedback/entities/product-feedback.entity';
import { Product } from '@/modules/product/entities/product.entity';

export interface IProductItem extends Omit<Product, 'categoryIds'> {
  categories: ProductCategory[]; // response sẽ có categories thay vì categoryIds
  rating: number;
  totalRating: number;
}

export interface IProductDetail extends IProductItem {
  feedbacks: ProductFeedback[];
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
