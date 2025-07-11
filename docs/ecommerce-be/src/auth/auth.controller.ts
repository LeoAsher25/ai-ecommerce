import MessageWithCodeConstants from '@/common/constants/message.constants';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { VerifyOtpDto } from '@/modules/otp/dto/verify-otp.dto';
import { User } from '@/modules/user/entities/user.entity';
import { UserRole } from '@/modules/user/user.constant';
import { ResponseObject } from '@/types';
import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendRegistrationDto } from './dto/resend-registration.dto';
import { VerifyForgotPasswordDto } from './dto/verify-forgot-password.dto';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @CurrentUser() user: User): Promise<TokenResponse> {
    // Kiểm tra xem người dùng có phải là admin không
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException(MessageWithCodeConstants.USE_ADMIN_LOGIN);
    }

    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<ResponseObject> {
    return this.authService.register(dto);
  }

  @Post('register/resend')
  resendRegistration(@Body() dto: ResendRegistrationDto): Promise<ResponseObject<boolean>> {
    return this.authService.resendRegistration(dto);
  }

  @Post('register/verify')
  verifyRegistrationToken(@Body() dto: VerifyOtpDto): Promise<ResponseObject<User>> {
    return this.authService.verifyRegistrationToken(dto);
  }

  @Post('forgot-password/reset-password')
  verifyForgotPassword(@Body() verifyForgotPasswordDto: VerifyForgotPasswordDto): Promise<ResponseObject<boolean>> {
    return this.authService.verifyForgotPassword(verifyForgotPasswordDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto): Promise<ResponseObject<string>> {
    return this.authService.forgotPassword(dto);
  }

  @Post('refresh-token')
  async refreshAccessToken(@Body() dto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refreshToken(dto);
  }

  @Post('logout')
  async logout(@CurrentUser() user: User): Promise<ResponseObject> {
    return this.authService.logout(user.email);
  }
}
