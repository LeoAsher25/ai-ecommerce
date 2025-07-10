import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import mongoose from 'mongoose';

@Injectable()
export class StringUtil {
  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static genRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  public static mysqlRealEscapeString(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%\_]/g, function (char) {
      switch (char) {
        case '\0':
          return '\\0';
        case '\x08':
          return '\\b';
        case '\x09':
          return '\\t';
        case '\x1a':
          return '\\z';
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '_':
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
      }
    });
  }

  // Function to generate a unique slug
  public static async generateUniqueSlug(name: string, model: mongoose.Model<any>): Promise<string> {
    let slug = convertToSlug(name);
    let slugExists = await model.exists({ slug });
    let counter = 1;

    while (slugExists) {
      slug = `${slug}-${counter}`;
      slugExists = await model.exists({ slug });
      counter++;
    }

    return slug;
  }

  // Function to generate a random string of uppercase letters and numbers
  public static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Function to generate a unique idReadable
  public static async generateUniqueIdReadable(model: mongoose.Model<any>): Promise<string> {
    const length = Math.floor(Math.random() * 3) + 6; // Random length between 6 and 8
    let idReadable = this.generateRandomString(length);
    let idExists = await model.exists({ idReadable });

    while (idExists) {
      idReadable = this.generateRandomString(length);
      idExists = await model.exists({ idReadable });
    }

    return idReadable;
  }
}

export function convertToSlug(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, '');

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, '');

  // return
  return str;
}
