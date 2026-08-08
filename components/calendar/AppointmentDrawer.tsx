'use client';

import { CalendarEvent } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Users, Building2, CheckCircle2, XCircle, CalendarClock, MoreVertical } from 'lucide-react';
import { useCalendarStore } from '@/store/calendarStore';
import { toast } from 'sonner';

export function AppointmentDrawer({ 
  event, 
  open, 
  onOpenChange,
  isOwner
}: { 
  event: CalendarEvent | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  isOwner: boolean;
}) {
  const { updateEvent } = useCalendarStore();

  if (!event) return null;

  const isBlocked = event.type === 'BLOCKED_SLOT';

  const handleAction = (status: any) => {
    updateEvent(event.id, { status });
    toast.success(`Appointment ${status.toLowerCase()}`);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[420px] sm:w-[420px] p-0 border-l border-border bg-background flex flex-col">
        {/* Header Color Bar */}
        <div className={`h-3 w-full shrink-0 ${isBlocked ? 'bg-slate-500' : 
            event.status === 'APPROVED' ? 'bg-green-500' :
            event.status === 'REJECTED' ? 'bg-red-500' :
            event.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-amber-500'
        }`} />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <SheetHeader className="mb-6">
            <div className="flex justify-between items-start">
              <SheetTitle className="text-2xl font-bold">{event.title}</SheetTitle>
              {!isBlocked && (
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                  ${event.status === 'APPROVED' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : ''}
                  ${event.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : ''}
                  ${event.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : ''}
                  ${event.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : ''}
                `}>
                  {event.status}
                </span>
              )}
              {isBlocked && (
                <span className="px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Blocked
                </span>
              )}
            </div>
            {!isBlocked && event.data && 'description' in event.data && event.data.description && (
              <SheetDescription className="text-sm mt-2">
                {event.data.description}
              </SheetDescription>
            )}
          </SheetHeader>

          <div className="space-y-6">
            {/* Details Card */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-muted p-2 rounded-lg"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{format(event.start, 'EEEE, MMMM d, yyyy')}</p>
                  <p className="text-sm text-muted-foreground">{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</p>
                </div>
              </div>

              {!isBlocked && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-muted p-2 rounded-lg"><Users className="h-4 w-4 text-muted-foreground" /></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Participants</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{event.data && 'requesterId' in event.data ? event.data.requesterId.substring(0,2).toUpperCase() : event.data && 'organizerId' in event.data ? event.data.organizerId.substring(0,2).toUpperCase() : 'U'}</AvatarFallback></Avatar>
                        <span className="text-sm text-muted-foreground">{event.data && 'requesterId' in event.data ? event.data.requesterId : event.data && 'organizerId' in event.data ? event.data.organizerId : 'Unknown'} (Requester)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{event.data && 'targetUserId' in event.data ? event.data.targetUserId.substring(0,2).toUpperCase() : event.data && 'participantId' in event.data ? (event.data.participantId || '').substring(0,2).toUpperCase() : 'U'}</AvatarFallback></Avatar>
                        <span className="text-sm text-muted-foreground">{event.data && 'targetUserId' in event.data ? event.data.targetUserId : event.data && 'participantId' in event.data ? event.data.participantId : 'Unknown'} (Host)</span>
                      </div>
                    </div>
                  </div>

                  {event.data && 'organizationId' in event.data && event.data.organizationId && (
                    <div className="flex items-center gap-3">
                      <div className="bg-muted p-2 rounded-lg"><Building2 className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Organization</p>
                        <p className="text-sm text-muted-foreground">{event.data.organizationId}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Dummy Timeline */}
            {!isBlocked && (
              <div>
                <h4 className="text-sm font-bold mb-4 px-1">Activity Timeline</h4>
                <div className="space-y-4 px-2">
                  <div className="relative pl-6 border-l-2 border-muted">
                    <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                    <p className="text-sm font-medium">Appointment Requested</p>
                    <p className="text-xs text-muted-foreground">Today at 9:00 AM</p>
                  </div>
                  {event.status !== 'PENDING' && (
                    <div className="relative pl-6 border-l-2 border-muted">
                      <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-muted-foreground ring-4 ring-background" />
                      <p className="text-sm font-medium">
                        {event.status === 'APPROVED' ? 'Approved by Manager' : event.status === 'REJECTED' ? 'Rejected by Manager' : 'Status Updated'}
                      </p>
                      <p className="text-xs text-muted-foreground">Today at 10:15 AM</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-muted/30 flex flex-col gap-3">
          {isOwner && !isBlocked && event.status === 'PENDING' && (
            <div className="flex gap-3">
              <Button onClick={() => handleAction('APPROVED')} className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
              </Button>
              <Button onClick={() => handleAction('REJECTED')} variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-background" onClick={() => {
              toast.info('Opening reschedule dialog...');
              onOpenChange(false);
            }}>
              <CalendarClock className="mr-2 h-4 w-4" /> Reschedule
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-red-600" onClick={() => {
              toast.success('Appointment cancelled successfully');
              onOpenChange(false);
            }}>
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
