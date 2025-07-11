import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({
    required: true,
    example: 'Cat',
  })
  @IsNotEmpty({ message: 'Product category name is required' })
  name: string;

  @ApiProperty({
    required: false,
    example: '640f3c4d2e2d4d1c8c1a1b1c',
  })
  @IsOptional()
  parentId: string;
}
