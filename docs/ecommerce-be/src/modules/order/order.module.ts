import { EmailerService } from '@/common/services/emailer.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductFeedbackModule } from '../product-feedback/product-feedback.module';
import { ProductModule } from '../product/product.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RoleGuard } from '@/common/guards/role.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
    ProductFeedbackModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, EmailerService, RoleGuard],
  exports: [OrderService],
})
export class OrderModule {}
