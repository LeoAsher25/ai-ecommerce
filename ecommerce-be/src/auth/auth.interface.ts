import { User } from '@/modules/user/entities/user.entity';

export interface IValidatedUser extends Partial<User> {}

export interface TokenResponse {
  accessToken: string;
  accessExpiresIn?: number;
  refreshToken: string;
  refreshExpiresIn?: number;
}

export interface TokenPayload {
  id: number;
  email: string;
}

export type JwtPayload = {
  email: string;
  id?: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
