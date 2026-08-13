'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Membership } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MemberProfileDrawer } from './MemberProfileDrawer';
import { InviteMemberDialog } from './InviteMemberDialog';
import { Search, Loader2, ShieldCheck, User } from 'lucide-react';

interface MembersTableProps {
  organizationId: string;
  isManager: boolean;
}

export function MembersTable({ organizationId, isManager }: MembersTableProps) {
  const { user: currentUser } = useAuthStore();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<Membership | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['org-members', organizationId],
    queryFn: () => organizationService.getOrganizationMembers(organizationId),
  });

  const filteredMembers = members.filter(m => {
    if (!m.user) return false;
    const s = search.toLowerCase();
    return m.user.name.toLowerCase().includes(s) || m.user.email.toLowerCase().includes(s);
  });

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
            {filteredMembers.map((member) => (
              <TableRow key={member.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedMember(member)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {member.user?.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{member.user?.name} {member.userId === currentUser?.id && '(You)'}</div>
                      <div className="text-xs text-muted-foreground">{member.user?.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {member.role === 'MANAGER' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      <ShieldCheck className="h-3.5 w-3.5" /> Manager
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
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}>
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  No members found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
