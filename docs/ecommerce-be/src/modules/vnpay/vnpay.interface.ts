export interface VNPayQRRequest {
  amount: number;
  orderInfo: string;
  returnUrl: string;
  ipAddr: string;
  orderType?: string;
  bankCode?: string;
  locale?: string;
}

export interface VNPayQRResponse {
  success: boolean;
  data?: {
    qrCodeUrl: string;
    paymentUrl: string;
    transactionId: string;
    expirationTime: number;
  };
  message?: string;
}

export interface VNPayTransactionStatus {
  success: boolean;
  data?: {
    transactionStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';
    amount: number;
    transactionId: string;
    payDate?: string;
    orderInfo: string;
  };
  message?: string;
}

export interface VNPayConfig {
  tmnCode: string;
  hashSecret: string;
  vnpUrl: string;
  returnUrl: string;
}

export enum VNPayTransactionStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}
