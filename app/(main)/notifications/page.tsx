'use client';

import { useNotificationStore } from '@/store/notificationStore';
import { useQuery } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Calendar, Building, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { notifications, setNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  const { data = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
  });

  useEffect(() => {
    if (data.length > 0 && notifications.length === 0) {
      setNotifications(data);
    }
  }, [data, notifications, setNotifications]);

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

  if (isLoading && notifications.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">Loading notifications...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your schedule and team.</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={!notifications.some(n => !n.isRead)}>
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-6">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Bell className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-foreground">All caught up!</h3>
            <p className="mt-1 text-muted-foreground">You have no new notifications.</p>
          </div>
        ) : (
          notifications.map(notification => (
            <Card key={notification.id} className={cn("transition-colors", !notification.isRead ? "bg-primary/10" : "bg-card")}>
              <CardContent className="p-4 flex gap-4">
                <div className={cn("p-2 rounded-full shrink-0 h-10 w-10 flex items-center justify-center", !notification.isRead ? "bg-card shadow-sm" : "bg-muted")}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className={cn("font-medium", !notification.isRead ? "text-foreground" : "text-foreground")}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
                {!notification.isRead && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="shrink-0 text-primary hover:text-blue-700 hover:bg-blue-100">
                    Mark read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
