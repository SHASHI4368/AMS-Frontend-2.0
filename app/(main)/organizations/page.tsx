'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { useOrganizationStore } from '@/store/organizationStore';
import { useAuthStore } from '@/store/authStore';
import { OrganizationCard } from '@/components/organization/OrganizationCard';
import { InviteMemberDialog } from '@/components/organization/InviteMemberDialog';
import { CreateOrgDialog } from '@/components/organization/CreateOrgDialog';
import { MyOrganizations } from '@/components/organization/MyOrganizations';
import { IncomingInvitations } from '@/components/organization/IncomingInvitations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Plus, Search, Building2, UserCircle, Send } from 'lucide-react';

export default function OrganizationsPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const { data: orgs = [], isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => organizationService.getOrganizations(),
  });

  const filteredOrgs = orgs.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  const handleJoin = (id: string) => {
    toast.promise(organizationService.requestToJoin(id), {
      loading: 'Sending request...',
      success: 'Join request sent successfully!',
      error: 'Failed to send join request'
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Organizations</h1>
          <p className="text-muted-foreground mt-2">Manage your teams or discover new ones.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-5 rounded-md" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      </div>

      <Tabs defaultValue="my-orgs" className="w-full">
        <TabsList className="h-14 w-full sm:w-auto grid grid-cols-3 sm:flex mb-8 bg-muted p-1 rounded-xl shadow-inner">
          <TabsTrigger value="my-orgs" className="h-full rounded-lg data-[state=active]:bg-background data-[state=active]:shadow px-6 font-medium transition-all text-sm">
            <UserCircle className="h-4 w-4 mr-2 hidden sm:inline" /> My Organizations
          </TabsTrigger>
          <TabsTrigger value="browse" className="h-full rounded-lg data-[state=active]:bg-background data-[state=active]:shadow px-6 font-medium transition-all text-sm">
            <Building2 className="h-4 w-4 mr-2 hidden sm:inline" /> Browse
          </TabsTrigger>
          <TabsTrigger value="invitations" className="h-full rounded-lg data-[state=active]:bg-background data-[state=active]:shadow px-6 font-medium transition-all text-sm">
            <Send className="h-4 w-4 mr-2 hidden sm:inline" /> Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-orgs" className="mt-0 outline-none">
          <MyOrganizations userId={user?.id || ''} />
        </TabsContent>

        <TabsContent value="browse" className="mt-0 outline-none space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search all organizations..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="pl-10 h-12 bg-card border-border rounded-md focus-visible:ring-primary"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-medium text-foreground">No organizations found</h3>
              <p className="mt-1 text-muted-foreground">Try a different search term or create a new one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrgs.map(org => (
                <div key={org.id} className="relative group">
                  <OrganizationCard organization={org} onJoin={handleJoin} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations" className="mt-0 outline-none">
          <IncomingInvitations email={user?.email || ''} />
        </TabsContent>
      </Tabs>
      
      <CreateOrgDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
