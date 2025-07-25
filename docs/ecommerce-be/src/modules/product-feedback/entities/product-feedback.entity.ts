import { Order } from '@/modules/order/entities/order.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class ProductFeedback extends mongoose.Document {
  @Prop({ required: true })
  rating: number;

  @Prop({})
  comment?: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
  })
  product: Product;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Order.name,
  })
  order: Order;
}
export const ProductFeedbackSchema = SchemaFactory.createForClass(ProductFeedback);
