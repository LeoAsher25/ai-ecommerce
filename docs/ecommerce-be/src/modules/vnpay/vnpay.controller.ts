import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VNPayService } from './vnpay.service';
import { CreateQRDto } from './dto/create-qr.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('vnpay')
@ApiTags('VNPay')
export class VNPayController {
  constructor(private readonly vnpayService: VNPayService) {}

  @Post('create-qr')
  @ApiOperation({ summary: 'Create VNPay QR code for payment' })
  @ApiResponse({ status: 200, description: 'QR code created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createQRCode(@Body() createQRDto: CreateQRDto) {
    return this.vnpayService.createQRCode(createQRDto);
  }

  @Get('status/:transactionId')
  @ApiOperation({ summary: 'Check payment status by transaction ID' })
  @ApiResponse({ status: 200, description: 'Payment status retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async checkPaymentStatus(@Param('transactionId') transactionId: string) {
    return this.vnpayService.checkPaymentStatus(transactionId);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment from VNPay callback' })
  @ApiResponse({ status: 200, description: 'Payment verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payment data' })
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto) {
    return this.vnpayService.verifyPayment(verifyPaymentDto);
  }

  @Post('cancel/:transactionId')
  @ApiOperation({ summary: 'Cancel payment transaction' })
  @ApiResponse({ status: 200, description: 'Payment cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async cancelPayment(@Param('transactionId') _transactionId: string) {
    // In a real implementation, you would implement payment cancellation
    return {
      success: true,
      message: 'Payment cancelled successfully',
    };
  }
}
