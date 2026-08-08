import { delay } from '../utils/mockUtils';
import { dummyNotifications } from '../dummy-data';
import { Notification } from '../types';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    await delay(300);
    return [...dummyNotifications];
  },

  markAsRead: async (id: string): Promise<boolean> => {
    await delay(200);
    return true;
  }
};
