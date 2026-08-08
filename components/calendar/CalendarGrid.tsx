'use client';

import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views, Event } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { CalendarEvent } from '@/types';
import { useCalendarStore } from '@/store/calendarStore';
import { RequestMeetingDialog } from './RequestMeetingDialog';
import { BlockSlotDialog } from './BlockSlotDialog';
import { CalendarToolbar } from './CalendarToolbar';
import { EventCard } from './EventCard';
import { AppointmentDrawer } from './AppointmentDrawer';
import { CalendarFAB } from './CalendarFAB';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar);

export function CalendarGrid({ userId, isOwner }: { userId: string, isOwner: boolean }) {
  const { events, view, date, setView, setDate, updateEvent } = useCalendarStore();
  
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{start: Date, end: Date} | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleSelectSlot = useCallback((slotInfo: { start: Date, end: Date }) => {
    setSelectedSlot(slotInfo);
    if (isOwner) {
      setBlockDialogOpen(true);
    } else {
      setRequestDialogOpen(true);
    }
  }, [isOwner]);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  }, []);

  const handleEventDrop = useCallback(
    ({ event, start, end }: any) => {
      if (!isOwner) return; // Only owner can drag and drop
      updateEvent(event.id, { start, end });
    },
    [isOwner, updateEvent]
  );

  const handleEventResize = useCallback(
    ({ event, start, end }: any) => {
      if (!isOwner) return;
      updateEvent(event.id, { start, end });
    },
    [isOwner, updateEvent]
  );

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: 'transparent',
        borderRadius: '0px',
        opacity: 1,
        color: 'inherit',
        border: '0px',
        padding: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="flex-1 flex flex-col relative h-full bg-background/50">
      <DnDCalendar
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        onNavigate={setDate}
        onView={setView as any}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent as any}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CalendarToolbar as any,
          event: ({ event, title }) => <EventCard event={event as CalendarEvent} title={title as string} />
        }}
        views={[Views.MONTH, Views.WEEK, Views.WORK_WEEK, Views.DAY]}
        step={30}
        timeslots={2}
      />

      {selectedSlot && (
        <>
          <RequestMeetingDialog 
            open={requestDialogOpen} 
            onOpenChange={setRequestDialogOpen}
            slot={selectedSlot}
            targetUserId={userId}
          />
          <BlockSlotDialog 
            open={blockDialogOpen} 
            onOpenChange={setBlockDialogOpen}
            slot={selectedSlot}
          />
        </>
      )}

      <AppointmentDrawer 
        event={selectedEvent}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        isOwner={isOwner}
      />

      <CalendarFAB isOwner={isOwner} />
    </div>
  );
}
