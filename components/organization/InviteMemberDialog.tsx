'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserSearch } from './UserSearch';

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function InviteMemberDialog({ open, onOpenChange, organizationId }: InviteMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Search for users to invite to this organization.
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4 pb-2">
          <UserSearch organizationId={organizationId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
