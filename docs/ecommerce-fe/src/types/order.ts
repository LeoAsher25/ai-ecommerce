export enum EPaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
  BANK_TRANSFER = 'BANK_TRANSFER',
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

export interface OrderProductDto {
  _id?: string
  productId: string // MongoDB ObjectId
  name: string
  image: string
  price: number
  quantity: number
}

export interface IOrder {
  _id?: string
  fullName: string
  address: string
  phoneNumber: string
  note: string
  totalCost: number
  paymentMethod: EPaymentMethod
  customerId: string // MongoDB ObjectId của User
  orderStatus: EOrderStatus
  paymentStatus: EPaymentStatus
  orderItems: OrderProductDto[]
  createdAt: Date
  updatedAt: Date
}

export type IOrderPayload = Pick<
  IOrder,
  'fullName' | 'address' | 'phoneNumber' | 'note' | 'paymentMethod' | 'orderItems'
>

export interface IOrderParams {
  page?: number
  limit?: number
  search?: string
  orderStatus?: EOrderStatus
  paymentStatus?: EPaymentStatus
  paymentMethod?: EPaymentMethod
  sort?: string
  sortBy?: string
}
