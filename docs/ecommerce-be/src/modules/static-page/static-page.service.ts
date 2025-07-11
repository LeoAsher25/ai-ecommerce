import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaticPage, StaticPageDocument } from './static-page.entity';
import { CreateStaticPageDto, StaticPageQueryDto, UpdateStaticPageDto } from './dto/static-page.dto';
import { ResponseObject } from '@/types';
import AppUtils from '@/common/utils/app.utils';

@Injectable()
export class StaticPageService {
  constructor(@InjectModel(StaticPage.name) private staticPageModel: Model<StaticPageDocument>) {}

  async create(createStaticPageDto: CreateStaticPageDto): Promise<StaticPage> {
    const newStaticPage = new this.staticPageModel({
      ...createStaticPageDto,
      lastUpdatedAt: new Date(),
    });
    return newStaticPage.save();
  }

  async findAll(query: StaticPageQueryDto = {}): Promise<ResponseObject<StaticPage[]>> {
    try {
      const { page, pageSize } = query;
      const filter: any = {};

      if (query.activeOnly !== false) {
        filter.isActive = true;
      }

      if (query.category) {
        filter['metadata.category'] = query.category;
      }

      const totalItems = await this.staticPageModel.countDocuments(filter);

      const dataList = await this.staticPageModel
        .find(filter, null, {
          ...AppUtils.getPagingData(page, pageSize),
          sort: { 'metadata.order': 1, title: 1 },
        })
        .lean();

      return {
        data: dataList as StaticPage[],
        message: 'Get static pages successfully',
        responseInfo: {
          totalItems,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<StaticPage> {
    const staticPage = await this.staticPageModel.findOne({ slug, isActive: true }).exec();
    if (!staticPage) {
      throw new NotFoundException(`StaticPage with slug "${slug}" not found`);
    }
    return staticPage;
  }

  async update(slug: string, updateStaticPageDto: UpdateStaticPageDto): Promise<StaticPage> {
    const staticPage = await this.staticPageModel
      .findOneAndUpdate({ slug }, { ...updateStaticPageDto, lastUpdatedAt: new Date() }, { new: true })
      .exec();

    if (!staticPage) {
      throw new NotFoundException(`StaticPage with slug "${slug}" not found`);
    }
    return staticPage;
  }

  async remove(slug: string): Promise<boolean> {
    const result = await this.staticPageModel.deleteOne({ slug }).exec();
    return result.deletedCount > 0;
  }
}
