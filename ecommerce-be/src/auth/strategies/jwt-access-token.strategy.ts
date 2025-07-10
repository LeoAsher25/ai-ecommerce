import MessageWithCodeConstants from '@/common/constants/message.constants';
import { accessTokenPublicKey } from '@/common/constants/token.contant';
import { User } from '@/modules/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenPublicKey,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.userService.findOne({
        _id: payload.id,
        refreshToken: {
          $ne: null,
        },
      });

      if (!user) {
        throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_INVALID);
      }

      await this.userService.checkEmailVerified(user);

      return user;
    } catch (error) {
      throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_INVALID);
    }
  }
}
