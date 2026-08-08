'use client';

import { CalendarEvent } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Users, Clock, Building2, CheckCircle2 } from 'lucide-react';

export function EventCard({ event, title }: { event: CalendarEvent; title: string }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'APPROVED': return { color: 'bg-green-500', border: 'border-l-green-500', bg: 'bg-green-500/10' };
      case 'PENDING': return { color: 'bg-amber-500', border: 'border-l-amber-500', bg: 'bg-amber-500/10' };
      case 'REJECTED': return { color: 'bg-red-500', border: 'border-l-red-500', bg: 'bg-red-500/10' };
      case 'COMPLETED': return { color: 'bg-blue-500', border: 'border-l-blue-500', bg: 'bg-blue-500/10' };
      default: return { color: 'bg-gray-500', border: 'border-l-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  const isBlocked = event.type === 'BLOCKED_SLOT';
  const config = isBlocked ? { color: 'bg-slate-500', border: 'border-l-slate-500', bg: 'bg-slate-500/10' } : getStatusConfig(event.status || '');

  return (
    <TooltipProvider delay={300}>
      <Tooltip>
        <TooltipTrigger className="w-full h-full p-0 border-0 bg-transparent text-left focus:outline-none focus:ring-0">
          <div className={`h-full w-full flex flex-col p-1.5 border-l-4 ${config.border} ${config.bg} rounded-r-md group transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer overflow-hidden`}>
            <div className="flex items-start justify-between gap-1">
              <h4 className={`text-xs font-bold truncate ${isBlocked ? 'text-slate-700 dark:text-slate-300' : 'text-foreground'}`}>
                {title}
              </h4>
              {!isBlocked && (
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.color} mt-1`} />
              )}
            </div>
            
            <span className="text-[10px] text-muted-foreground truncate font-medium mt-0.5">
              {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
            </span>

            {!isBlocked && event.data && (
              <div className="mt-auto flex items-center justify-between pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex -space-x-1">
                  <Avatar className="h-4 w-4 border-[1px] border-background">
                    <AvatarFallback className="text-[8px] font-bold">
                      {(('requesterId' in event.data) ? event.data.requesterId : ('organizerId' in event.data ? event.data.organizerId : 'U')).substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-4 w-4 border-[1px] border-background">
                    <AvatarFallback className="text-[8px] font-bold">
                      {(('targetUserId' in event.data) ? event.data.targetUserId : ('participantId' in event.data ? event.data.participantId : 'U'))?.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {event.status === 'APPROVED' && <CheckCircle2 className="h-3 w-3 text-green-600" />}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="w-72 p-0 rounded-xl overflow-hidden shadow-xl border-border">
          <div className={`h-2 w-full ${config.color}`} />
          <div className="p-4 bg-popover">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-base leading-tight text-popover-foreground pr-4">{title}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${config.bg} ${config.color.replace('bg-', 'text-')}`}>
                {isBlocked ? 'Blocked' : event.status}
              </span>
            </div>
            
            <div className="space-y-2.5 mt-4">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>
                  {format(event.start, 'EEEE, MMMM d, yyyy')}
                  <br/>
                  <span className="font-medium text-popover-foreground">{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</span>
                </span>
              </div>
              
              {!isBlocked && (
                <>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>{(event.data && 'requesterId' in event.data) ? event.data.requesterId : (event.data && 'organizerId' in event.data ? event.data.organizerId : 'Unknown')} & {(event.data && 'targetUserId' in event.data) ? event.data.targetUserId : (event.data && 'participantId' in event.data ? event.data.participantId : 'Unknown')}</span>
                  </div>
                  {event.data && 'organizationId' in event.data && event.data.organizationId && (
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4 shrink-0" />
                      <span>{event.data.organizationId}</span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {!isBlocked && event.data && 'description' in event.data && event.data.description && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground line-clamp-3">"{event.data.description}"</p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
