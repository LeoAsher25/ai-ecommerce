import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Token to verify',
    example: 'xxxxxx',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
