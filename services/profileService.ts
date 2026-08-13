/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios';
import { delay } from '../utils/mockUtils';
import { dummyProfiles } from '../dummy-data';
import { Profile } from '../types';

export const profileService = {
  getProfile: async (userId: string): Promise<Profile | undefined> => {
    await delay(500);
    return dummyProfiles["u1"];
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const payload: any = { ...updates };
    if (payload.phoneNumber !== undefined) {
      payload.telephone = payload.phoneNumber;
      delete payload.phoneNumber;
    }

    console.log(payload);
    const response = await api.put('/profile/me', payload);
    console.log(response)
    const body = response.data.body;

    return {
      ...body,
      id: String(body.id),
      phoneNumber: body.telephone || body.phoneNumber
    };
  }
};
