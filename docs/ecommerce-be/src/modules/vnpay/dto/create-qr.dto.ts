import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQRDto {
  @ApiProperty({ example: 100000, description: 'Amount in VND' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'Thanh toán đơn hàng 1234567890', description: 'Order information' })
  @IsString()
  @IsNotEmpty()
  orderInfo: string;

  @ApiProperty({ example: 'https://yourapp.com/checkout/return', description: 'Return URL after payment' })
  @IsString()
  @IsNotEmpty()
  returnUrl: string;

  @ApiProperty({ example: '127.0.0.1', description: 'Client IP address' })
  @IsString()
  @IsNotEmpty()
  ipAddr: string;

  @ApiProperty({ example: 'billpayment', description: 'Order type', required: false })
  @IsString()
  @IsOptional()
  orderType?: string;

  @ApiProperty({ example: 'NCB', description: 'Bank code', required: false })
  @IsString()
  @IsOptional()
  bankCode?: string;

  @ApiProperty({ example: 'vn', description: 'Locale', required: false })
  @IsString()
  @IsOptional()
  locale?: string;
}
