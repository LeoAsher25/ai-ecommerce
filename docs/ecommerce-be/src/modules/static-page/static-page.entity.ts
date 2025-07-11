import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaticPageDocument = StaticPage & Document;

@Schema({ timestamps: true })
export class StaticPage {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  metaDescription: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  lastUpdatedAt: Date;
}

export const StaticPageSchema = SchemaFactory.createForClass(StaticPage);
