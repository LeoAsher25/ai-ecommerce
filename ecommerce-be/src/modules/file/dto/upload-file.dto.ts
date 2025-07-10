import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { FileType } from '../interfaces/file.interface';

export class UploadFileDto {
  @ApiProperty({
    enum: FileType,
    default: FileType.PRODUCT,
    description: 'Type of file',
  })
  @IsEnum(FileType)
  @IsOptional()
  type?: FileType;

  @ApiProperty({
    default: true,
    description: 'Whether the file should be publicly accessible',
  })
  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  @IsOptional()
  isPublic?: boolean;
}
