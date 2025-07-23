import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const jwt = request.nextUrl.searchParams.get('jwt');
  if (!jwt) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  const cookieStore = cookies();
  (await cookieStore).set('jwt', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.redirect(new URL('/', request.nextUrl));
}
