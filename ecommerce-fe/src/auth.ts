import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { authService } from '@/services/auth'
import { userService } from '@/services/user'
import { IProfile } from '@/types/user'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/dang-nhap',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Lưu session dưới dạng JWT
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string
            password: string
          }

          const data = await authService.login({
            email,
            password,
          })

          const accessToken = data?.data?.accessToken

          const profileResponse = await userService.profile(accessToken)

          return {
            ...(profileResponse.data as IProfile),
            id: profileResponse.data._id,
            accessToken,
          }
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        const { accessToken, ...userData } = user
        token.accessToken = accessToken
        token.user = userData as IProfile
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = String(token.accessToken) // Gắn accessToken vào params.session
      session.user = token.user // Gắn accessToken vào params.session

      return session
    },
  },
}
