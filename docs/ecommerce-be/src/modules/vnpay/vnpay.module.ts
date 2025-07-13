import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VNPayController } from './vnpay.controller';
import { VNPayService } from './vnpay.service';

@Module({
  imports: [ConfigModule],
  controllers: [VNPayController],
  providers: [VNPayService],
  exports: [VNPayService],
})
export class VNPayModule {}
