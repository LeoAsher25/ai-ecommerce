import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum ImageType {
  PRODUCT = 'product',
  AVATAR = 'avatar',
  BANNER = 'banner',
}

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  file: Express.Multer.File;

  @ApiProperty({
    enum: ImageType,
    default: ImageType.PRODUCT,
    description: 'Type of image',
  })
  @IsEnum(ImageType)
  @IsOptional()
  type?: ImageType;
}