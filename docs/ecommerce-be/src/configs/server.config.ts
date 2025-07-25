import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as fs from 'fs';
import path = require('path');
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@/common/filter/http-exception.filter';

export default function (app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    prefix: 'api/v',
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(json({ limit: '8mb' }));

  // check whether `uploads` folder (folder to store images uploaded) exists?
  const uploadFolders = global.SYSTEM_ENV.IMAGE_UPLOAD_DIR;
  const checkedPath = path.join(__dirname, `../../${uploadFolders}`);
  if (!fs.existsSync(checkedPath)) {
    fs.mkdirSync(`${checkedPath}/images`, { recursive: true });
  }

  if (global.SYSTEM_ENV.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nestjs Boilerplate')
      .setDescription('APIs documents')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
