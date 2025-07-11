export enum EPaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export interface OrderProduct {
  productId: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

export enum EOrderStatus {
  PENDING = 'PENDING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum EPaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  REFUNDING = 'REFUNDING',
  REFUNDED = 'REFUNDED',
}
