'use client';

import { Organization } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export function OrganizationSettings({ organization }: { organization: Organization }) {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const handleDelete = () => {
    toast.error('Are you sure you want to delete this organization?', {
      action: {
        label: 'Confirm',
        onClick: () => toast.success('Organization deleted (dummy)')
      }
    });
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">


      {/* Appointment Policy */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Appointment Policy</h3>
          <p className="text-sm text-muted-foreground">Configure how meetings are scheduled.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Manager Approval Required</p>
              <p className="text-sm text-muted-foreground">Only managers can approve join requests and meeting requests from outside.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Allow Cross-Team Meetings</p>
              <p className="text-sm text-muted-foreground">Members can book meetings with users outside this organization.</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="grid gap-2 pt-2">
            <Label>Default Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="h-11 px-8"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
      </div>

      {/* Danger Zone */}
      <section className="mt-16 border border-destructive/20 bg-destructive/5 rounded-md p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              These actions are irreversible. Please be certain before proceeding.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-t border-destructive/10 pt-4">
                <div>
                  <p className="font-medium text-foreground">Transfer Ownership</p>
                  <p className="text-sm text-muted-foreground">Transfer this organization to another manager.</p>
                </div>
                <Button variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10">Transfer</Button>
              </div>

              <div className="flex items-center justify-between border-t border-destructive/10 pt-4">
                <div>
                  <p className="font-medium text-foreground">Delete Organization</p>
                  <p className="text-sm text-muted-foreground">Permanently delete this organization and all its data.</p>
                </div>
                <Button variant="destructive" onClick={handleDelete}>Delete Organization</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
