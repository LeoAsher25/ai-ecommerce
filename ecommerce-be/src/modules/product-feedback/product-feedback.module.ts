import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductFeedback, ProductFeedbackSchema } from './entities/product-feedback.entity';
import { ProductFeedbackController } from './product-feedback.controller';
import { ProductFeedbackService } from './product-feedback.service';
import { RoleGuard } from '@/common/guards/role.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductFeedback.name, schema: ProductFeedbackSchema }])],
  controllers: [ProductFeedbackController],
  providers: [ProductFeedbackService, RoleGuard],
  exports: [ProductFeedbackService],
})
export class ProductFeedbackModule {}
