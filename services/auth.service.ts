import { api } from '@/lib/api';
import * as SecureStore from 'expo-secure-store';



interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  [key: string]: unknown;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}


export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/register', payload);
  const { token } = res.data;

  if (token) {
    await SecureStore.setItemAsync('userToken', token);
  }

  return res.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/login', payload);
  const { token } = res.data;

  if (!token) {
    throw new Error('No token returned from login');
  }
  
  await SecureStore.setItemAsync('userToken', token);
  return res.data;
};




export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync('userToken');
};

export const getStoredToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync('userToken');
};

export const fetchProfile = async () => {
  const res = await api.get('/users/me');
  return res.data;
};