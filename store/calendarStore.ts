import { create } from 'zustand';
import { CalendarEvent } from '../types';

interface CalendarState {
  events: CalendarEvent[];
  view: 'month' | 'week' | 'work_week' | 'day' | 'agenda';
  date: Date;
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  setView: (view: CalendarState['view']) => void;
  setDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  view: 'week',
  date: new Date(),
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(ev => ev.id === id ? { ...ev, ...updates } : ev)
  })),
  setView: (view) => set({ view }),
  setDate: (date) => set({ date }),
}));
