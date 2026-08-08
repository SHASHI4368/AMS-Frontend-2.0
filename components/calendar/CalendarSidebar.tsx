'use client';

import { useCalendarStore } from '@/store/calendarStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Clock, Search, Filter } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarSidebar({ userId, isOwner, targetUser }: { userId: string, isOwner: boolean, targetUser: any }) {
  const { date, setDate, events } = useCalendarStore();

  // Mini Calendar Logic
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Pad beginning of month
  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array.from({ length: startDayOfWeek }).map((_, i) => i);

  const handlePrevMonth = () => setDate(subMonths(date, 1));
  const handleNextMonth = () => setDate(addMonths(date, 1));

  // Upcoming meetings
  const upcomingEvents = events
    .filter(e => e.start > new Date() && e.type !== 'BLOCKED_SLOT')
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 4);

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-500';
      case 'PENDING': return 'bg-amber-500';
      case 'REJECTED': return 'bg-red-500';
      case 'COMPLETED': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <aside className="w-[300px] shrink-0 flex flex-col gap-6 hidden lg:flex h-full overflow-y-auto pr-2 pb-8">
      
      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <Button className="w-full h-12 shadow-sm rounded-lg font-bold flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" />
          {isOwner ? 'New Appointment' : 'Request Meeting'}
        </Button>
        {isOwner && (
          <Button variant="outline" className="w-full h-11 border-border font-medium">
            Block Time
          </Button>
        )}
      </div>

      {/* Mini Calendar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-sm">{format(date, 'MMMM yyyy')}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon-sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-muted-foreground font-medium">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {paddingDays.map(i => (
            <div key={`empty-${i}`} className="h-8 w-8" />
          ))}
          {days.map(day => {
            const isSelected = isSameDay(day, date);
            const isCurrentDay = isToday(day);
            return (
              <button
                key={day.toISOString()}
                onClick={() => setDate(day)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition-colors
                  ${isSelected ? 'bg-primary text-primary-foreground font-bold shadow-sm' : ''}
                  ${!isSelected && isCurrentDay ? 'bg-accent/20 text-accent font-bold' : ''}
                  ${!isSelected && !isCurrentDay ? 'hover:bg-muted text-foreground' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">{isOwner ? 'Upcoming' : 'Availability Overview'}</h3>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No upcoming meetings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex gap-3 items-start group cursor-pointer">
                <Avatar className="h-9 w-9 border border-background shadow-sm shrink-0">
                  <AvatarFallback className="bg-muted text-xs">
                    {event.title.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    {format(event.start, 'h:mm a')}
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="truncate">{format(event.start, 'MMM d')}</span>
                  </p>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${getStatusColor(event.status)}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters (Mock) */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-sm mb-4">{isOwner ? 'My Calendars' : `${targetUser?.name || 'Member'}'s Calendar`}</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded-sm accent-green-500 h-4 w-4" />
            <span className="font-medium text-foreground">Approved</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded-sm accent-amber-500 h-4 w-4" />
            <span className="font-medium text-foreground">Pending</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded-sm accent-red-500 h-4 w-4" />
            <span className="font-medium text-foreground">Rejected</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded-sm accent-blue-500 h-4 w-4" />
            <span className="font-medium text-foreground">Completed</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded-sm accent-gray-500 h-4 w-4" />
            <span className="font-medium text-foreground">Blocked</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
