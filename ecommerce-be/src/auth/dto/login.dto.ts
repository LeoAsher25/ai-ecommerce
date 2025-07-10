import { STRONG_PASSWORD } from '@/common/constants/app.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'superadmin@gmail.com',
  })
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'Superadmin@123',
  })
  @IsStrongPassword(STRONG_PASSWORD.config, {
    message: STRONG_PASSWORD.message,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  // @ApiProperty({
  //   description: 'type',
  //   example: 'cms',
  // })
  // @IsIn(['cms', 'client'])
  // @Transform(({ value }) => value?.trim())
  // @IsOptional()
  // type: 'cms' | 'client' = 'client';
}
