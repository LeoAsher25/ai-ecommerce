import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/modules/user/user.constant';

@Controller('orders')
@UseGuards(JwtAccessTokenGuard)
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() currentUser: User) {
    return this.orderService.buyNow(createOrderDto, currentUser);
  }

  @Get()
  findAll(@CurrentUser() currentUser: User, @Query() query: OrderQueryDto) {
    console.log('query: ', query);
    return this.orderService.findAll(query, currentUser);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.orderService.getDetail(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @CurrentUser() currentUser: User) {
    return this.orderService.update(id, updateOrderDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
