'use client';

import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Loader2, UserPlus, Send, LogOut, CheckCircle2, ShieldAlert, Edit2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function OrganizationActivity({ organizationId }: { organizationId: string }) {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['org-activity', organizationId],
    queryFn: () => organizationService.getOrganizationActivity(organizationId),
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'JOINED': return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'INVITED': return <Send className="h-4 w-4 text-blue-600" />;
      case 'REMOVED': return <LogOut className="h-4 w-4 text-destructive" />;
      case 'APPROVED': return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'PROMOTED':
      case 'DEMOTED': return <ShieldAlert className="h-4 w-4 text-amber-600" />;
      case 'UPDATED': return <Edit2 className="h-4 w-4 text-purple-600" />;
      default: return <UserPlus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'JOINED': return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'INVITED': return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'REMOVED': return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'APPROVED': return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'PROMOTED':
      case 'DEMOTED': return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      case 'UPDATED': return 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800';
      default: return 'bg-muted border-border';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="relative border-l border-border ml-6 space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-8">
            <div className={`absolute -left-[18px] top-1 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm ${getBgColor(activity.type)}`}>
              {getIcon(activity.type)}
            </div>
            <div className="bg-card border border-border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-foreground text-sm">{activity.type}</span>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(activity.createdAt))} ago</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="pl-8 text-muted-foreground text-sm">No recent activity.</div>
        )}
      </div>
    </div>
  );
}
