'use client';

import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export function PendingRequestsTable({ organizationId }: { organizationId: string }) {
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['pending-requests', organizationId],
    queryFn: () => organizationService.getPendingRequests(organizationId),
  });

  const handleApprove = async (id: string) => {
    toast.promise(organizationService.approveJoinRequest(id), {
      loading: 'Approving request...',
      success: () => {
        refetch();
        return 'Request approved';
      },
      error: 'Failed to approve request',
    });
  };

  const handleReject = async (id: string) => {
    toast.promise(organizationService.rejectJoinRequest(id), {
      loading: 'Rejecting request...',
      success: () => {
        refetch();
        return 'Request rejected';
      },
      error: 'Failed to reject request',
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (requests.length === 0) {
    return (
      <div className="bg-card rounded-md border border-border shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium text-foreground">No Pending Requests</h3>
        <p className="text-muted-foreground mt-1">There are no users currently requesting to join this organization.</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={req.user?.avatarUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {req.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{req.user?.name || 'Unknown User'}</div>
                    <div className="text-xs text-muted-foreground">{req.user?.email || 'No email'}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {req.joinedAt ? formatDistanceToNow(new Date(req.joinedAt), { addSuffix: true }) : 'Recently'}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleApprove(req.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-1.5" /> Approve
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleReject(req.id)}>
                    <XCircle className="h-4 w-4 mr-1.5" /> Reject
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
