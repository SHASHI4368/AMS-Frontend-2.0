'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { calendarService } from '@/services/calendarService';
import { useCalendarStore } from '@/store/calendarStore';
import { format } from 'date-fns';

export function RequestMeetingDialog({ open, onOpenChange, slot, targetUserId }: any) {
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const { addEvent } = useCalendarStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const duration = (slot.end.getTime() - slot.start.getTime()) / 60000;
      const req = await calendarService.requestMeeting({
        title,
        reason,
        duration,
        startTime: slot.start.toISOString(),
        endTime: slot.end.toISOString(),
        requesterId: 'currentUser', // Mock
        targetUserId,
      });

      addEvent({
        id: req.id,
        title: req.title,
        start: slot.start,
        end: slot.end,
        type: 'REQUEST',
        status: 'PENDING',
        data: req as any
      });

      toast.success('Meeting requested successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to request meeting');
    } finally {
      setLoading(false);
    }
  };

  if (!slot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-sm text-muted-foreground mb-4">
            {format(slot.start, 'MMM d, yyyy h:mm a')} - {format(slot.end, 'h:mm a')}
          </div>
          <div className="space-y-3">
            <Label>Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-3">
            <Label>Reason</Label>
            <Input value={reason} onChange={e => setReason(e.target.value)} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
