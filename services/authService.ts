import { delay } from '../utils/mockUtils';
import { dummyUsers } from '../dummy-data';
import { User } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User, token: string }> => {
    await delay(800);
    const user = dummyUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return { user, token: 'mock-jwt-token' };
  },

  signup: async (data: any): Promise<{ message: string }> => {
    await delay(1000);
    return { message: 'Signup successful, please verify email' };
  },

  verifyEmail: async (code: string): Promise<{ success: boolean }> => {
    await delay(600);
    if (code === '123456') return { success: true };
    throw new Error('Invalid verification code');
  },

  googleLogin: async (): Promise<{ user: User, token: string }> => {
    await delay(1200);
    return { user: dummyUsers[0], token: 'mock-jwt-token' };
  },

  forgotPassword: async (email: string): Promise<{ success: boolean }> => {
    await delay(800);
    return { success: true };
  }
};
