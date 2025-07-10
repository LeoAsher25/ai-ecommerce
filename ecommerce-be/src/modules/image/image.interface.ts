export interface ImageMetadata {
  width: number;
  height: number;
  type: 'product' | 'avatar' | 'banner';
}

export interface FileResponse {
  path: string;
  cdnUrl?: string;
  mimetype: string;
  originalname: string;
  size: number;
  metadata?: ImageMetadata;
}

export interface ImageUploadOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
  generateThumbnail?: boolean;
}
