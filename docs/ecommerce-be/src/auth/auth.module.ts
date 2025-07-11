import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailerService } from 'src/common/services/emailer.service';
import { OtpModule } from '@/modules/otp/otp.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [UserModule, OtpModule, JwtModule.register({})],
  controllers: [AdminAuthController, AuthController],
  providers: [EmailerService, AuthService, LocalStrategy, JwtAccessTokenStrategy, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
