'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { organizationService } from '@/services/organizationService';
import { Membership } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MemberProfileDrawer } from './MemberProfileDrawer';
import { InviteMemberDialog } from './InviteMemberDialog';
import { Search, Loader2, ShieldCheck, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MembersTableProps {
  organizationId: string;
  isManager: boolean;
}

export function MembersTable({ organizationId, isManager }: MembersTableProps) {
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [selectedMember, setSelectedMember] = useState<Membership | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0); // Reset page on search change
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: response, isLoading } = useQuery({
    queryKey: ['org-members', organizationId, page, debouncedSearch],
    queryFn: () => organizationService.getOrganizationMembers(organizationId, page, 10, debouncedSearch),
  });

  const members = response?.content || [];

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search members by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        {isManager && (
          <Button onClick={() => setInviteOpen(true)}>Invite Member</Button>
        )}
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedMember(member)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={member.user?.avatarUrl} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                        {member.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{member.user?.name} {member.userId === currentUser?.id && '(You)'}</div>
                      <div className="text-xs text-muted-foreground">{member.user?.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {member.role === 'ADMIN' || member.role === 'OWNER' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      <ShieldCheck className="h-3.5 w-3.5" /> {member.role === 'OWNER' ? 'Owner' : 'Admin'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      <User className="h-3.5 w-3.5" /> Member
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    router.push(`/calendar/${member.id}`);
                  }}>
                    Go to Calendar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {members.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  No members found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {response && response.totalElements > 0 && (
        <div className="flex items-center justify-between mt-4 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{members.length}</span> of <span className="font-medium text-foreground">{response.totalElements}</span> members
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 px-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="text-sm font-medium px-2 text-muted-foreground">
              Page {page + 1} of {Math.max(1, response.totalPages)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={response.last}
              className="h-8 px-2"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <MemberProfileDrawer 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)}
        isManager={isManager}
        currentUserId={currentUser?.id || ''}
      />
      
      {isManager && (
        <InviteMemberDialog
          organizationId={organizationId}
          open={inviteOpen}
          onOpenChange={setInviteOpen}
        />
      )}
    </div>
  );
}
