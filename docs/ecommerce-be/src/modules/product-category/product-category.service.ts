import MessageWithCodeConstants, { MessageConstants } from '@/common/constants/message.constants';
import { QueryDto } from '@/common/dto/query.dto';
import AppUtils from '@/common/utils/app.utils';
import { ResponseObject } from '@/types';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { EProductCategoryStatus, ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name) private readonly productCategoryModel: Model<ProductCategory>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  find: typeof this.productCategoryModel.find = this.productCategoryModel.find.bind(this.productCategoryModel);
  findOneAndDelete: typeof this.productCategoryModel.findOneAndDelete = this.productCategoryModel.findOneAndDelete.bind(
    this.productCategoryModel,
  );
  findOneAndUpdate: typeof this.productCategoryModel.findOneAndUpdate = this.productCategoryModel.findOneAndUpdate.bind(
    this.productCategoryModel,
  );
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    await this.checkCategoryName(createProductCategoryDto.name);

    if (createProductCategoryDto.parentId) {
      await this.checkParentCategory(createProductCategoryDto.parentId);
    }

    return this.productCategoryModel.create({
      ...createProductCategoryDto,
      status: EProductCategoryStatus.ACTIVE,
    });
  }

  async deleteOne(id: string): Promise<ResponseObject<ProductCategory>> {
    await this.checkRelatedProduct(id);
    await this.checkChildrenCategory(id);

    const response = await this.productCategoryModel.findByIdAndDelete(id);
    if (!response) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_NOT_FOUND);
    }

    return {
      data: response,
      message: MessageConstants.DELETE_SUCCESS,
    };
  }

  async updateOne(
    id: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ResponseObject<ProductCategory>> {
    await this.checkCategoryName(updateProductCategoryDto.name);

    if (updateProductCategoryDto.status === EProductCategoryStatus.INACTIVE) {
      await this.checkRelatedProduct(id);
      await this.checkChildrenCategory(id);
    }

    if (updateProductCategoryDto.parentId) {
      await this.checkParentCategory(updateProductCategoryDto.parentId);
    }
    const response = await this.productCategoryModel.findByIdAndUpdate(id, updateProductCategoryDto);
    if (!response) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_NOT_FOUND);
    }
    return {
      data: response,
      message: MessageConstants.UPDATE_SUCCESS,
    };
  }

  async findAll(query: QueryDto): Promise<ResponseObject<ProductCategory[]>> {
    const { page, pageSize } = query;
    const totalItems = await this.productCategoryModel.countDocuments({});

    const dataList = await this.productCategoryModel
      .find({}, null, {
        ...AppUtils.getPagingData(page, pageSize),
      })
      .populate({
        path: 'parent',
        select: 'name',
      });

    return {
      data: dataList,
      responseInfo: {
        totalItems: totalItems,
      },
    };
  }

  async findOne(id: string) {
    return this.productCategoryModel.findById(id);
  }

  async updateAllProducts(): Promise<any> {
    const products = await this.productCategoryModel.find();

    for (const product of products) {
      await product.save();
    }

    return { acknowledged: true, modifiedCount: products.length };
  }

  async checkCategoryName(name: string): Promise<boolean> {
    const category = await this.productCategoryModel.findOne({ name });
    if (category) {
      throw new ConflictException(MessageWithCodeConstants.PRODUCT_CATEGORY_ALREADY_EXISTS);
    }
    return true;
  }

  async checkParentCategory(parentId: string): Promise<boolean> {
    const parent = await this.productCategoryModel.findById(parentId);
    if (!parent) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_PARENT_NOT_FOUND);
    }
    if (parent.status === EProductCategoryStatus.INACTIVE) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_PARENT_INACTIVE);
    }
    return true;
  }

  async checkRelatedProduct(categoryId: string): Promise<boolean> {
    const products = await this.productModel.find({ categoryIds: { $in: [categoryId] } });
    if (products.length > 0) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_HAS_PRODUCT);
    }
    return true;
  }

  async checkChildrenCategory(parentId: string): Promise<boolean> {
    const parent = await this.productCategoryModel.find({ parentId });
    if (parent.length > 0) {
      throw new BadRequestException(MessageWithCodeConstants.PRODUCT_CATEGORY_HAS_CHILD);
    }

    return true;
  }
}
