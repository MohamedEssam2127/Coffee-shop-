import { api } from './api';

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const userService = {
  // GET /users/me
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await api.get('/users/me');
      return response.data.data;
   } catch (error: any) {
      console.log('=== PROFILE API ERROR ===', error?.response?.data || error.message);
      throw error;
    }
  },

  // PUT /users/me
  updateProfile: async (data: { fullName: string; phoneNumber: string }): Promise<UserProfile> => {
    try {
      const response = await api.put('/users/me', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
