import { delay } from "../utils/mockUtils";
import { api } from "../lib/axios";

export const authService = {
  getCurrentUser: async () => {
    // We wrap this in a try-catch so it doesn't throw unhandled promise rejections if not logged in
    try {
      const response = await api.get("/users/me");
      if (response.data.success && response.data.body) {
        const body = response.data.body;
        return {
          ...body,
          id: String(body.id), // Ensure ID is a string for the frontend
          name: `${body.firstName} ${body.lastName}` // Populate name for UI compatibility
        };
      }
      return null;
    } catch (error) {
      console.log("getCurrentUser error:", error);
      return null;
    }
  },

  signup: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  verifyEmail: async (data: { email: string; code: string }) => {
    console.log(data)
    const response = await api.post("/auth/verify-email", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  googleLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;
  },

  forgotPassword: async (email: string): Promise<{ success: boolean }> => {
    await delay(800);
    return { success: true };
  },
};
