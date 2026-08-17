import { api } from '@/lib/axios';
import { Notification, PaginatedResponse } from '../types';

export const notificationService = {
  getNotifications: async (page = 0, size = 10): Promise<PaginatedResponse<Notification>> => {
    try {
      const { data } = await api.get('/notifications/my', {
        params: { page, size }
      });
      const body = data.body || data;
      return {
        ...body,
        content: (body.content || []).map((n: any) => ({
          ...n,
          id: String(n.id)
        }))
      };
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      throw error;
    }
  },

  markAsRead: async (id: string): Promise<boolean> => {
    try {
      await api.patch(`/notifications/${id}/read`);
      return true;
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read`, error);
      throw error;
    }
  },

  markAllAsRead: async (): Promise<boolean> => {
    try {
      await api.patch('/notifications/read-all');
      return true;
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
      throw error;
    }
  },

  deleteNotification: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/notifications/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete notification ${id}`, error);
      throw error;
    }
  },

  deleteAllNotifications: async (): Promise<boolean> => {
    try {
      await api.delete('/notifications/my');
      return true;
    } catch (error) {
      console.error("Failed to delete all notifications", error);
      throw error;
    }
  }
};
