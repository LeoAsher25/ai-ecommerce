import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductFeedbackModule } from './modules/product-feedback/product-feedback.module';
import { OrderModule } from './modules/order/order.module';
import { DatabaseModule } from './configs/database/database.module';
import { ImageModule } from './modules/image/image.module';
import { StaticPageModule } from './modules/static-page/static-page.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    FileModule,
    AuthModule,
    UserModule,
    ImageModule,
    UserModule,
    ProductModule,
    ProductCategoryModule,
    ProductFeedbackModule,
    OrderModule,
    StaticPageModule,
  ],
})
export class AppModule {}
