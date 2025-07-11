import { QueryDto } from '@/common/dto/query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryProductDto extends QueryDto {
  @ApiProperty({
    required: false,
    description: 'Categories slug joined with `,`',
    example: '1,2,3',
  })
  @IsString()
  @IsOptional()
  categories: string; // multiple slug joined with `,`

  @ApiProperty({
    required: false,
    description: 'Price range',
    example: '100000,200000',
  })
  @IsString()
  @IsOptional()
  priceRange: string; // min,max joined with `,`

  @ApiProperty({
    required: false,
    description: 'Sort by fields, including rating',
    example: 'price:asc,name:desc,rating:asc',
  })
  @IsString()
  @IsOptional()
  sort: string; // field:asc,field:desc joined with `,`

  @ApiProperty({
    required: false,
    description: 'List of ratings to filter by',
    example: '1,2,3',
  })
  @IsString()
  @IsOptional()
  ratings: string; // multiple ratings joined with `,`
}
