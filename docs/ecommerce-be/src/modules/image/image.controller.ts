import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileResponse } from './image.interface';
import { ImageService } from './image.service';
import { ApiImage } from '@/common/decorators/api-image.decorator';

@ApiBearerAuth()
@Controller('images')
@ApiTags('Images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @ApiImage()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Query('type') type: 'product' | 'avatar' | 'banner' = 'product',
  ): Promise<FileResponse> {
    return this.imageService.uploadFile(file, type);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Maximum 10 files
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<FileResponse[]> {
    return this.imageService.uploadMultipleFiles(files);
  }
}
