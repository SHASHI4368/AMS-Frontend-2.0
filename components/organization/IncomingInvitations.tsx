'use client';

import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Button } from '@/components/ui/button';
import { Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function IncomingInvitations({ email }: { email: string }) {
  const router = useRouter();
  const { data: invitations = [], isLoading, refetch } = useQuery({
    queryKey: ['my-invitations', email],
    queryFn: () => organizationService.getMyInvitations(email),
    enabled: !!email,
  });

  const handleAccept = async (id: string, orgId: string) => {
    toast.promise(organizationService.acceptInvitation(id), {
      loading: 'Accepting invitation...',
      success: () => {
        refetch();
        router.push(`/organizations/${orgId}`);
        return 'Invitation accepted! Welcome to the organization.';
      },
      error: 'Failed to accept invitation',
    });
  };

  const handleDecline = async (id: string) => {
    toast.promise(organizationService.declineInvitation(id), {
      loading: 'Declining invitation...',
      success: () => {
        refetch();
        return 'Invitation declined.';
      },
      error: 'Failed to decline invitation',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
        <div className="h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="h-8 w-8 text-primary opacity-80" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No Pending Invitations</h3>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          When an organization invites you to join, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {invitations.map((inv) => (
        <div key={inv.id} className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl font-bold shadow-sm">
                  {inv.organization?.name.substring(0, 2).toUpperCase() || 'O'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{inv.organization?.name || 'Unknown'}</h3>
                  <p className="text-sm text-muted-foreground">
                    Invited by <span className="font-medium text-foreground">{inv.invitedBy?.name || 'Manager'}</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 bg-muted/50 p-3 rounded-lg italic">
              "We would love for you to join our organization!"
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground flex items-center">
              Sent {formatDistanceToNow(new Date(inv.invitedAt))} ago
            </span>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleDecline(inv.id)}
              >
                <XCircle className="h-4 w-4 mr-2" /> Decline
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleAccept(inv.id, inv.organizationId)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" /> Accept
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
