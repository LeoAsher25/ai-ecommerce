import Sharp from 'sharp';
export class ImageUtils {
  static async getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
    const metadata = await Sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }

  static isValidImageType(mimetype: string): boolean {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(mimetype);
  }

  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
