import { EmailerService } from '@/common/services/emailer.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { ProductFeedbackService } from '../product-feedback/product-feedback.service';
import AppUtils from '@/common/utils/app.utils';
import { ResponseObject } from '@/types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly emailerService: EmailerService,
    private readonly productService: ProductService,
    private readonly productFeedbackService: ProductFeedbackService,
  ) {}

  async buyNow(createOrderDto: CreateOrderDto, currentUser: User) {
    if (!createOrderDto.orderItems || createOrderDto.orderItems.length === 0) {
      throw new BadRequestException('No product is selected');
    }

    if (createOrderDto.note.length > 500) {
      throw new BadRequestException(`Ghi chú chỉ được tối đa 500 kí tự`);
    }

    let totalCost = 0;

    for (const item of createOrderDto.orderItems) {
      const product: Product = await this.productService.findOne({ _id: item.productId });

      if (!product) {
        throw new BadRequestException(`Product with Id '${item.productId}' is not exist in store`);
      }

      if (product.stock <= 0) {
        throw new BadRequestException(`'${item.name}' is out of stock`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(`The quantity of '${item.name}' isn't enought`);
      }

      totalCost += product.sellingPrice * item.quantity;
    }

    const response = await this.orderModel.create({
      ...createOrderDto,
      customerId: currentUser?._id,
      totalCost,
    });

    if (currentUser) {
      await this.emailerService.sendOrderSuccessEmail(currentUser?.email, totalCost, response);
    }
    for (const item of createOrderDto.orderItems) {
      // Update the stock of the product
      const product: Product = await this.productService.findOne({ _id: item.productId });

      await this.productService.findOneAndUpdate(
        {
          _id: item.productId,
        },
        {
          stock: product.stock - item.quantity,
        },
      );
    }

    return response;
  }

  async findAll(query: OrderQueryDto, currentUser: User): Promise<ResponseObject<Order[]>> {
    const { page, pageSize, orderStatus, isAdmin } = query;
    let filter: any = {};
    if (!isAdmin) {
      filter = {
        customerId: currentUser._id,
      };
    }
    if (orderStatus) {
      filter.orderStatus = Number(orderStatus);
    }
    // return this.orderModel.getAndCount(filter, '', {
    //   ...AppUtils.getPagingData(page, limit),
    //   sort: { createdAt: -1 },
    // });
    const totalItems = await this.orderModel.countDocuments(filter);
    const dataList = await this.orderModel
      .find(filter, null, {
        ...AppUtils.getPagingData(page, pageSize),
        sort: { createdAt: -1 },
      })
      .lean();

    return {
      data: dataList as Order[],
      responseInfo: {
        totalItems,
      },
    };
  }

  async getDetail(id: string): Promise<Order & { feedbackList?: any[] }> {
    const order = (await this.orderModel.findById(id).lean()) as Order;
    if (!order) return order;

    const feedbackList = await this.productFeedbackService
      .find(
        {
          order: id,
        },
        null,
        null,
      )
      .populate([
        {
          path: 'product',
          select: 'name image',
        },
      ]);

    return {
      ...order.toObject(),
      feedbackList,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, currentUser: User) {
    try {
      const response = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
      if (!response) {
        throw new BadRequestException('Order not found');
      }

      await this.emailerService.sendUpdateOrderEmail(
        currentUser.email,
        response.totalCost,
        response.toObject() as unknown as Order,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
