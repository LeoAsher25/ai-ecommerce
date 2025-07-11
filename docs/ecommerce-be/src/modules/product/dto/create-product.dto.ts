import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true, example: 'Sản phẩm thứ nhất' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ required: true, example: ['/images/product/1.jpg', '/images/product/2.jpg'] })
  @IsNotEmpty({ message: 'Images is required' })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ required: true, example: 'Mô tả cho sản phẩm thứ nhất' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ required: true, example: ['0'] })
  @IsNotEmpty({ message: 'Uses type is required' })
  categoryIds: string[];

  @ApiProperty({ required: false, example: 100000 })
  @IsNotEmpty({ message: 'Selling price is required' })
  sellingPrice: number;

  @ApiProperty({ required: false, example: 100000 })
  @IsNotEmpty({ message: 'Original price is required' })
  originalPrice: number;

  @ApiProperty({ required: false, example: 100 })
  @IsNotEmpty({ message: 'Stock is required' })
  @IsOptional()
  stock: number;
}
