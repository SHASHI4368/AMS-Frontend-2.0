import { Organization } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function OrganizationCard({ organization, onJoin }: { organization: Organization, onJoin: (org: Organization) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            {organization.logoUrl ? (
              <img src={organization.logoUrl} alt={organization.name} className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <CardTitle>{organization.name}</CardTitle>
            <CardDescription className="line-clamp-1">{organization.description || 'No description'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {organization.isMember ? (
            <span><strong className="text-foreground">{organization.memberCount || 1}</strong> {(organization.memberCount || 1) === 1 ? 'Member' : 'Members'}</span>
          ) : (
            <span>Members visible after joining</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {organization.isMember ? (
          <Link href={`/organizations/${organization.id}`} className="w-full">
            <Button className="w-full" variant="default">
              Open Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button className="w-full" variant="outline" onClick={() => onJoin(organization)}>
            Request to Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
