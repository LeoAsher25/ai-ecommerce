import { APIResponse } from '@/types';

export type UploadTempFileResponse = APIResponse<{
  url: string;
  tempKey: string;
}>;

export type FinalizeTempFileResponse = APIResponse<{
  url: string;
}>;

export type UpdateExistingFileRequest = {
  currentUrl: string;
  newUrl: string;
};

export enum FileType {
  PRODUCT = 'product',
  BANNER = 'banner',
  AVATAR = 'avatar',
  REVIEW = 'review',
  DOCUMENT = 'document',
  INVOICE = 'invoice',
  WARRANTY = 'warranty',
}

export interface FileMetadata {
  width?: number;
  height?: number;
  type: FileType;
  isPublic: boolean;
  uploadDate: string;
}

export interface FileResponse {
  path: string;
  url?: string;
  // cdnUrl?: string;
  mimetype: string;
  originalname: string;
  size: number;
  metadata: FileMetadata;
}

export interface FileUploadOptions {
  type: FileType;
  isPublic?: boolean;
  optimizeImage?: boolean;
  width?: number;
  height?: number;
  quality?: number;
}

export interface DeleteFileResponse {
  success: boolean;
  message: string;
  deletedKeys?: string[];
  failedKeys?: {
    key: string;
    reason: string;
  }[];
}
