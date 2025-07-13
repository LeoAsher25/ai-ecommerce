import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty({ example: 'vnp_Amount=100000', description: 'VNPay response parameters' })
  @IsString()
  @IsNotEmpty()
  vnp_Amount: string;

  @ApiProperty({ example: 'vnp_BankCode=NCB', description: 'Bank code' })
  @IsString()
  @IsNotEmpty()
  vnp_BankCode: string;

  @ApiProperty({ example: 'vnp_BankTranNo=20231201123456', description: 'Bank transaction number' })
  @IsString()
  @IsNotEmpty()
  vnp_BankTranNo: string;

  @ApiProperty({ example: 'vnp_CardType=ATM', description: 'Card type' })
  @IsString()
  @IsNotEmpty()
  vnp_CardType: string;

  @ApiProperty({ example: 'vnp_OrderInfo=Thanh toan don hang', description: 'Order information' })
  @IsString()
  @IsNotEmpty()
  vnp_OrderInfo: string;

  @ApiProperty({ example: 'vnp_PayDate=20231201123456', description: 'Payment date' })
  @IsString()
  @IsNotEmpty()
  vnp_PayDate: string;

  @ApiProperty({ example: 'vnp_ResponseCode=00', description: 'Response code' })
  @IsString()
  @IsNotEmpty()
  vnp_ResponseCode: string;

  @ApiProperty({ example: 'vnp_TmnCode=2QXUI4B4', description: 'TMN code' })
  @IsString()
  @IsNotEmpty()
  vnp_TmnCode: string;

  @ApiProperty({ example: 'vnp_TransactionNo=12345678', description: 'Transaction number' })
  @IsString()
  @IsNotEmpty()
  vnp_TransactionNo: string;

  @ApiProperty({ example: 'vnp_TransactionStatus=00', description: 'Transaction status' })
  @IsString()
  @IsNotEmpty()
  vnp_TransactionStatus: string;

  @ApiProperty({ example: 'vnp_TxnRef=1234567890', description: 'Transaction reference' })
  @IsString()
  @IsNotEmpty()
  vnp_TxnRef: string;

  @ApiProperty({ example: 'vnp_SecureHash=abc123', description: 'Secure hash' })
  @IsString()
  @IsNotEmpty()
  vnp_SecureHash: string;
}
