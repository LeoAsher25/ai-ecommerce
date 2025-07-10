import { ForgotPasswordDto } from '@/auth/dto/forgot-password.dto';
import { Order } from '@/modules/order/entities/order.entity';
import { EOrderStatus } from '@/modules/order/order.interface';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Otp } from 'src/modules/otp/otp.entity';
import TimeUtils from '../utils/time-utils';

@Injectable()
export class EmailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      // Cấu hình transporter, ví dụ: SMTP hoặc service như Gmail
      // Chi tiết cấu hình xem trong tài liệu nodemailer
      host: global.SYSTEM_ENV.EMAIL_HOST, // Gmail SMTP server address
      port: global.SYSTEM_ENV.EMAIL_PORT,
      secure: true,
      auth: {
        user: global.SYSTEM_ENV.SYSTEM_EMAIL, // Địa chỉ email của bạn
        pass: global.SYSTEM_ENV.SYSTEM_EMAIL_PASSWORD, // Mật khẩu email của bạn, mật khẩu app nếu sử dụng Gmail
      },
      // Cấu hình thêm (tuỳ chọn):
      // secureConnection: true, // Sử dụng kết nối bảo mật SSL/TLS
    });
  }

  async sendRegistrationVerificationLink(registerDto: RegisterDto, otp: Otp, token: string): Promise<boolean> {
    const mailContent = ` 
    <p>
      Có người đã đăng ký tài khoản PetsLa bằng email ${registerDto.email}. Vui lòng click 
      <a href="${global.SYSTEM_ENV.WEB_URL}/register/verify?token=${token}" target="_blank"> tại dây </a>
      để hoàn tất quá trình đăng ký.
    </p>
    `;
    const mailOptions: nodemailer.SendMailOptions = {
      to: registerDto.email,
      subject: 'Xác nhận đăng ký tài khoản Chore',
      html: this.generateHtmlEmail(`${registerDto.firstName}`, mailContent, {
        expiresIn: TimeUtils.convertLifespanToMilliseconds(global.SYSTEM_ENV.OTP_EXPIRE),
      }),
    };

    await this.transporter.sendMail(mailOptions);

    return true;
  }

  async sendPasswordResettingVerificationLink(name: string, dto: ForgotPasswordDto, token: string): Promise<boolean> {
    const mailContent = `
    <p>
      Chúng tôi nhận được yêu cầu đổi mật khẩu cho tài khoản bằng email ${dto.email}. Vui lòng click 
      <a href="${global.SYSTEM_ENV.WEB_URL}/new-password?token=${token}" target="_blank"> tại dây </a>
      để xác nhận.
    </p>
    `;
    const mailOptions: nodemailer.SendMailOptions = {
      to: dto.email,
      subject: 'Xác nhận đặt lại mật khẩu',
      html: this.generateHtmlEmail(name, mailContent, {
        expiresIn: TimeUtils.convertLifespanToMilliseconds(global.SYSTEM_ENV.OTP_EXPIRE),
      }),
    };

    await this.transporter.sendMail(mailOptions);

    return true;
  }

  generateHtmlEmail(name: string, content: string, options?: { expiresIn: number }): string {
    return `
    <h4>Xin chào ${name}</h4>
    ${content}
    <div> OTP sẽ có hiệu lực trong vòng ${Number(options?.expiresIn) / 60000} phút</div>
    <div> Nếu bạn không yêu cầu tạo tài khoản này, vui lòng bỏ qua email này. </div>
    <p>Trân trọng,</p>
    <p>Chore Team</p>
    `;
  }

  async sendOrderSuccessEmail(email: string, totalCost: number, createOrderDto: Order): Promise<void> {
    const trList = createOrderDto.orderItems.map(
      (item, index) =>
        `
        <tr>
          <td style="padding: 4px 8px; text-align: center"> ${index} </td>
          <td style="padding: 4px 8px"> ${item.name} </td>
          <td style="padding: 4px 8px"> ${item.price}đ </td>
          <td style="padding: 4px 8px"> ${item.quantity} </td>
          <td style="padding: 4px 8px"> ${item.quantity * item.price}đ </td>
        </tr>
        `,
    );

    const mailOptions: nodemailer.SendMailOptions = {
      to: email, // Địa chỉ email đích
      subject: 'PetsLa: Đặt hàng thành công', // Chủ đề email
      html: `
      <h4>Xin chào ${createOrderDto.fullName}</h4>
      <p>Chúng tôi xin cảm ơn bạn đã lựa chọn mua sản phẩm tại PetsLa. Dưới đây là danh sách sản phẩm trong đơn hàng:</p>
      <table border="1" style="border-spacing: 0">
        <thead>
          <tr>
            <th style="padding: 4px 8px">STT</th>
            <th style="padding: 4px 8px; text-align: left">Tên</th>
            <th style="padding: 4px 8px">Đơn giá</th>
            <th style="padding: 4px 8px">Số lượng</th>
            <th style="padding: 4px 8px">Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          ${trList.join('')}
        </tbody>
      </table>

      <p> Tổng tiền: ${totalCost}đ </p>

      <p> Chúng tôi sẽ sớm đóng gói sản phẩm và chuyển đến bạn sớm nhất có thể. </p>

      <p> Bạn có thể xem chi tiết <a href="${global.SYSTEM_ENV.PETSLA_SHOP_URL}/account/orders/${
        (createOrderDto as any)._id
      }" target="_blank"> tại đây</a>.</p>


      <p>Trân trọng,</p>
      <p>PetsLa Shop</p>
      `, // Nội dung email dạng HTML
    };

    await this.transporter.sendMail(mailOptions);
    return;
  }

  async sendUpdateOrderEmail(email: string, totalCost: number, orderDto: Order): Promise<void> {
    const trList = orderDto.orderItems.map(
      (item, index) =>
        `
        <tr>
          <td style="padding: 4px 8px; text-align: center"> ${index} </td>
          <td style="padding: 4px 8px"> ${item.name} </td>
          <td style="padding: 4px 8px"> ${item.price}đ </td>
          <td style="padding: 4px 8px"> ${item.quantity} </td>
          <td style="padding: 4px 8px"> ${item.quantity * item.price}đ </td>
        </tr>
        `,
    );

    const mailOptions: nodemailer.SendMailOptions = {
      to: email, // Địa chỉ email đích
      subject: `PetsLa: ${
        orderDto.orderStatus === EOrderStatus.SHIPPING
          ? 'Đóng gói và giao cho đơn vị vận chuyển thành công'
          : orderDto.orderStatus === EOrderStatus.DELIVERED
            ? 'Giao hàng thành công'
            : 'Hủy đơn hàng thành công'
      }`, // Chủ đề email
      html: `
      <h4>Xin chào ${orderDto.fullName}</h4>
      <p>Đơn hàng của bạn ${
        orderDto.orderStatus === EOrderStatus.SHIPPING
          ? 'đã được đóng gói thành công và đang trên đường giao đến bạn'
          : orderDto.orderStatus === EOrderStatus.DELIVERED
            ? 'đã được giao thành công'
            : 'đã được hủy thành công'
      }. Dưới đây là danh sách sản phẩm trong đơn hàng:</p>
      <table border="1" style="border-spacing: 0">
        <thead>
          <tr>
            <th style="padding: 4px 8px">STT</th>
            <th style="padding: 4px 8px; text-align: left">Tên</th>
            <th style="padding: 4px 8px">Đơn giá</th>
            <th style="padding: 4px 8px">Số lượng</th>
            <th style="padding: 4px 8px">Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          ${trList.join('')}
        </tbody>
      </table>

      <p> Tổng tiền: ${totalCost}đ </p>

      <p> Bạn có thể xem chi tiết <a href="${
        global.SYSTEM_ENV.PETSLA_SHOP_URL
      }/account/orders/${orderDto._id}" target="_blank"> tại đây</a>.</p>

      <p>Trân trọng,</p>
      <p>PetsLa Shop</p>
      `, // Nội dung email dạng HTML
    };

    await this.transporter.sendMail(mailOptions);
    return;
  }
}
