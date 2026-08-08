import { Organization } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users } from 'lucide-react';

export function OrganizationCard({ organization, onJoin }: { organization: Organization, onJoin: (id: string) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-primary rounded-lg">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>{organization.name}</CardTitle>
            <CardDescription className="line-clamp-1">{organization.description || 'No description'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>Members visible after joining</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" onClick={() => onJoin(organization.id)}>
          Request to Join
        </Button>
      </CardFooter>
    </Card>
  );
}
