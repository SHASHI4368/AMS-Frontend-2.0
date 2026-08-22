'use client';

import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Mail, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export function InvitationsTable({ organizationId }: { organizationId: string }) {
  const { data: invitations = [], isLoading, refetch } = useQuery({
    queryKey: ['invitations', organizationId],
    queryFn: () => organizationService.getInvitations(organizationId),
  });

  const handleCancel = async (id: string) => {
    toast.promise(organizationService.cancelInvitation(id), {
      loading: 'Canceling invitation...',
      success: () => {
        refetch();
        return 'Invitation canceled';
      },
      error: 'Failed to cancel invitation',
    });
  };

  const handleResend = (email: string) => {
    toast.promise(organizationService.inviteUser(organizationId, email), {
      loading: 'Resending invitation...',
      success: 'Invitation resent successfully',
      error: 'Failed to resend invitation',
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (invitations.length === 0) {
    return (
      <div className="bg-card rounded-md border border-border shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium text-foreground">No Pending Invitations</h3>
        <p className="text-muted-foreground mt-1">You haven't invited anyone to join this organization yet.</p>
        <Button className="mt-4">Invite Member</Button>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                <div className="flex items-center gap-3 font-medium text-foreground">
                  <Avatar className="h-9 w-9 border border-border">
                    {inv.avatarUrl && <AvatarImage src={inv.avatarUrl} alt={inv.name || inv.email} />}
                    <AvatarFallback className="bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    {inv.name && <span className="text-sm">{inv.name}</span>}
                    <span className="text-xs text-muted-foreground font-normal">{inv.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDistanceToNow(new Date(inv.invitedAt))} ago
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {inv.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleResend(inv.email)}>
                    <RefreshCw className="h-4 w-4 mr-1.5" /> Resend
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleCancel(inv.id)}>
                    <XCircle className="h-4 w-4 mr-1.5" /> Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
