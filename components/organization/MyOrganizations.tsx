'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { useOrganizationStore } from '@/store/organizationStore';
import { Button } from '@/components/ui/button';
import { Loader2, Settings2, Users, Building2, CalendarClock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function MyOrganizations({ userId }: { userId: string }) {
  const { myOrganizations, setMyOrganizations } = useOrganizationStore();

  const { data, isLoading } = useQuery({
    queryKey: ['my-organizations', userId],
    queryFn: () => organizationService.getMyOrganizations(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setMyOrganizations(data);
    }
  }, [data, setMyOrganizations]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (myOrganizations.length === 0) {
    return (
      <div className="bg-card rounded-md border border-border shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <Building2 className="h-10 w-10 text-primary opacity-80" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">No Organizations Yet</h3>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          You haven&apos;t joined or created any organizations. Discover existing teams in the Browse tab or create your own workspace.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {myOrganizations.map((org) => {

        return (
          <div key={org.id} className="bg-card border border-border rounded-md shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-xl font-bold shadow-sm">
                    {(org.name || 'OR').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{org.name}</h3>
                    <p className="text-sm text-muted-foreground">{org.description || 'No description provided'}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                  ${org.myRole === 'OWNER' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {org.myRole === 'OWNER' ? 'Owner' : org.myRole === 'ADMIN' ? 'Admin' : 'Member'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span><strong className="text-foreground">{org.memberCount || 1}</strong> {(org.memberCount || 1) === 1 ? 'Member' : 'Members'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4" />
                  <span>Created {formatDistanceToNow(new Date(org.createdAt))} ago</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 border-t border-border p-4 flex justify-between items-center">
              <p className="text-xs font-medium text-muted-foreground">
                {org.myRole === 'OWNER' ? '12 Pending Requests' : 'Active Member'}
              </p>
              <Link href={`/organizations/${org.id}`}>
                <Button 
                  className="bg-foreground text-background hover:bg-foreground/90 h-10 px-6 rounded-md font-semibold"
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  Open Workspace
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
