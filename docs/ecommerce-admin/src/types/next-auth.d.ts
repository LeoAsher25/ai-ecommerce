import { DefaultSession } from 'next-auth';
import { User as AppUser } from './entities';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    //accessToken: string;
    user: AppUser;
  }

  interface User extends AppUser {
    id: number;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: AppUser;
    accessToken: string;
  }
}
