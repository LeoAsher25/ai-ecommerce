import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ImageType } from './upload-image.dto';

export class UploadMultipleImagesDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Image files to upload (max 10 files)',
  })
  files: Express.Multer.File[];

  @ApiProperty({
    enum: ImageType,
    default: ImageType.PRODUCT,
    description: 'Type of images',
  })
  @IsEnum(ImageType)
  @IsOptional()
  type?: ImageType;
}
