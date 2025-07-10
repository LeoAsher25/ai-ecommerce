import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticPageController } from './static-page.controller';
import { StaticPageService } from './static-page.service';
import { StaticPage, StaticPageSchema } from './static-page.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: StaticPage.name, schema: StaticPageSchema }])],
  controllers: [StaticPageController],
  providers: [StaticPageService],
  exports: [StaticPageService],
})
export class StaticPageModule {}
