import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  use(request: any, response: Response, next: NextFunction): void {
    const token: string = <string>request.headers.authorization;
    if (token) {
      const jwtService = new JwtService({
        secret: global.SYSTEM_ENV.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: global.SYSTEM_ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        },
      });
      request.user = jwtService.decode(token.substring(7)) as any;
    }
    next();
  }
}
