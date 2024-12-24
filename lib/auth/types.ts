export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}