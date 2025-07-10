import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { QueryProductDto } from './dto/product-query.dto';
import { Product } from './entities/product.entity';

import AppUtils from '@/common/utils/app.utils';
import { ResponseObject } from '@/types';
import { IProductDetail, IProductItem } from '@/types/product.type';
import { ProductFeedbackService } from '../product-feedback/product-feedback.service';
import { UpdateProductDto } from './dto/update-product.dto';

import { convertToSlug } from '@/common/utils/string.util';
import { FileService } from '@/modules/file/file.service';
import { ProductCategoryService } from '@/modules/product-category/product-category.service';
import { generateProductList } from '../../mock/product.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly productFeedbackService: ProductFeedbackService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly fileService: FileService, // Inject FileService
  ) {}

  updateMany: typeof this.productModel.updateMany = this.productModel.updateMany.bind(this.productModel);
  find: typeof this.productModel.find = this.productModel.find.bind(this.productModel);
  findOne: typeof this.productModel.findOne = this.productModel.findOne.bind(this.productModel);
  create: typeof this.productModel.create = this.productModel.create.bind(this.productModel);
  findOneAndUpdate: typeof this.productModel.findOneAndUpdate = this.productModel.findOneAndUpdate.bind(
    this.productModel,
  );

  async getProducts(query: QueryProductDto): Promise<ResponseObject<IProductItem[]>> {
    try {
      const { page, pageSize, search = '', categories = '', priceRange = '', sort = '', ratings = '' } = query;

      const categoryItems = await this.productCategoryService.find(
        { slug: { $in: categories.split(',') } },
        '_id parentId',
      );

      for (const category of categoryItems) {
        if (!category.parentId) {
          const childrenCategories = await this.productCategoryService.find({ parentId: category._id }, '_id');
          categoryItems.push(...childrenCategories);
        }
      }

      const filter: FilterQuery<any> = {
        $and: [],
      };

      console.log('search: ', search);

      if (search) {
        filter.$and.push({
          $or: [
            // { idReadable: { $regex: search || '', $options: 'gmi' } },
            {
              slug: {
                $regex: convertToSlug(search) || '',
                $options: 'mi',
              },
            },
          ],
        });
      }

      if (categoryItems && categoryItems.length > 0) {
        filter.$and.push({
          categoryIds: {
            $in: categoryItems.map(category => category._id),
          },
        });
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split(',').map(Number);
        filter.$and.push({
          price: { $gte: minPrice, $lte: maxPrice },
        });
      }

      if (ratings) {
        const ratingsArray = ratings.split(',').map(Number);
        filter.$and.push({
          rating: { $in: ratingsArray },
        });
      }

      const sortOptions = sort
        ? sort.split(',').reduce((acc, sortField) => {
            const [field, order] = sortField.split(':');
            acc[field] = order === 'asc' ? 1 : -1;
            return acc;
          }, {})
        : { createdAt: -1 };

      const totalItems = await this.productModel.countDocuments(filter);
      const dataList = await this.productModel
        .find(filter, null, {
          ...AppUtils.getPagingData(page, pageSize),
          sort: sortOptions,
        })
        .populate({
          path: 'categoryIds',
          select: 'name type',
          model: 'ProductCategory',
        })
        .lean();

      const productsWithCategories = dataList.map(product => ({
        ...product,
        categories: product.categoryIds,
        categoryIds: undefined,
      }));

      const productsWithRating = await Promise.all(
        productsWithCategories.map(async product => {
          const productFeedbacks = await this.productFeedbackService.find({
            product: product._id,
          });

          return {
            ...product,
            rating: productFeedbacks?.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) ?? 0,
            totalRating: productFeedbacks?.length ?? 0,
          };
        }),
      );
      return {
        responseInfo: { totalItems },
        message: 'Get products successfully',
        data: productsWithRating as unknown as IProductItem[],
      };
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id: string): Promise<IProductDetail> {
    try {
      const product = await this.productModel
        .findOne({ _id: id }, '', null)
        .populate([
          {
            path: 'categoryIds',
            select: 'name image',
          },
        ])
        .lean();
      const productFeedbacks = await this.productFeedbackService.find({
        product: product._id,
      });

      return {
        ...product,
        rating: productFeedbacks?.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0),
        feedbacks: productFeedbacks,
        totalRating: productFeedbacks.length,
        categories: product.categoryIds,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateOne(_id: string, updateProductDto: UpdateProductDto): Promise<ResponseObject<Product>> {
    try {
      // Lấy thông tin sản phẩm cũ
      const oldProduct = await this.productModel.findById(_id).lean();
      if (!oldProduct) {
        throw new BadRequestException('Product not found');
      }

      // Update sản phẩm
      const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, updateProductDto, { new: true }).lean();

      // // Xóa ảnh cũ nếu có thay đổi ảnh
      // if (updateProductDto.images && oldProduct.images) {
      //   const oldImageUrls = oldProduct.images;
      //   const newImageUrls = updateProductDto.images;

      //   // Tìm những ảnh không còn được sử dụng
      //   const deletedImages = oldImageUrls.filter(url => !newImageUrls.includes(url));

      //   // Xóa từng ảnh
      //   await Promise.all(deletedImages.map(url => this.fileService.deleteFile(url)));
      // }

      return {
        data: updatedProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(_id: string): Promise<ResponseObject<Product>> {
    try {
      const product = await this.productModel.findById(_id);
      if (!product) {
        throw new BadRequestException('Product not found');
      }

      // Xóa tất cả ảnh của sản phẩm
      // if (product.images && product.images.length > 0) {
      //   await Promise.all(product.images.map(url => this.fileService.deleteFile(url)));
      // }

      // Xóa sản phẩm
      await this.productModel.deleteOne({ _id: product._id });

      return {
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateAllProducts(): Promise<any> {
    const products = await this.productModel.find();

    for (const product of products) {
      // product.originalPrice = Math.floor(Math.random() + 0.5) % 2 === 0 ? product.originalPrice : null;
      // product.originalPrice = product.sellingPrice;
      await product.save();
    }

    return { acknowledged: true, modifiedCount: products.length };
  }

  async createMock() {
    const productMockList = generateProductList(100);
    for (const product of productMockList) {
      await this.productModel.create(product);
    }
  }
}
