import { StringUtil } from '@/common/utils/string.util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum EProductCategoryStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ProductCategory extends mongoose.Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, enum: EProductCategoryStatus })
  status: EProductCategoryStatus;

  @Prop({ required: false, unique: true })
  slug: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductCategory.name,
  })
  parentId: ProductCategory;

  @Prop({
    required: true,
    default: 0,
  })
  order: number;
}
const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);

// Add virtual field for parent
ProductCategorySchema.virtual('parent', {
  ref: ProductCategory.name,
  localField: 'parentId',
  foreignField: '_id',
  justOne: true,
});

// Pre-save middleware to generate slug
ProductCategorySchema.pre('save', async function (next) {
  this.slug = await StringUtil.generateUniqueSlug(this.name, this.constructor as mongoose.Model<ProductCategory>);
  next();
});

export { ProductCategorySchema };
