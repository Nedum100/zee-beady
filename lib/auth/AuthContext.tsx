'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { AuthState, User } from './types';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize authentication state from local storage and cookies
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        console.log('Token from storage:', token);
        console.log('User data from storage:', userData);

        if (token && userData) {
          const user = JSON.parse(userData);
          console.log('Parsed user:', user);
          document.cookie = `token=${token}; path=/`;
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          console.warn('No valid token or user data found.');
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleLogout();
      }
    };

    initAuth();
  }, []);

  // Add this effect to handle authenticated routes
  useEffect(() => {
    if (!state.isLoading) {
      if (state.isAuthenticated) {
        // If user is authenticated but on auth pages, redirect to dashboard
        if (pathname === '/login' || pathname === '/signup') {
          router.replace('/dashboard');
        } else if (pathname === '/undefined') {
          // Handle the undefined route case
          router.replace('/dashboard');
        }
      } else {
        // If user is not authenticated and tries to access protected routes
        if (pathname !== '/login' && pathname !== '/signup' && pathname !== '/') {
          router.replace('/login');
        }
      }
    }
  }, [state.isAuthenticated, state.isLoading, pathname]);

  const handleLogout = async () => {
    try {
      // Clear state first
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

      // Force navigation to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const login = async (token: string, user: User) => {
    try {
      // Update storage first
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      document.cookie = `token=${token}; path=/`;

      // Update state
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: 'Success',
        description: 'Successfully logged in',
      });

      // Force a hard navigation to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      await handleLogout();
      toast({
        title: 'Error',
        description: 'Login failed. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    await handleLogout();
    toast({
      title: 'Success',
      description: 'Successfully logged out',
    });
    router.push('/login');
  };

  const value = {
    ...state,
    login,
    logout,
  };

  if (state.isLoading) {
    return <div>Loading...</div>; // You could replace this with a spinner or better UI
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

