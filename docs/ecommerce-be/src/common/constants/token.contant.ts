import * as fs from 'fs';
import * as crypto from 'node:crypto';
import * as path from 'node:path';

function createFolderIfNotExist(name: string) {
  const check_path = path.join(__dirname, `../../${name}`);
  !fs.existsSync(check_path) && fs.mkdir(check_path, err => err);
}

export enum TokenTypeKey {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
  VERIFY_TOKEN = 'verify',
}

function getTokenKeyPair(tokenType: TokenTypeKey): Record<string, string> {
  createFolderIfNotExist('secure');
  const token_private_key_path = path.join(__dirname, `../../secure/${tokenType}_token_private.key`);
  const token_public_key_path = path.join(__dirname, `../../secure/${tokenType}_token_public.key`);

  // Kiểm tra xem file khóa đã tồn tại chưa
  const token_private_key_exists = fs.existsSync(token_private_key_path);
  const token_public_key_exists = fs.existsSync(token_public_key_path);

  if (!token_private_key_exists || !token_public_key_exists) {
    // Nếu file khóa không tồn tại, tạo cặp khóa mới
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    // Lưu khóa bí mật và khóa công khai vào file
    fs.writeFileSync(token_private_key_path, privateKey);
    fs.writeFileSync(token_public_key_path, publicKey);
  }

  // Đọc khóa bí mật và khóa công khai từ file
  const token_private_key = fs.readFileSync(token_private_key_path, 'utf-8');
  const token_public_key = fs.readFileSync(token_public_key_path, 'utf-8');
  return {
    [`${tokenType}TokenPrivateKey`]: token_private_key,
    [`${tokenType}TokenPublicKey`]: token_public_key,
  };
}

export const { accessTokenPrivateKey, accessTokenPublicKey } = getTokenKeyPair(TokenTypeKey.ACCESS_TOKEN);

export const { refreshTokenPrivateKey, refreshTokenPublicKey } = getTokenKeyPair(TokenTypeKey.REFRESH_TOKEN);
