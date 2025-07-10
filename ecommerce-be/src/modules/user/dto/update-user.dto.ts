import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { AccountType, UserStatus } from '../user.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'first name',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'last name',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'refresh token',
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({
    description: 'phone',
  })
  @IsOptional()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(15)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Account Type: DEFAULT, GOOGLE, FACEBOOK...',
  })
  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType = AccountType.DEFAULT;

  @ApiPropertyOptional({
    description: 'User Status: VERIFIED, UNVERIFIED, DELETED',
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus = UserStatus.UNVERIFIED;
}

export class ChangeUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
