import { NextRequest, NextResponse } from 'next/server';
import { routes, DEFAULT_LOGIN_REDIRECT } from '../constants/routes';

export function isStaticPath(pathname: string): boolean {
  return routes.static.some((path) => pathname.startsWith(path));
}

export function isAuthPath(pathname: string): boolean {
  return pathname === routes.auth.login || pathname === routes.auth.signup;
}

export function isPublicPath(pathname: string): boolean {
  return (routes.public as readonly string[]).includes(pathname);
}

export function isProtectedPath(pathname: string): boolean {
  return routes.protected.some((path) => pathname.startsWith(path));
}

export function isAdminPath(pathname: string): boolean {
  return routes.admin.some((path) => pathname.startsWith(path));
}

export function handleAuthenticatedUser(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  // Handle undefined route
  if (pathname === '/undefined') {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  // Don't redirect on auth pages if authenticated
  if (isAuthPath(pathname as '/login' | '/signup')) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  // Check admin access
  if (isAdminPath(pathname)) {
    try {
      const token = request.cookies.get('token')?.value;
      if (token) {
        // Fix token parsing - JWT tokens are split into three parts
        const [, payloadBase64] = token.split('.');
        if (!payloadBase64) {
          throw new Error('Invalid token format');
        }
        
        // Properly decode JWT payload
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        
        if (payload.role !== 'admin') {
          return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
        }
      }
    } catch (error) {
      console.error('Token parsing error:', error);
      return NextResponse.redirect(new URL(routes.auth.login, request.url));
    }
  }

  return null;
}

export function handleUnauthenticatedUser(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  // Handle undefined route when unauthenticated
  if (pathname === '/undefined') {
    return NextResponse.redirect(new URL(routes.auth.login, request.url));
  }

  // Allow access to auth pages when unauthenticated
  if (isAuthPath(pathname as '/login' | '/signup')) {
    return null;
  }

  // Redirect to login for protected paths
  if (isProtectedPath(pathname)) {
    const loginUrl = new URL(routes.auth.login, request.url);
    // Store the intended destination
    if (pathname !== '/undefined') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return null;
}
