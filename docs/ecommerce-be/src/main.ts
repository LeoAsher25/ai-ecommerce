import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import appConfig from './configs/server.config';
import SYSTEM_ENV from './configs/constant.config';

const configService = new ConfigService();
global.SYSTEM_ENV = SYSTEM_ENV;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  appConfig(app);

  // Cấu hình static file serving
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Prefix cho static files
  });
  await app.listen(configService.get<number>('PORT') || 8000);
}

bootstrap();
