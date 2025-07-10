import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendRegistrationDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
