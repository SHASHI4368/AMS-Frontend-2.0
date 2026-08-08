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
import { useAuthStore } from '@/store/authStore';

export function BlockSlotDialog({ open, onOpenChange, slot }: any) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const { addEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const block = await calendarService.blockSlot({
        reason,
        startTime: slot.start.toISOString(),
        endTime: slot.end.toISOString(),
        userId: user?.id || 'currentUser',
      });

      addEvent({
        id: block.id,
        title: reason || 'Blocked Slot',
        start: slot.start,
        end: slot.end,
        type: 'BLOCKED_SLOT',
        data: block as any
      });

      toast.success('Slot blocked successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to block slot');
    } finally {
      setLoading(false);
    }
  };

  if (!slot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block Time Slot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-sm text-muted-foreground mb-4">
            {format(slot.start, 'MMM d, yyyy h:mm a')} - {format(slot.end, 'h:mm a')}
          </div>
          <div className="space-y-3">
            <Label>Reason (Optional)</Label>
            <Input value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Lunch break" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>Block Slot</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
