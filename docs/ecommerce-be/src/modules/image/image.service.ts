import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileResponse } from './image.interface';
import Sharp from 'sharp';

@Injectable()
export class ImageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
  }

  private generateKey(file: Express.Multer.File, type: 'product' | 'avatar' | 'banner' = 'product'): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const sanitizedName = file.originalname.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const extension = sanitizedName.split('.').pop();

    // Tổ chức theo năm/tháng để dễ quản lý
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${type}/${year}/${month}/${timestamp}-${randomString}.${extension}`;
  }

  private async optimizeImage(
    file: Express.Multer.File,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'jpeg' | 'webp' | 'png';
    } = {},
  ): Promise<Buffer> {
    const {
      width = 1200, // Max width
      height = 1200, // Max height
      quality = 80, // Good balance between quality and size
      format = 'webp', // Modern format with good compression
    } = options;

    let sharpInstance = Sharp(file.buffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .rotate(); // Auto-rotate based on EXIF data

    if (format === 'webp') {
      sharpInstance = sharpInstance.webp({ quality });
    } else if (format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality });
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png({ quality });
    }

    return sharpInstance.toBuffer();
  }

  async uploadFile(
    file: Express.Multer.File,
    type: 'product' | 'avatar' | 'banner' = 'product',
  ): Promise<FileResponse> {
    try {
      // Optimize image based on type
      const optimizationOptions = {
        product: { width: 1200, height: 1200, quality: 80, format: 'webp' },
        avatar: { width: 400, height: 400, quality: 85, format: 'webp' },
        banner: { width: 1920, height: 600, quality: 85, format: 'webp' },
      };

      const optimizedBuffer = await this.optimizeImage(
        file,
        optimizationOptions[type] as {
          width: number;
          height: number;
          quality: number;
          format: 'jpeg' | 'webp' | 'png';
        },
      );
      const key = this.generateKey(file, type);

      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: optimizedBuffer,
          ContentType: 'image/webp',
          ACL: 'public-read',
          CacheControl: 'public, max-age=31536000', // Cache 1 year
          Metadata: {
            'original-name': file.originalname,
            'upload-date': new Date().toISOString(),
            'file-type': type,
          },
        },
      });

      const result = await upload.done();

      return {
        path: result.Location,
        mimetype: 'image/webp',
        originalname: file.originalname,
        size: optimizedBuffer.length,
        metadata: {
          width: 1200, // Có thể lấy real dimensions từ Sharp
          height: 1200,
          type,
        },
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[]): Promise<FileResponse[]> {
    const uploadPromises = files.map(file => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }
}
