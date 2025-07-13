import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as QRCode from 'qrcode';
import { VNPayQRResponse, VNPayTransactionStatus, VNPayConfig } from './vnpay.interface';
import { CreateQRDto } from './dto/create-qr.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Injectable()
export class VNPayService {
  private readonly vnpayConfig: VNPayConfig;

  constructor(private readonly configService: ConfigService) {
    this.vnpayConfig = {
      tmnCode: this.configService.get<string>('VNPAY_TMN_CODE') || 'JIXGBGHU',
      hashSecret: this.configService.get<string>('VNPAY_HASH_SECRET') || 'T24PM8348I24SDLOUFR80AL3NXTPBIQL',
      vnpUrl: this.configService.get<string>('VNPAY_URL') || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      returnUrl: this.configService.get<string>('VNPAY_RETURN_URL') || 'http://localhost:3000/checkout/return',
    };
  }

  async createQRCode(createQRDto: CreateQRDto): Promise<VNPayQRResponse> {
    try {
      const { amount, orderInfo, returnUrl, ipAddr, orderType = 'billpayment', bankCode, locale = 'vn' } = createQRDto;

      // Generate transaction reference
      const txnRef = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create VNPay payment URL
      const paymentUrl = this.createPaymentUrl({
        amount,
        orderInfo,
        returnUrl,
        ipAddr,
        orderType,
        bankCode,
        locale,
        txnRef,
      });

      // Generate VNPay QR code data
      const qrCodeData = this.generateVNPayQRData({
        amount,
        orderInfo,
        txnRef,
      });

      // Generate actual QR code image as data URL
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });

      return {
        success: true,
        data: {
          qrCodeUrl,
          paymentUrl,
          transactionId: txnRef,
          expirationTime: 900, // 15 minutes
        },
      };
    } catch (error) {
      console.error('Error creating QR code:', error);
      return {
        success: false,
        message: error.message || 'Failed to create QR code',
      };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<VNPayTransactionStatus> {
    try {
      // In a real implementation, you would query your database
      // to check the actual payment status
      // For now, we'll simulate the status check

      // Simulate random status for demo
      const statuses = ['PENDING', 'PENDING', 'PENDING', 'SUCCESS'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        success: true,
        data: {
          transactionStatus: randomStatus as any,
          amount: 100000,
          transactionId,
          payDate: randomStatus === 'SUCCESS' ? new Date().toISOString() : undefined,
          orderInfo: 'Demo payment',
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to check payment status',
      };
    }
  }

  async verifyPayment(verifyPaymentDto: VerifyPaymentDto): Promise<VNPayTransactionStatus> {
    try {
      const { vnp_Amount, vnp_OrderInfo, vnp_PayDate, vnp_ResponseCode, vnp_TransactionStatus, vnp_TxnRef } =
        verifyPaymentDto;

      // Verify secure hash
      const isValidHash = this.verifySecureHash(verifyPaymentDto);
      if (!isValidHash) {
        throw new BadRequestException('Invalid secure hash');
      }

      // Check response code
      if (vnp_ResponseCode !== '00') {
        return {
          success: true,
          data: {
            transactionStatus: 'FAILED',
            amount: parseInt(vnp_Amount),
            transactionId: vnp_TxnRef,
            orderInfo: vnp_OrderInfo,
          },
        };
      }

      // Check transaction status
      if (vnp_TransactionStatus !== '00') {
        return {
          success: true,
          data: {
            transactionStatus: 'FAILED',
            amount: parseInt(vnp_Amount),
            transactionId: vnp_TxnRef,
            orderInfo: vnp_OrderInfo,
          },
        };
      }

      return {
        success: true,
        data: {
          transactionStatus: 'SUCCESS',
          amount: parseInt(vnp_Amount),
          transactionId: vnp_TxnRef,
          payDate: vnp_PayDate,
          orderInfo: vnp_OrderInfo,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to verify payment',
      };
    }
  }

  private createPaymentUrl(params: {
    amount: number;
    orderInfo: string;
    returnUrl: string;
    ipAddr: string;
    orderType: string;
    bankCode?: string;
    locale: string;
    txnRef: string;
  }): string {
    const { amount, orderInfo, returnUrl, ipAddr, orderType, bankCode, locale, txnRef } = params;

    const date = new Date();
    const createDate = date.toISOString().replace(/[-:]/g, '').slice(0, 14);

    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnpayConfig.tmnCode,
      vnp_Amount: (amount * 100).toString(), // VNPay uses cents
      vnp_CurrCode: 'VND',
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_Locale: locale,
    };

    if (bankCode) {
      vnpParams['vnp_BankCode'] = bankCode;
    }

    // Sort parameters alphabetically
    const sortedParams = Object.keys(vnpParams)
      .sort()
      .reduce((result, key) => {
        result[key] = vnpParams[key];
        return result;
      }, {});

    // Create query string
    const queryString = Object.keys(sortedParams)
      .map(key => `${key}=${encodeURIComponent(sortedParams[key])}`)
      .join('&');

    console.log('queryString: ', queryString, sortedParams);

    // Create secure hash
    const secureHash = this.createSecureHash(queryString);

    return `${this.vnpayConfig.vnpUrl}?${queryString}&vnp_SecureHash=${secureHash}`;
  }

  private generateVNPayQRData(params: { amount: number; orderInfo: string; txnRef: string }): string {
    const { amount, orderInfo, txnRef } = params;

    // Generate VNPay QR code data in the correct format for mobile apps
    const qrData = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnpayConfig.tmnCode,
      vnp_Amount: (amount * 100).toString(), // VNPay uses cents
      vnp_CurrCode: 'VND',
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'billpayment',
      vnp_ReturnUrl: this.vnpayConfig.returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: new Date().toISOString().replace(/[-:]/g, '').slice(0, 14),
    };

    // Convert to query string
    const queryString = Object.keys(qrData)
      .map(key => `${key}=${encodeURIComponent(qrData[key])}`)
      .join('&');

    console.log('QR Data queryString: ', queryString);

    // Return the data that will be encoded in QR code
    return `vnpay://pay?${queryString}`;
  }

  private createSecureHash(queryString: string): string {
    const hmac = crypto.createHmac('sha512', this.vnpayConfig.hashSecret);
    hmac.update(queryString);
    return hmac.digest('hex');
  }

  private verifySecureHash(params: any): boolean {
    const { vnp_SecureHash, ...otherParams } = params;

    // Remove vnp_SecureHash from parameters
    const queryString = Object.keys(otherParams)
      .sort()
      .map(key => `${key}=${encodeURIComponent(otherParams[key])}`)
      .join('&');

    const expectedHash = this.createSecureHash(queryString);
    return expectedHash === vnp_SecureHash;
  }
}
