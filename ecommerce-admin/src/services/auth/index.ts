import { axios, withAxiosHandler } from '@/lib/axios';
import { ForgotPasswordRequest, LoginRequest, LoginResponse } from './type';

export const authService = {
  login: withAxiosHandler((payload: LoginRequest) =>
    axios.post<LoginResponse>('/admin/auth/login', { ...payload }),
  ),

  preForgotPassword: withAxiosHandler(() => {
    return axios.post('/Mailer/send', {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      verificationType: 'forgot',
    });
  }),
  forgotPassword: withAxiosHandler((payload: ForgotPasswordRequest) => {
    return axios.post('/auth/forgot-password', {
      ...payload,
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    });
  }),
};
