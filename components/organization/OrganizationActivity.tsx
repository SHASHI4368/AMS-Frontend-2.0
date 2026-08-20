'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Loader2, UserPlus, Send, CheckCircle2, Edit2, Building, UserMinus, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef } from 'react';
import { OrganizationActivityType } from '@/types';

export function OrganizationActivity({ organizationId }: { organizationId: string }) {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['org-activity', organizationId],
    queryFn: ({ pageParam = 0 }) => organizationService.getOrganizationActivity(organizationId, pageParam, 10),
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const activities = data?.pages.flatMap(page => page.content) || [];

  const getIcon = (type: OrganizationActivityType) => {
    switch (type) {
      case 'ORGANIZATION_CREATED': return <Building className="h-4 w-4 text-emerald-600" />;
      case 'ORGANIZATION_UPDATED': return <Edit2 className="h-4 w-4 text-purple-600" />;
      case 'MEMBER_JOINED': return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'MEMBER_LEFT': return <UserMinus className="h-4 w-4 text-destructive" />;
      case 'MEMBER_INVITED': return <Send className="h-4 w-4 text-blue-600" />;
      case 'INVITATION_ACCEPTED': return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'INVITATION_REJECTED': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'JOIN_REQUEST_SENT': return <Send className="h-4 w-4 text-amber-600" />;
      case 'JOIN_REQUEST_ACCEPTED': return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'JOIN_REQUEST_REJECTED': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <UserPlus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getBgColor = (type: OrganizationActivityType) => {
    switch (type) {
      case 'ORGANIZATION_CREATED': return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'ORGANIZATION_UPDATED': return 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800';
      case 'MEMBER_JOINED': return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'MEMBER_LEFT': return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'MEMBER_INVITED': return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'INVITATION_ACCEPTED': return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'INVITATION_REJECTED': return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'JOIN_REQUEST_SENT': return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      case 'JOIN_REQUEST_ACCEPTED': return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'JOIN_REQUEST_REJECTED': return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
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
            <div className={`absolute -left-[18px] top-1 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm ${getBgColor(activity.activityType)}`}>
              {getIcon(activity.activityType)}
            </div>
            <div className="bg-card border border-border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-start mb-1 gap-4">
                <span className="font-semibold text-foreground text-sm">{activity.activityType.replace(/_/g, ' ')}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDistanceToNow(new Date(activity.createdAt))} ago</span>
              </div>
              <p className="text-sm text-foreground mb-1"><span className="font-medium">{activity.actor}</span></p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="pl-8 text-muted-foreground text-sm">No recent activity.</div>
        )}

        {hasNextPage && (
          <div ref={loadMoreRef} className="pl-8 flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
