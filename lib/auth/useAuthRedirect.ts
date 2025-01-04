'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuthRedirect(requireAuth = true) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if authentication is required but user is not authenticated
        router.push('/login');
      } else if (!requireAuth && isAuthenticated) {
        // Redirect to dashboard if authentication is not required but user is authenticated
        router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, router]);

  return {
    isLoading,
    isAuthenticated,
    user: session?.user
  };
}
