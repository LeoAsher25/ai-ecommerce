import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductFeedbackDto } from './dto/create-product-feedback.dto';
import { UpdateProductFeedbackDto } from './dto/update-product-feedback.dto';
import { ProductFeedbackService } from './product-feedback.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/modules/user/user.constant';

@Controller('product-feedbacks')
@ApiTags('Product Feedbacks')
export class ProductFeedbackController {
  constructor(private readonly productFeedbackService: ProductFeedbackService) {}

  @Post()
  sendFeedback(@Body() createProductFeedbackDto: CreateProductFeedbackDto) {
    return this.productFeedbackService.sendFeedback(createProductFeedbackDto);
  }

  @Get()
  findFeedbacks(@Query('productId') productId: string) {
    return this.productFeedbackService.findFeedbacks(productId);
  }

  @Get(':id')
  findFeedback(@Param('id') id: string) {
    return this.productFeedbackService.findFeedback(id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  updateFeedback(@Param('id') id: string, @Body() updateProductFeedbackDto: UpdateProductFeedbackDto) {
    return this.productFeedbackService.updateFeedback(id, updateProductFeedbackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  removeFeedback(@Param('id') id: string) {
    return this.productFeedbackService.removeFeedback(id);
  }
}
