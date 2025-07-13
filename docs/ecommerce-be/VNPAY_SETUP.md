# VNPay Setup Guide

## Environment Configuration

Add the following environment variables to your `.env` file:

```env
# VNPay Configuration
VNPAY_TMN_CODE=2QXUI4B4
VNPAY_HASH_SECRET=KARBPLZYMLTUGZQUBQQFBPWUQRLDTPKO
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=http://localhost:3000/checkout/return
```

## API Endpoints

### 1. Create QR Code

```
POST /api/v1/vnpay/create-qr
```

**Request Body:**

```json
{
  "amount": 100000,
  "orderInfo": "Thanh toán đơn hàng 1234567890",
  "returnUrl": "https://yourapp.com/checkout/return",
  "ipAddr": "127.0.0.1",
  "orderType": "billpayment",
  "locale": "vn"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "qrCodeUrl": "vnpay://pay?amount=100000&orderInfo=...",
    "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...",
    "transactionId": "TXN_1234567890",
    "expirationTime": 900
  }
}
```

### 2. Check Payment Status

```
GET /api/v1/vnpay/status/{transactionId}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "transactionStatus": "SUCCESS",
    "amount": 100000,
    "transactionId": "TXN_1234567890",
    "payDate": "2024-01-15T10:30:00.000Z",
    "orderInfo": "Thanh toán đơn hàng 1234567890"
  }
}
```

### 3. Verify Payment

```
POST /api/v1/vnpay/verify
```

**Request Body:**

```json
{
  "vnp_Amount": "100000",
  "vnp_BankCode": "NCB",
  "vnp_BankTranNo": "20231201123456",
  "vnp_CardType": "ATM",
  "vnp_OrderInfo": "Thanh toan don hang",
  "vnp_PayDate": "20231201123456",
  "vnp_ResponseCode": "00",
  "vnp_TmnCode": "2QXUI4B4",
  "vnp_TransactionNo": "12345678",
  "vnp_TransactionStatus": "00",
  "vnp_TxnRef": "1234567890",
  "vnp_SecureHash": "abc123"
}
```

## Testing

### For Development/Testing

The current implementation includes a demo mode that simulates payment responses. To test:

1. Start the backend server
2. Make a request to create QR code
3. The system will simulate payment status changes
4. After a few status checks, it will randomly return SUCCESS

### For Production

1. Replace the demo configuration with real VNPay credentials
2. Implement proper database storage for transactions
3. Add proper error handling and logging
4. Configure webhook endpoints for real-time updates

## Security Notes

- Keep VNPay credentials secure
- Use HTTPS in production
- Validate all incoming requests
- Implement proper error handling
- Log all payment activities

## Troubleshooting

### Common Issues

1. **404 Error**: Ensure VNPay module is imported in AppModule
2. **Invalid Hash**: Check VNPAY_HASH_SECRET configuration
3. **QR Not Generating**: Verify VNPAY_TMN_CODE is correct
4. **Payment Not Detected**: Check polling interval and status endpoint

### Debug Mode

Enable debug logging by adding console logs in the service:

```typescript
console.log('Creating QR code with params:', createQRDto);
console.log('Payment status check for:', transactionId);
```
