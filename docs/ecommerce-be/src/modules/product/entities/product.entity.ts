import { StringUtil } from '@/common/utils/string.util';
import { ProductCategory } from '@/modules/product-category/entities/product-category.entity';
import { ProductStatus } from '@/types/product.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends mongoose.Document {
  @Prop({ unique: true })
  idReadable: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false, unique: true })
  slug: string;

  @Prop({ required: true, type: [String] })
  images: string[];

  // @Prop({ required: true })
  // price: number;

  @Prop({ required: false })
  originalPrice: number;

  @Prop({ required: false })
  sellingPrice: number;

  // @Prop({ required: false })
  // discountedPrice: number;

  // @Prop({ required: false })
  // discountPrice: number;

  @Prop({ required: false, default: 1 })
  stock: number;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'ProductCategory',
    required: true,
    default: [],
  })
  categoryIds: ProductCategory[]; // array of category IDs

  @Prop({
    required: false,
    default: ProductStatus.DRAFT,
    enum: ProductStatus,
  })
  status: ProductStatus;
}

const ProductSchema = SchemaFactory.createForClass(Product);

// Pre-save middleware to generate slug
ProductSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.idReadable = await StringUtil.generateUniqueIdReadable(this.constructor as mongoose.Model<Product>);
  }

  if (this.isModified('name')) {
    this.slug = await StringUtil.generateUniqueSlug(this.name, this.constructor as mongoose.Model<Product>);
  }
  next();
});

export { ProductSchema };
