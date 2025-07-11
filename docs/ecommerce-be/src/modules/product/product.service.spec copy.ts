// src/modules/product/product.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductFeedbackService } from '../product-feedback/product-feedback.service';

describe('ProductService', () => {
  let service: ProductService;
  let productModel: any;
  let _productFeedbackService: any; // Prefix with underscore to indicate it's unused

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            find: jest.fn(),
            countDocuments: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: ProductFeedbackService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productModel = module.get(getModelToken(Product.name));
    _productFeedbackService = module.get<ProductFeedbackService>(ProductFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
      productModel.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProducts),
        populate: jest.fn().mockReturnThis(),
      });
      productModel.countDocuments.mockResolvedValue(2);

      const result = await service.getProducts({
        page: '1',
        pageSize: '10',
        categories: '',
        priceRange: '',
        sort: '',
        ratings: '',
      });
      expect(result.data).toEqual(mockProducts);
      expect(result.responseInfo.totalItems).toBe(2);
    });
  });
});
