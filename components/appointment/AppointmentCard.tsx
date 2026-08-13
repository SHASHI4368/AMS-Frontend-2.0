import { Appointment } from '@/types';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const start = parseISO(appointment.startTime);
  const end = parseISO(appointment.endTime);

  return (
    <div className="bg-card border rounded-md p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{appointment.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{appointment.description || 'No description provided.'}</p>
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span>{format(start, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{format(start, 'h:mm a')} - {format(end, 'h:mm a')}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={appointment.organizer?.avatarUrl} />
            <AvatarFallback>{appointment.organizer?.name?.charAt(0) || 'O'}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium text-foreground">{appointment.organizer?.name}</p>
            <p className="text-xs text-muted-foreground">Organizer</p>
          </div>
        </div>

        <Link href={`/calendar/${appointment.organizerId}`} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          <Users className="w-4 h-4" />
          View Calendar
        </Link>
      </div>
    </div>
  );
}
