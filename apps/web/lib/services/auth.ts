import { apiClient } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    token: string;
  };
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);

    if (response.success && response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", userData);

    if (response.success && response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response;
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}

export const authService = new AuthService();