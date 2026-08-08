'use client';

import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { CalendarSidebar } from '@/components/calendar/CalendarSidebar';
import { useAuthStore } from '@/store/authStore';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCalendarStore } from '@/store/calendarStore';
import { dummyAppointments, dummyUsers } from '@/dummy-data';

export default function CalendarPage() {
  const params = useParams();
  const userId = params.userId as string;
  const { user } = useAuthStore();
  const isOwner = user?.id === userId || userId === 'me';
  const targetUser = userId === 'me' ? user : dummyUsers.find(u => u.id === userId);
  
  const { setEvents } = useCalendarStore();

  useEffect(() => {
    // Offset events slightly if it's someone else's calendar so it looks different
    const offsetHours = isOwner ? 0 : 3; 

    const events = dummyAppointments.map(app => {
      const start = new Date(app.startTime);
      const end = new Date(app.endTime);
      start.setHours(start.getHours() + offsetHours);
      end.setHours(end.getHours() + offsetHours);

      return {
        id: app.id + (isOwner ? '' : '_alt'),
        title: isOwner ? app.title : `Busy`,
        start,
        end,
        type: 'APPOINTMENT' as const,
        status: app.status,
        data: app
      };
    });
    setEvents(events);
  }, [userId, setEvents, isOwner]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
      {/* Sidebar Workspace */}
      <CalendarSidebar userId={userId} isOwner={isOwner} targetUser={targetUser} />

      {/* Main Grid Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden relative">
        <CalendarGrid userId={userId} isOwner={isOwner} />
      </div>
    </div>
  );
}
