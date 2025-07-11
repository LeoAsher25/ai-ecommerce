import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from './user.constant';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<User> | User {
    return user;
  }

  // Thêm các endpoint quản lý user (chỉ dành cho ADMIN)
  @Get()
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }
}
