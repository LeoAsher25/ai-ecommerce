import MessageWithCodeConstants from '@/common/constants/message.constants';
import BcryptUtils from '@/common/utils/bcrypt-utils';
import { ResponseObject } from '@/types';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserStatus } from './user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findOne: typeof this.userModel.findOne = this.userModel.findOne.bind(this.userModel);
  create: typeof this.userModel.create = this.userModel.create.bind(this.userModel);
  update: typeof this.userModel.updateOne = this.userModel.updateOne.bind(this.userModel);

  async changePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<ResponseObject> {
    const user = await this.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException(MessageWithCodeConstants.TOKEN_INVALID);
    }

    const isMatch = await BcryptUtils.comparehash(changePasswordDto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is wrong');

    await this.updatePassword(user, changePasswordDto.newPassword);
    return {
      message: 'Change password successfully',
    };
  }

  async updatePassword(user: User, newPassword: string): Promise<boolean> {
    const hashedPassword = await BcryptUtils.hashData(newPassword);
    user.password = hashedPassword;
    await user.save();
    return true;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await BcryptUtils.hashData(refreshToken);
    await this.userModel.updateOne(
      { _id: userId },
      {
        refreshToken: hashedRefreshToken,
      },
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password -refreshToken');
  }

  async checkEmailVerified(user: User): Promise<boolean> {
    if (user.status !== UserStatus.VERIFIED) {
      throw new UnauthorizedException(MessageWithCodeConstants.EMAIL_IS_NOT_VERIFIED);
    }
    return true;
  }
}
