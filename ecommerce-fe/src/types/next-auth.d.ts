import { Profile as DefaultProfile, DefaultSession } from 'next-auth'

import { IProfile } from '@/types/user'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    //accessToken: string;
    user: IProfile
    accessToken: string
  }

  interface User extends IProfile {
    _id: string
    accessToken: string
  }

  interface Profile extends DefaultProfile {
    systemUser: IProfile
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IProfile
    accessToken: string
  }
}
