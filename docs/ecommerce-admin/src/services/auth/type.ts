import { APIResponse, User } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = APIResponse<{
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  refreshExpiresIn?: number;
}>;

export type ProfileResponse = APIResponse<User>;

export type ForgotPasswordRequest = {
  newPassword: string;
  code: string;
};
