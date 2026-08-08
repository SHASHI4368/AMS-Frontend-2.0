import { delay } from '../utils/mockUtils';
import { CalendarEvent, MeetingRequest, BlockedSlot } from '../types';

export const calendarService = {
  getEvents: async (userId: string, start: Date, end: Date): Promise<CalendarEvent[]> => {
    await delay(700);
    // Mock mapping appointments and blocked slots to CalendarEvents
    return [];
  },

  requestMeeting: async (request: Omit<MeetingRequest, 'id' | 'status'>): Promise<MeetingRequest> => {
    await delay(800);
    return { ...request, id: 'req_' + Date.now(), status: 'PENDING' };
  },

  blockSlot: async (slot: Omit<BlockedSlot, 'id'>): Promise<BlockedSlot> => {
    await delay(500);
    return { ...slot, id: 'block_' + Date.now() };
  }
};
