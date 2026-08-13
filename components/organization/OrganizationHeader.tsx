'use client';

import { Organization } from '@/types';
import { Button } from '@/components/ui/button';
import { Building2, Edit2, LogOut, UserPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { InviteMemberDialog } from './InviteMemberDialog';

interface OrganizationHeaderProps {
  organization: Organization;
  isManager: boolean;
}

export function OrganizationHeader({ organization, isManager }: OrganizationHeaderProps) {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-md shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start sm:items-center gap-5">
        <div className="h-20 w-20 bg-primary/10 text-primary rounded-md flex items-center justify-center text-3xl font-bold shadow-sm shrink-0">
          {organization.logoUrl ? (
            <img src={organization.logoUrl} alt={organization.name} className="h-full w-full object-cover rounded-md" />
          ) : (
            organization.name.substring(0, 2).toUpperCase()
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{organization.name}</h1>
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider
              ${isManager ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground'}
            `}>
              {isManager ? 'Manager' : 'Member'}
            </span>
          </div>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
            {organization.description || 'No description provided for this organization.'}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              Created {formatDistanceToNow(new Date(organization.createdAt))} ago
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        {isManager ? (
          <>
            <Button variant="outline" className="h-10 border-border">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="h-10" onClick={() => setInviteOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Members
            </Button>
          </>
        ) : (
          <Button variant="outline" className="h-10 text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Leave Organization
          </Button>
        )}
      </div>

      {isManager && (
        <InviteMemberDialog
          organizationId={organization.id}
          open={inviteOpen}
          onOpenChange={setInviteOpen}
        />
      )}
    </div>
  );
}
