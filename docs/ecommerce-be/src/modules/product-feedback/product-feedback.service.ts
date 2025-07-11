import { ResponseObject } from '@/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductFeedbackDto } from './dto/create-product-feedback.dto';
import { UpdateProductFeedbackDto } from './dto/update-product-feedback.dto';
import { ProductFeedback } from './entities/product-feedback.entity';

@Injectable()
export class ProductFeedbackService {
  constructor(
    @InjectModel(ProductFeedback.name)
    private readonly productFeedbackModel: Model<ProductFeedback>,
  ) {}

  find: typeof this.productFeedbackModel.find = this.productFeedbackModel.find.bind(this.productFeedbackModel);

  findOne: typeof this.productFeedbackModel.findOne = this.productFeedbackModel.findOne.bind(this.productFeedbackModel);

  create: typeof this.productFeedbackModel.create = this.productFeedbackModel.create.bind(this.productFeedbackModel);

  sendFeedback(createProductFeedbackDto: CreateProductFeedbackDto) {
    return this.productFeedbackModel.create(createProductFeedbackDto);
  }

  findFeedbacks(product: string): Promise<ProductFeedback[]> {
    return this.productFeedbackModel.find({
      product,
    });
  }

  async updateFeedback(
    _id: string,
    updateProductFeedbackDto: UpdateProductFeedbackDto,
  ): Promise<ResponseObject<ProductFeedback>> {
    const productFeedback = await this.productFeedbackModel.findOneAndUpdate({ _id }, updateProductFeedbackDto).lean();
    if (!productFeedback) {
      throw new BadRequestException('ID not found');
    }

    return {
      data: productFeedback as any,
    };
  }

  async findFeedback(_id: string): Promise<ResponseObject<ProductFeedback>> {
    const productFeedback = await this.productFeedbackModel.findOne({ _id });
    if (!productFeedback) {
      throw new BadRequestException('ID not found');
    }

    return {
      data: productFeedback,
    };
  }

  async removeFeedback(_id: string): Promise<ResponseObject<ProductFeedback>> {
    const productFeedback = await this.productFeedbackModel.findOneAndDelete({ _id });
    if (!productFeedback) {
      throw new BadRequestException('ID not found');
    }

    return {
      data: productFeedback,
    };
  }
}
