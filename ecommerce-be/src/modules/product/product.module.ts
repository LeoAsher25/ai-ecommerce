import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductFeedbackModule } from '../product-feedback/product-feedback.module';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCategoryModule } from '@/modules/product-category/product-category.module';
import { RoleGuard } from '@/common/guards/role.guard';
import { FileModule } from '@/modules/file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProductFeedbackModule,
    forwardRef(() => ProductCategoryModule),
    FileModule,
  ],
  providers: [ProductService, RoleGuard],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
