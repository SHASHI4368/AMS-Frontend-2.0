'use client';

import { useNotificationStore } from '@/store/notificationStore';
import { useQuery } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Calendar, Building, Info, Trash2, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { notifications, setNotifications, markAsRead: storeMarkAsRead, markAllAsRead: storeMarkAllAsRead, removeNotification, removeAllNotifications } = useNotificationStore();

  const { data: response, isLoading, refetch } = useQuery({
    queryKey: ['notifications', page],
    queryFn: () => notificationService.getNotifications(page, 20),
  });

  const pageNotifications = response?.content || [];

  // Update store to keep unread counts globally accurate based on page view
  useEffect(() => {
    if (pageNotifications.length > 0) {
      // Just keep the store updated with the currently viewed page so unread count gets partially refreshed
      setNotifications(pageNotifications);
    }
  }, [pageNotifications, setNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'APPOINTMENT_REQUEST':
      case 'APPOINTMENT_APPROVAL':
      case 'APPOINTMENT_REJECTION':
      case 'TIME_CHANGE':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'ORG_INVITE':
      case 'ORG_APPROVAL':
      case 'MEMBER_REMOVED':
        return <Building className="h-5 w-5 text-emerald-600" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storeMarkAsRead(id); // optimistic update
    try {
      await notificationService.markAsRead(id);
      refetch();
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    storeMarkAllAsRead(); // optimistic update
    try {
      await notificationService.markAllAsRead();
      refetch();
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id); // optimistic update
    try {
      await notificationService.deleteNotification(id);
      refetch();
      toast.success('Notification deleted');
    } catch {
      toast.error('Failed to delete notification');
    }
  };

  const handleDeleteAll = async () => {
    removeAllNotifications(); // optimistic update
    try {
      await notificationService.deleteAllNotifications();
      refetch();
      toast.success('All notifications cleared');
    } catch {
      toast.error('Failed to clear notifications');
    }
  };

  const handleNotificationClick = async (n: any) => {
    if (!n.isRead) {
      await handleMarkAsRead(n.id, { stopPropagation: () => {} } as React.MouseEvent);
    }
    
    if (n.targetType && n.referenceId) {
      const type = n.targetType.toLowerCase();
      // Handle known routing
      switch(type) {
        case 'organization':
          router.push(`/organizations/${n.referenceId}`);
          break;
        case 'appointment':
          router.push(`/my-appointments`);
          break;
        default:
          router.push(`/${type}s/${n.referenceId}`);
          break;
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading notifications...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your schedule and team.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={!pageNotifications.some((n: any) => !n.isRead)}>
            <Check className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" onClick={handleDeleteAll} disabled={pageNotifications.length === 0} className="text-destructive hover:bg-destructive/10">
            <Trash className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {pageNotifications.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-md border border-border">
            <Bell className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-foreground">All caught up!</h3>
            <p className="mt-1 text-muted-foreground">You have no notifications here.</p>
          </div>
        ) : (
          <>
            {pageNotifications.map((notification: any) => (
              <Card 
                key={notification.id} 
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  "transition-all cursor-pointer hover:shadow-md", 
                  !notification.isRead ? "bg-primary/5 border-primary/20" : "bg-card"
                )}
              >
                <CardContent className="p-4 flex gap-4">
                  <div className={cn("p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center", !notification.isRead ? "bg-background shadow-sm" : "bg-muted")}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className={cn("font-medium text-sm sm:text-base", !notification.isRead ? "text-foreground font-semibold" : "text-foreground")}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className={cn("text-sm mt-1", !notification.isRead ? "text-foreground" : "text-muted-foreground")}>
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={(e) => handleDelete(notification.id, e)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {!notification.isRead && (
                      <Button variant="ghost" size="sm" onClick={(e) => handleMarkAsRead(notification.id, e)} className="h-8 text-xs text-primary hover:text-blue-700 hover:bg-blue-100 px-2">
                        Mark read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {response && response.totalElements > 0 && (
              <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing page <span className="font-medium text-foreground">{page + 1}</span> of <span className="font-medium text-foreground">{Math.max(1, response.totalPages)}</span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="h-8 px-3"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => p + 1)}
                    disabled={response.last}
                    className="h-8 px-3"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
