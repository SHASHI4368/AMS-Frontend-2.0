import { delay } from '../utils/mockUtils';
import { dummyAppointments } from '../dummy-data';
import { Appointment } from '../types';

export const appointmentService = {
  getAppointments: async (filters?: any): Promise<Appointment[]> => {
    await delay(600);
    return [...dummyAppointments];
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
    await delay(400);
    return dummyAppointments.find(a => a.id === id);
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<Appointment> => {
    await delay(600);
    const appointment = dummyAppointments.find(a => a.id === id);
    if (!appointment) throw new Error('Not found');
    return { ...appointment, status };
  },
};
