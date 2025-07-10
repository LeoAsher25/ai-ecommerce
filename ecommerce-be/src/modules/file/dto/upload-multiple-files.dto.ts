import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { FileType } from '../interfaces/file.interface';

export class UploadMultipleFilesDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Files to upload (max 10 files)',
  })
  files: Express.Multer.File[];

  @ApiProperty({
    enum: FileType,
    default: FileType.PRODUCT,
    description: 'Type of files',
  })
  @IsEnum(FileType)
  @IsOptional()
  type?: FileType;

  @ApiProperty({
    type: Boolean,
    default: true,
    description: 'Whether the files should be publicly accessible',
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
