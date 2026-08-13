'use client';

import { Organization } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Users, ShieldCheck, UserPlus, Send, Calendar, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface OrganizationStatsProps {
  organization: Organization;
  isManager: boolean;
}

export function OrganizationStats({ organization, isManager }: OrganizationStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['organization-stats', organization.id],
    queryFn: () => organizationService.getOrganizationStatistics(organization.id),
  });

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-md" />
        ))}
      </div>
    );
  }

  const statCards = [
    { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Managers', value: stats.totalManagers, icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Appointments', value: stats.appointmentsThisMonth, icon: Calendar, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Upcoming', value: stats.upcomingMeetings, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  if (isManager) {
    statCards.splice(2, 0, 
      { label: 'Pending Requests', value: stats.pendingRequests, icon: UserPlus, color: 'text-rose-500', bg: 'bg-rose-500/10' },
      { label: 'Invitations', value: stats.pendingInvitations, icon: Send, color: 'text-purple-500', bg: 'bg-purple-500/10' }
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${isManager ? '6' : '4'} gap-4`}>
      {statCards.map((stat, i) => (
        <div key={i} className="bg-card border border-border rounded-md p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
