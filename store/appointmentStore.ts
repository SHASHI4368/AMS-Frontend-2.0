import { create } from 'zustand';
import { Appointment } from '../types';

interface AppointmentState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) => set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updates) => set((state) => ({
    appointments: state.appointments.map(app => app.id === id ? { ...app, ...updates } : app)
  })),
}));
