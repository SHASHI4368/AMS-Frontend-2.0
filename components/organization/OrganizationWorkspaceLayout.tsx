'use client';

import { Organization, Membership } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OrganizationHeader } from './OrganizationHeader';
import { OrganizationStats } from './OrganizationStats';
import { ArrowLeft, Users, UserPlus, Send, Settings, Activity, Building2 } from 'lucide-react';
import { MembersTable } from './MembersTable';
import { PendingRequestsTable } from './PendingRequestsTable';
import { InvitationsTable } from './InvitationsTable';
import { OrganizationSettings } from './OrganizationSettings';
import { OrganizationActivity } from './OrganizationActivity';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface WorkspaceProps {
  organization: Organization;
}

export function OrganizationWorkspaceLayout({ organization }: WorkspaceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  
  const isManager = organization.myRole === 'OWNER' || organization.myRole === 'ADMIN';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/organizations">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizations
          </Button>
        </Link>
      </div>

      <OrganizationHeader organization={organization} isManager={isManager} />
      
      <OrganizationStats organization={organization} isManager={isManager} />

      <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden mt-8">
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <div className="border-b border-border bg-muted/20 px-6 py-2 overflow-x-auto">
            <TabsList variant="line" className="bg-transparent gap-6 h-auto p-0 min-w-max">
              <TabsTrigger 
                value="overview" 
                className="px-2 py-3"
              >
                <Building2 className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger 
                value="members" 
                className="px-2 py-3"
              >
                <Users className="h-4 w-4 mr-2" /> Members
              </TabsTrigger>
              
              {isManager && (
                <>
                  <TabsTrigger 
                    value="requests" 
                    className="px-2 py-3"
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Join Requests
                  </TabsTrigger>
                  <TabsTrigger 
                    value="invitations" 
                    className="px-2 py-3"
                  >
                    <Send className="h-4 w-4 mr-2" /> Invitations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activity" 
                    className="px-2 py-3"
                  >
                    <Activity className="h-4 w-4 mr-2" /> Activity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="px-2 py-3"
                  >
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </TabsTrigger>
                </>
              )}
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="overview" className="m-0 focus-visible:outline-none">
              <div className="py-8">
                <h2 className="text-2xl font-bold mb-4">About {organization.name}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                  {organization.description || "This organization has not provided a description yet."}
                </p>
                <div className="mt-8 bg-muted/50 border border-border p-6 rounded-md inline-block">
                  <p className="text-sm font-medium text-foreground mb-1">Your Role</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {isManager ? 'Manager / Admin' : 'Member'}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="m-0 focus-visible:outline-none">
              <MembersTable organizationId={organization.id} isManager={isManager} />
            </TabsContent>

            {isManager && (
              <>
                <TabsContent value="requests" className="m-0 focus-visible:outline-none">
                  <PendingRequestsTable organizationId={organization.id} />
                </TabsContent>
                
                <TabsContent value="invitations" className="m-0 focus-visible:outline-none">
                  <InvitationsTable organizationId={organization.id} />
                </TabsContent>

                <TabsContent value="activity" className="m-0 focus-visible:outline-none">
                  <OrganizationActivity organizationId={organization.id} />
                </TabsContent>

                <TabsContent value="settings" className="m-0 focus-visible:outline-none">
                  <OrganizationSettings organization={organization} />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
