import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ProductCategory, ProductCategorySchema } from './entities/product-category.entity';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { RoleGuard } from '@/common/guards/role.guard';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    forwardRef(() => ProductModule),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, RoleGuard],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
