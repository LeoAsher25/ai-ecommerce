import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (/^\/api\/proxy/.test(url.pathname)) {
    const newResponse = NextResponse.next();

    const jwt = await getToken({ req });
    newResponse.headers.set('Authorization', 'Bearer ' + jwt?.accessToken);

    console.log('[MIDDLEWARE] hit: ', url.pathname);

    return newResponse;
  }
}
