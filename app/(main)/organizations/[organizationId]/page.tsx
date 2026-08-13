'use client';

import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { useAuthStore } from '@/store/authStore';
import { OrganizationWorkspaceLayout } from '@/components/organization/OrganizationWorkspaceLayout';
import { Loader2 } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';

export default function OrganizationPage() {
  const { user } = useAuthStore();
  const params = useParams();
  const organizationId = params.organizationId as string;
  
  const { data: org, isLoading: orgLoading } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: () => organizationService.getOrganizationById(organizationId),
    enabled: !!organizationId,
  });

  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ['org-members', organizationId],
    queryFn: () => organizationService.getOrganizationMembers(organizationId),
    enabled: !!organizationId,
  });

  if (orgLoading || membersLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!org) {
    return notFound();
  }

  // const membership = members.find(m => m.userId === user?.id);

  // if (!membership) {
  //   return (
  //     <div className="max-w-3xl mx-auto py-20 text-center">
  //       <h2 className="text-2xl font-bold">Access Denied</h2>
  //       <p className="text-muted-foreground mt-2">You are not a member of this organization.</p>
  //     </div>
  //   );
  // }

  return <OrganizationWorkspaceLayout organization={org} />;
}
