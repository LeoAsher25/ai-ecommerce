import { QueryDto } from '@/common/dto/query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EOrderStatus } from '../order.interface';

export class OrderQueryDto extends QueryDto {
  @ApiProperty({ required: true, example: 0 })
  @IsOptional()
  orderStatus?: EOrderStatus;
}
