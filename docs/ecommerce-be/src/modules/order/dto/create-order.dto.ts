import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import mongoose from 'mongoose';
import { EPaymentMethod } from '../order.interface';

export class CreateOrderDto {
  @ApiProperty({ required: true, example: 'Nguyễn Văn A' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({
    required: true,
    example: 'số nhà 1, ngõ 2, phố XXX, quận YYY, tỉnh ZZZ',
  })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({ required: true, example: '0312345678' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @ApiProperty({ example: 'Gói hàng vào hộp quà đẹp' })
  @IsString()
  note: string;

  @ApiProperty({ example: EPaymentMethod.COD })
  @IsEnum(EPaymentMethod)
  paymentMethod: EPaymentMethod;

  @ApiProperty({ example: '652f8a5d13ea72798f638923' })
  @IsMongoId()
  @IsOptional()
  customerId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: [
      {
        productId: '652f8a5d13ea72798f638923',
        name: 'Chú mèo Amuse Cat may mắn',
        image: 'images/products/p1.jpg',
        price: 320000,
        quantity: 1,
      },
    ],
  })
  @IsArray()
  orderItems: OrderProductDto[];
}

export class OrderProductDto {
  @IsNotEmpty({ message: 'Product ID is required' })
  @IsMongoId()
  productId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsNotEmpty({ message: 'Product Image is required' })
  image: string;

  @IsNotEmpty({ message: 'Product price is required' })
  price: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}
