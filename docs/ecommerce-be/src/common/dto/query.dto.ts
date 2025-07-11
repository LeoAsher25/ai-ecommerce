import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryDto {
  @ApiProperty({ required: false, example: '' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @ApiProperty({ required: false, example: 1 })
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: string;

  @ApiProperty({ required: false, example: 10 })
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageSize?: string;

  @ApiProperty({ required: false, example: false })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  isAdmin?: boolean;
}
