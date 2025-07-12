import MessageWithCodeConstants from '@/common/constants/message.constants';
import { accessTokenPrivateKey, refreshTokenPrivateKey } from '@/common/constants/token.contant';
import BcryptUtils from '@/common/utils/bcrypt-utils';
import CryptoUtils from '@/common/utils/crypto-utils';
import TimeUtils from '@/common/utils/time-utils';
import { VerifyOtpDto } from '@/modules/otp/dto/verify-otp.dto';
import { OtpService } from '@/modules/otp/otp.service';
import { User } from '@/modules/user/entities/user.entity';
import { UserStatus } from '@/modules/user/user.constant';
import { UserService } from '@/modules/user/user.service';
import { ResponseObject } from '@/types';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JwtPayload, TokenResponse } from 'src/auth/auth.interface';
import { EmailerService } from 'src/common/services/emailer.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendRegistrationDto } from './dto/resend-registration.dto';
import { VerifyForgotPasswordDto } from './dto/verify-forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailerService: EmailerService,
    private readonly otpService: OtpService,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async login(user: User): Promise<TokenResponse> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const tokenResponse = this.generateTokenPairWithLifeSpans(payload);
    await this.userService.updateRefreshToken(user.id, tokenResponse.refreshToken);

    return tokenResponse;
  }

  async register(dto: RegisterDto): Promise<ResponseObject> {
    const userExists = await this.userService.findOne({
      email: dto.email,
    });

    if (userExists) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await BcryptUtils.hashData(dto.password);

    const otp = await this.otpService.generateOtp(dto.email);
    const encryptedOtp = CryptoUtils.encryptAES(otp.code);

    await this.emailerService.sendRegistrationVerificationLink(dto, otp, encryptedOtp);

    await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      message: 'Send verify email successfully',
    };
  }

  async resendRegistration(dto: ResendRegistrationDto): Promise<ResponseObject<boolean>> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_IS_NOT_REGISTERED);
    }

    if (user.status !== UserStatus.UNVERIFIED) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_ALREADY_VERIFIED);
    }

    const otp = await this.otpService.generateOtp(dto.email);

    const encryptedOtp = CryptoUtils.encryptAES(otp.code);

    await this.emailerService.sendRegistrationVerificationLink(user, otp, encryptedOtp);

    return {
      message: 'Send verify email successfully',
    };
  }

  async verifyRegistrationToken({ token }: VerifyOtpDto): Promise<ResponseObject<User>> {
    const decryptedOtp = CryptoUtils.decryptAES(token);
    const verifiedOtp = await this.otpService.verifyOtp(decryptedOtp);

    const user = await this.userService.findOne({
      email: verifiedOtp.email,
      status: UserStatus.UNVERIFIED,
    });

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.TOKEN_INVALID);
    }

    user.status = UserStatus.VERIFIED;
    await user.save();

    verifiedOtp.isUsed = true;
    await verifiedOtp.save();

    return { data: user };
  }

  async verifyForgotPassword({
    token,
    ...changePasswordDto
  }: VerifyForgotPasswordDto): Promise<ResponseObject<boolean>> {
    const decryptedOtp = CryptoUtils.decryptAES(token);
    const otp = await this.otpService.verifyOtp(decryptedOtp);
    const user = await this.userService.findOne({
      email: otp.email,
    });

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_IS_NOT_FOUND);
    }

    await this.userService.updatePassword(user, changePasswordDto.newPassword);
    await this.otpService.deactivateOtp(otp);

    return { data: true };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<ResponseObject<string>> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_IS_NOT_REGISTERED);
    }

    const otp = await this.otpService.generateOtp(dto.email);

    const encryptedOtp = CryptoUtils.encryptAES(otp.code);

    await this.emailerService.sendPasswordResettingVerificationLink(
      `${user.lastName} ${user.firstName}`,
      dto,
      encryptedOtp,
    );

    return { message: 'Send mail successfully' };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<TokenResponse> {
    const user = this.verifyToken(dto.refreshToken, refreshTokenPrivateKey);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const tokenResponse = this.generateTokenPairWithLifeSpans(payload);
    await this.userService.updateRefreshToken(user.id, tokenResponse.refreshToken);

    return tokenResponse;
  }

  async logout(email: string): Promise<ResponseObject> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_IS_NOT_REGISTERED);
    }

    await this.userService.update(
      { email: email },
      {
        refreshToken: null,
      },
    );

    return {
      message: 'Logout successfully',
    };
  }

  verifyToken(token: string, privateKey: string): JwtPayload {
    // return token decoded
    try {
      const tokenDecoded = this.jwtService.verify(token, {
        secret: privateKey,
      });

      if (!tokenDecoded) {
        throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_INVALID);
      }

      return tokenDecoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_EXPIRED);
      } else {
        throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_INVALID);
      }
    }
  }

  generateTokenPairWithLifeSpans(jwtPayload: JwtPayload): TokenResponse {
    const accessToken = this.jwtService.sign(jwtPayload, {
      algorithm: 'RS256',
      secret: accessTokenPrivateKey,
      expiresIn: global.SYSTEM_ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      algorithm: 'RS256',
      secret: refreshTokenPrivateKey,
      expiresIn: global.SYSTEM_ENV.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      accessExpiresIn: TimeUtils.convertLifespanToMilliseconds(global.SYSTEM_ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
      refreshToken,
      refreshExpiresIn: TimeUtils.convertLifespanToMilliseconds(global.SYSTEM_ENV.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email }).select('+password');

    if (!user) {
      throw new BadRequestException(MessageWithCodeConstants.EMAIL_IS_NOT_REGISTERED);
    }
    await this.userService.checkEmailVerified(user);

    BcryptUtils.validateHashedContent(password, user.password);
    return user;
  }
}
