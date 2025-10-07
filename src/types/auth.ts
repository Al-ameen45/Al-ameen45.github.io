export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export type UserRole = 'super_admin' | 'admin' | 'user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}