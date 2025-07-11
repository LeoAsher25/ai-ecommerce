import { authService, userService } from '@/services';
import { User } from '@/types';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: process.env.JWT_MAX_AGE ? parseInt(process.env.JWT_MAX_AGE) : 3600,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...userData } = user;
        token.accessToken = accessToken;
        token.user = userData as User;
      }
      return token;
    },
    async session({ session, token }) {
      //session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const { success, data, message } = await authService.login({
          email,
          password,
        });

        if (!success) throw new Error(message);

        const {
          success: profileSuccess,
          data: user,
          message: profileMessage,
        } = await userService.profile(data.accessToken);
        if (!profileSuccess) throw new Error(profileMessage);

        return { accessToken: data.accessToken!, ...user };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
