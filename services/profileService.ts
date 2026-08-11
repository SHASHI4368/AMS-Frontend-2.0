import { delay } from '../utils/mockUtils';
import { dummyProfiles } from '../dummy-data';
import { Profile } from '../types';

export const profileService = {
  getProfile: async (userId: string): Promise<Profile | undefined> => {
    await delay(500);
    return dummyProfiles["u1"];
  },

  updateProfile: async (userId: string, updates: Partial<Profile>): Promise<Profile> => {
    await delay(800);
    const profile = dummyProfiles[userId];
    if (!profile) throw new Error('Profile not found');
    return { ...profile, ...updates };
  },

  uploadAvatar: async (file: File): Promise<string> => {
    await delay(2000);
    // Simulating ImageKit upload
    return `https://i.pravatar.cc/150?u=${Date.now()}`;
  }
};
