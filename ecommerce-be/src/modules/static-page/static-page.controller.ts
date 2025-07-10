import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StaticPageService } from './static-page.service';
import { CreateStaticPageDto, StaticPageQueryDto, UpdateStaticPageDto } from './dto/static-page.dto';
import { JwtAccessTokenGuard } from '@/auth/guard/jwt-access-token.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/modules/user/user.constant';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('Static Pages')
@Controller('static-pages')
export class StaticPageController {
  constructor(private readonly staticPageService: StaticPageService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new static page' })
  create(@Body() createStaticPageDto: CreateStaticPageDto) {
    return this.staticPageService.create(createStaticPageDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all static pages' })
  findAll(@Query() query: StaticPageQueryDto) {
    return this.staticPageService.findAll(query);
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Get a static page by slug' })
  findOne(@Param('slug') slug: string) {
    return this.staticPageService.findBySlug(slug);
  }

  @Patch(':slug')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a static page' })
  update(@Param('slug') slug: string, @Body() updateStaticPageDto: UpdateStaticPageDto) {
    return this.staticPageService.update(slug, updateStaticPageDto);
  }

  @Delete(':slug')
  @UseGuards(JwtAccessTokenGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a static page' })
  remove(@Param('slug') slug: string) {
    return this.staticPageService.remove(slug);
  }
}
