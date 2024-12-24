'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';
import { routes, DEFAULT_LOGIN_REDIRECT } from '../constants/routes';

export function useAuthRedirect(requireAuth = true) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? '/'; // Fallback for undefined pathname

  useEffect(() => {
    if (!isLoading) {
      // Redirect unauthenticated users to login if required
      if (requireAuth && !isAuthenticated) {
        const loginUrl = new URL(routes.auth.login, window.location.origin);
        loginUrl.searchParams.set('from', pathname); // Append the 'from' param
        console.log("Redirecting unauthenticated user to login:", loginUrl.toString());
        router.push(loginUrl.toString());
        return;
      }

      // Prevent non-admins from accessing admin routes
      if (pathname.startsWith('/admin') && user?.role !== 'admin') {
        console.log("Non-admin user trying to access admin route. Redirecting to:", DEFAULT_LOGIN_REDIRECT);
        router.push(DEFAULT_LOGIN_REDIRECT || '/');
        return;
      }

      // Redirect authenticated users away from login/signup pages
      if (
        isAuthenticated &&
        (pathname === routes.auth.login || pathname === routes.auth.signup)
      ) {
        console.log("Authenticated user on login/signup page. Redirecting to:", DEFAULT_LOGIN_REDIRECT);
        router.push(DEFAULT_LOGIN_REDIRECT || '/');
        return;
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, router, pathname, user]);

  return { isLoading, isAuthenticated };
}
