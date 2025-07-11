import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: global.SYSTEM_ENV.MONGO_URI,
        connectTimeoutMS: 10000,
        user: global.SYSTEM_ENV.MONGO_USER,
        pass: global.SYSTEM_ENV.MONGO_PASS,
        dbName: 'shop',
      }),
    }),
  ],
})
export class DatabaseModule {}
