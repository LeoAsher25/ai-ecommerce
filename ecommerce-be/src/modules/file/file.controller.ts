import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleGuard } from '@/common/guards/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRole } from '../user/user.constant';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadMultipleFilesDto } from './dto/upload-multiple-files.dto';
import { FileService } from './file.service';
import { FileResponse, FileType } from './interfaces/file.interface';
import { Public } from '@/common/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
@UseGuards(JwtAccessTokenGuard, RoleGuard)
@Roles(UserRole.ADMIN)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }), // 20MB max
        ],
      }),
    )
    file: Express.Multer.File,
    @Query() uploadFileDto: UploadFileDto,
  ): Promise<FileResponse> {
    const { type = FileType.PRODUCT, isPublic = true } = uploadFileDto;
    return this.fileService.uploadFile(file, { type, isPublic });
  }

  @Post('upload-multiple')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10)) // Maximum 10 files
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }), // 20MB max
        ],
      }),
    )
    files: Express.Multer.File[],
    @Query() uploadMultipleFilesDto: UploadMultipleFilesDto,
  ): Promise<FileResponse[]> {
    const { type = FileType.PRODUCT, isPublic = true } = uploadMultipleFilesDto;
    return this.fileService.uploadMultipleFiles(files, { type, isPublic });
  }

  @Public()
  @Get(':key(*)')
  async serveFile(@Param('key') key: string, @Res() res: Response) {
    try {
      const stream = await this.fileService.getFileStream(key);
      // Detect content type based on file extension
      const contentType = this.getContentType(key);
      // Set appropriate headers
      res.set({
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      });
      return (stream as unknown as NodeJS.ReadableStream).pipe(res);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  private getContentType(filename: string): string {
    const ext = filename.toLowerCase().split('.').pop();
    const contentTypes = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      webp: 'image/webp',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // Add more content types as needed
      default: 'application/octet-stream',
    };

    return contentTypes[ext] || contentTypes.default;
  }

  @Delete(':key(*)')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 204, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteFile(@Param('key') key: string): Promise<void> {
    await this.fileService.deleteFile(key);
  }

  @Delete()
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete multiple files' })
  @ApiResponse({ status: 204, description: 'Files deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteMultipleFiles(@Body() deleteFilesDto: DeleteFilesDto): Promise<void> {
    await this.fileService.deleteMultipleFiles(deleteFilesDto.keys);
  }
}
