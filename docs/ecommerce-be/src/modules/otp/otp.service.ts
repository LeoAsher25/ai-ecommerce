import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as OtpGenerator from 'otp-generator';
import { Otp } from './otp.entity';
import { COMMON_CONST } from '@/common/constants/app.constant';
import TimeUtils from '@/common/utils/time-utils';
import MessageWithCodeConstants from '@/common/constants/message.constants';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpRepository: Model<Otp>,
  ) {}

  async generateOtp(email: string): Promise<Otp> {
    const otpCode = OtpGenerator.generate(COMMON_CONST.OTP_LENGTH, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expiredAt = new Date(
      new Date().getTime() + TimeUtils.convertLifespanToMilliseconds(global.SYSTEM_ENV.OTP_EXPIRE),
    );

    const newOtp = await this.create({
      email,
      code: otpCode,
      expiredAt,
    });

    await newOtp.save();
    return newOtp;
  }

  async verifyOtp(otpCode: string): Promise<Otp> {
    const otp = await this.findOneBy({
      code: otpCode,
      isUsed: false,
    });

    if (!otp) {
      throw new BadRequestException(MessageWithCodeConstants.OTP_INVALID);
    }

    if (otp.expiredAt < new Date()) {
      throw new BadRequestException(MessageWithCodeConstants.OTP_EXPIRED);
    }

    return otp;
  }

  async deactivateOtp(otp: Otp): Promise<boolean> {
    otp.isUsed = true;
    await otp.save();
    return true;
  }

  create: typeof this.otpRepository.create = this.otpRepository.create.bind(this.otpRepository);
  findOneBy: typeof this.otpRepository.findOne = this.otpRepository.findOne.bind(this.otpRepository);
}
