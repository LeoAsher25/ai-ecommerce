import { AccountType, UserRole, UserStatus } from '../user.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// with fullName is a virtual field
export type UserDocument = HydratedDocument<User> & { fullName: string };
@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ length: 255, unique: false, nullable: true })
  firstName: string;

  @Prop({ length: 255, unique: false, nullable: true })
  lastName: string;

  @Prop({ length: 255, unique: true, nullable: true })
  email: string;

  @Prop({ length: 200, nullable: true, select: false })
  password: string;

  @Prop({ enum: UserStatus, default: UserStatus.UNVERIFIED })
  status: UserStatus;

  @Prop({ length: 14, nullable: true })
  phoneNumber: string;

  @Prop({ enum: AccountType })
  accountType: AccountType;

  @Prop({ type: Date })
  dob: Date;

  @Prop({ name: 'last_login', nullable: true })
  lastLogin: Date;

  @Prop({ length: 1000, name: 'refresh_token', nullable: true, select: false })
  refreshToken: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
