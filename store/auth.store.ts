import { create } from "zustand";
import { login as loginService, logout as logoutService, fetchProfile as fetchProfileService, getStoredToken } from '@/services/auth.service';

interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  [key: string]: unknown;
}


interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  restoreSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set,get) => ({
    token: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,

  restoreSession: async () => {
    try {
      const token = await getStoredToken();
      if (token) {
        set({ token, isAuthenticated: true, isLoading: false });
        void get().fetchProfile();
        return;
      }
    } catch (e) {
      console.error('Failed to restore session', e);
    }
    set({ isLoading: false });
  },

  fetchProfile: async () => {
  try {
    const user = await fetchProfileService();
    console.log(user)
    set({ user });
  } catch (e) {
    console.error('Failed to fetch profile', e);
  }
},
   login: async (email: string, password: string) => {
    const data = await loginService({ email, password });
    set({
      token: data.token,
      user: (data.user as User) ?? null,
      isAuthenticated: true,
    });
  },
      logout: async () => {
    await logoutService();
    set({ token: null, user: null, isAuthenticated: false });
  },
}))