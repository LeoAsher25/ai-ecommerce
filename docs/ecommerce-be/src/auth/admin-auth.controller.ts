import MessageWithCodeConstants from '@/common/constants/message.constants';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { UserRole } from '@/modules/user/user.constant';
import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('admin/auth')
@ApiTags('Admin Auth')
@Public()
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @CurrentUser() user: User): Promise<TokenResponse> {
    // Kiểm tra xem người dùng có phải là admin không
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(MessageWithCodeConstants.PERMISSION_DENIED_RESOURCE);
    }

    return this.authService.login(user);
  }
}
