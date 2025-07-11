import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './create-product-category.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EProductCategoryStatus } from '../entities/product-category.entity';

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {
  @ApiProperty({
    required: false,
    example: EProductCategoryStatus.INACTIVE,
  })
  @IsOptional()
  @IsEnum(EProductCategoryStatus)
  status: EProductCategoryStatus;
}
