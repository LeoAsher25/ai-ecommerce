import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleGuard } from '@/common/guards/role.guard';
import { UserRole } from '@/modules/user/user.constant';
import { ResponseObject } from '@/types';
import { QueryProductDto } from './dto/product-query.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  create(@Req() req) {
    return this.productService.create(req.body);
  }

  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productService.getProducts(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('test: ', id);
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateOne(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id') id: string): Promise<ResponseObject<Product>> {
    return this.productService.deleteOne(id);
  }

  @Put()
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  updateMultiple() {
    return this.productService.updateAllProducts();
  }

  @Post('create-mock')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  createMock() {
    return this.productService.createMock();
  }
}
