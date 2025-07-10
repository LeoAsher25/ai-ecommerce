import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import Sharp from 'sharp';
import { FileResponse, FileType, FileUploadOptions } from './interfaces/file.interface';
import { GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { StreamingBlobPayloadOutputTypes } from '@smithy/types';

@Injectable()
export class FileService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cdnUrl?: string;

  private readonly imageConfigs = {
    product: { width: 1200, height: 1200, quality: 80 },
    banner: { width: 1920, height: 600, quality: 85 },
    avatar: { width: 400, height: 400, quality: 85 },
    review: { width: 800, height: 800, quality: 80 },
  };

  private readonly maxSizes = {
    product: 5 * 1024 * 1024, // 5MB
    banner: 10 * 1024 * 1024, // 10MB
    document: 20 * 1024 * 1024, // 20MB
    invoice: 10 * 1024 * 1024, // 10MB
    warranty: 15 * 1024 * 1024, // 15MB
    default: 5 * 1024 * 1024, // 5MB
  };

  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private readonly allowedDocumentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
    // this.cdnUrl = this.configService.get('CDN_URL');
  }

  async uploadFile(file: Express.Multer.File, options: FileUploadOptions): Promise<FileResponse> {
    try {
      const { type, isPublic = true, optimizeImage = true } = options;

      // Validate file
      await this.validateFile(file, type);

      let processedFile: Buffer = file.buffer;
      let contentType = file.mimetype;
      let dimensions: { width?: number; height?: number } = {};

      // Process image if needed
      if (this.isImage(file.mimetype) && optimizeImage) {
        const result = await this.optimizeImage(file, type);
        processedFile = result.buffer;
        contentType = 'image/webp';
        dimensions = result.dimensions;
      }

      const key = this.generateKey(file, type);

      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: processedFile,
          ContentType: contentType,
          // ACL: isPublic ? 'public-read' : 'private',
          CacheControl: isPublic ? 'public, max-age=31536000' : 'private, no-cache',
          Metadata: {
            'original-name': file.originalname,
            'upload-date': new Date().toISOString(),
            'file-type': type,
          },
        },
      });

      await upload.done();

      return {
        path: key, // Chỉ lưu relative path, ví dụ: "product/2024/01/image.webp"
        // url: this.generateFileUrl(key), // Generate full URL khi cần
        mimetype: contentType,
        originalname: file.originalname,
        size: processedFile.length,
        metadata: {
          type,
          isPublic,
          uploadDate: new Date().toISOString(),
          ...dimensions,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[], options: FileUploadOptions): Promise<FileResponse[]> {
    return Promise.all(files.map(file => this.uploadFile(file, options)));
  }

  private async validateFile(file: Express.Multer.File, type: FileType): Promise<void> {
    // Check file size
    const maxSize = this.maxSizes[type] || this.maxSizes.default;
    if (file.size > maxSize) {
      throw new BadRequestException(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`);
    }

    // Check file type
    const isImage = this.isImage(file.mimetype);
    const isDocument = this.allowedDocumentTypes.includes(file.mimetype);

    if (!isImage && !isDocument) {
      throw new BadRequestException('Invalid file type');
    }

    // Validate specific type requirements
    if (['product', 'banner', 'avatar', 'review'].includes(type) && !isImage) {
      throw new BadRequestException(`Type ${type} requires an image file`);
    }

    if (['document', 'invoice', 'warranty'].includes(type) && !isDocument) {
      throw new BadRequestException(`Type ${type} requires a document file`);
    }
  }

  private async optimizeImage(
    file: Express.Multer.File,
    type: FileType,
  ): Promise<{ buffer: Buffer; dimensions: { width: number; height: number } }> {
    const config = this.imageConfigs[type] || this.imageConfigs.product;

    let sharpInstance = Sharp(file.buffer)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .rotate(); // Auto-rotate based on EXIF data

    sharpInstance = sharpInstance.webp({ quality: config.quality });

    const buffer = await sharpInstance.toBuffer();
    const metadata = await Sharp(buffer).metadata();

    return {
      buffer,
      dimensions: {
        width: metadata.width,
        height: metadata.height,
      },
    };
  }

  private generateKey(file: Express.Multer.File, type: FileType): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const sanitizedName = file.originalname.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const extension = this.isImage(file.mimetype) ? 'webp' : sanitizedName.split('.').pop();

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${type}/${year}-${month}-${timestamp}-${randomString}.${extension}`;
  }

  private isImage(mimetype: string): boolean {
    return this.allowedImageTypes.includes(mimetype);
  }

  private generateFileUrl(key: string): string {
    // Thay vì dùng S3 URL, dùng application URL
    const baseUrl = `${this.configService.get('APP_URL')}/files`;
    return `${baseUrl}/${key}`;
  }

  private generateThumbnailUrl(key: string): string {
    const baseUrl = this.generateFileUrl(key);
    return `${baseUrl}?w=300&h=300&fit=cover`;
  }

  private async generatePresignedUrl(key: string): Promise<string> {
    return getSignedUrl(this.s3Client as any, new GetObjectCommand({ Bucket: this.bucketName, Key: key }), {
      expiresIn: 3600,
    }); // 1 hour
  }

  async deleteFile(key: string): Promise<void> {
    try {
      // Kiểm tra file có tồn tại không
      await this.checkFileExists(key);

      // Xóa file
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete file ${key}: ${error.message}`);
    }
  }

  async deleteMultipleFiles(keys: string[]): Promise<void> {
    try {
      // Xóa nhiều file cùng lúc
      await this.s3Client.send(
        new DeleteObjectsCommand({
          Bucket: this.bucketName,
          Delete: {
            Objects: keys.map(key => ({ Key: key })),
            Quiet: true,
          },
        }),
      );
    } catch (error) {
      throw new Error(`Failed to delete files: ${error.message}`);
    }
  }

  private async checkFileExists(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch (error) {
      if (error.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException(`File ${key} not found`);
      }
      throw error;
    }
  }

  // Helper để extract key từ S3/CDN URL
  private extractKeyFromUrl(url: string): string {
    if (!url) return '';

    // Nếu dùng S3 trực tiếp
    return url.replace(`https://${this.bucketName}.s3.amazonaws.com/`, '');
  }

  async getFileStream(key: string): Promise<StreamingBlobPayloadOutputTypes> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new NotFoundException(`File ${key} not found`);
      }

      return response.Body;
    } catch (error) {
      if (error.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException(`File ${key} not found`);
      }
      throw error;
    }
  }
}
