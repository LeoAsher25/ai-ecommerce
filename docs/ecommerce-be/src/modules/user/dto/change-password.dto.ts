import { STRONG_PASSWORD } from '@/common/constants/app.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: '123qweA@',
  })
  @IsStrongPassword(STRONG_PASSWORD.config, {
    message: STRONG_PASSWORD.message,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: '123qweA@',
  })
  @IsStrongPassword(STRONG_PASSWORD.config, {
    message: STRONG_PASSWORD.message,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;
}
