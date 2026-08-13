'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUIStore } from '@/store/uiStore';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { theme, setTheme } = useUIStore();

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage application preferences.</p>
      </div>

      <div className="bg-card p-6 md:p-8 rounded-md border border-border shadow-sm space-y-8">
        
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground border-b pb-2">Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(val: any) => setTheme(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground border-b pb-2">Calendar Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Default Slot Duration (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 mins</SelectItem>
                  <SelectItem value="30">30 mins</SelectItem>
                  <SelectItem value="60">60 mins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Working Hours</Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="09:00">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 AM</SelectItem>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select defaultValue="17:00">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                    <SelectItem value="18:00">06:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
