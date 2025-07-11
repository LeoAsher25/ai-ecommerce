import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductFeedbackService } from '../product-feedback/product-feedback.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: any;
  let _productFeedbackService: ProductFeedbackService;

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
            create: jest.fn(),
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

    productService = module.get<ProductService>(ProductService);
    productModel = module.get(getModelToken(Product.name));
    _productFeedbackService = module.get<ProductFeedbackService>(ProductFeedbackService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const mockProducts = [
        { name: 'Product 1', _id: '1', rating: 0, totalRating: 0 },
        { name: 'Product 2', _id: '2', rating: 0, totalRating: 0 },
      ];
      const mockCount = 2;

      jest.spyOn(productModel, 'find').mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProducts),
        populate: jest.fn().mockReturnThis(),
      });
      jest.spyOn(productModel, 'countDocuments').mockResolvedValue(mockCount);

      const result = await productService.getProducts({
        page: '1',
        pageSize: '10',
        categories: '',
        priceRange: '',
        sort: '',
        ratings: '',
      });

      expect(result.data).toEqual(mockProducts);
      expect(result.responseInfo.totalItems).toBe(mockCount);
    });
  });

  describe('getProduct', () => {
    it('should return a product with ratings and feedbacks', async () => {
      const mockProduct = { name: 'Product 1', _id: '1' };
      const mockFeedbacks = [{ rating: 5 }, { rating: 4 }];

      jest.spyOn(productModel, 'findOne').mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProduct),
      });
      jest.spyOn(_productFeedbackService, 'find').mockResolvedValue(mockFeedbacks);

      const result = await productService.getProduct('1');

      expect(result).toEqual({
        ...mockProduct,
        rating: 9,
        feedbacks: mockFeedbacks,
        totalRating: 2,
      });
    });
  });

  describe('updateOne', () => {
    it('should update a product and return the updated product', async () => {
      const mockProduct = { name: 'Product 1', _id: '1' };
      const updateData = { name: 'Updated Product' };

      jest.spyOn(productModel, 'findOneAndUpdate').mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          ...mockProduct,
          ...updateData,
        }),
      });

      const result = await productService.updateOne('1', updateData);

      expect(result.data).toEqual({
        ...mockProduct,
        ...updateData,
      });
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productModel, 'findOneAndUpdate').mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(productService.updateOne('1', {})).rejects.toThrow('Product not found');
    });
  });

  describe('deleteOne', () => {
    it('should delete a product and return the deleted product', async () => {
      const mockProduct = { name: 'Product 1', _id: '1' };

      jest.spyOn(productModel, 'findOneAndDelete').mockResolvedValue(mockProduct);

      const result = await productService.deleteOne('1');

      expect(result.data).toEqual(mockProduct);
    });

    it('should throw an error if the product is not found', async () => {
      jest.spyOn(productModel, 'findOneAndDelete').mockResolvedValue(null);

      await expect(productService.deleteOne('1')).rejects.toThrow('Product not found');
    });
  });
});
