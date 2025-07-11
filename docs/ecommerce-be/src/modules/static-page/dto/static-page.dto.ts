import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QueryDto } from '@/common/dto/query.dto';

export class CreateStaticPageDto {
  @ApiProperty({ example: 'shipping-information' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Shipping Information' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '<h1>Shipping Information</h1><p>Our shipping terms...</p>' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'Learn about our shipping policies and delivery times' })
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiProperty({ example: { category: 'customer-service', order: 1 } })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateStaticPageDto {
  @ApiProperty({ example: 'Shipping Information' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '<h1>Shipping Information</h1><p>Our shipping terms...</p>' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'Learn about our shipping policies and delivery times' })
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiProperty({ example: { category: 'customer-service', order: 1 } })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class StaticPageQueryDto extends QueryDto {
  @ApiProperty({ required: false, example: 'customer-service' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  activeOnly?: boolean;
}
