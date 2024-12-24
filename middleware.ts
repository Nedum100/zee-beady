import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from '@/lib/constants/routes';
import {
  isStaticPath,
  isAuthPath,
  isPublicPath,
  isProtectedPath,
  handleAuthenticatedUser,
  handleUnauthenticatedUser,
} from '@/lib/auth/middleware-helpers';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');

  // Allow static files and API routes
  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  // Allow public paths and auth paths
  if (isPublicPath(pathname) || isAuthPath(pathname)) {
    return NextResponse.next();
  }

  // Handle authenticated users
  if (token) {
    const authResponse = handleAuthenticatedUser(request);
    if (authResponse) return authResponse;
    return NextResponse.next();
  }

  // Handle unauthenticated users
  const unauthResponse = handleUnauthenticatedUser(request);
  if (unauthResponse) return unauthResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|BeadAssets).*)',
  ],
};