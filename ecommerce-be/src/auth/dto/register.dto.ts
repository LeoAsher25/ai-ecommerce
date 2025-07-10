import { STRONG_PASSWORD } from '@/common/constants/app.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'First name',
    example: 'First',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Last',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+84912345678',
  })
  @IsPhoneNumber(null, {
    message: 'Invalid phone number',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Phone Number is required' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '01-01-2000',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Date of birth is required' })
  dob: Date;

  @ApiProperty({
    description: 'Password',
    example: '123qweA@',
  })
  @IsStrongPassword(STRONG_PASSWORD.config, {
    message: STRONG_PASSWORD.message,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
