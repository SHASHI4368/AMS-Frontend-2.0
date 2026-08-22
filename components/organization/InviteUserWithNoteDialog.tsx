'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { organizationService } from '@/services/organizationService';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';

interface InviteUserWithNoteDialogProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function InviteUserWithNoteDialog({ user, onOpenChange, organizationId }: InviteUserWithNoteDialogProps) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await organizationService.inviteUser(organizationId, user.id, note);
      toast.success(`Invitation sent to ${user.name || user.email}`);
      queryClient.invalidateQueries({ queryKey: ['org-invitations', organizationId] });
      onOpenChange(false);
      setNote('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(open) => {
      if (!open) {
        onOpenChange(false);
        setNote('');
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite <strong>{user?.name || user?.email}</strong> to your organization.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="note">Message (Optional)</Label>
            <Textarea 
              id="note"
              placeholder="Add a personal note to the invitation..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
