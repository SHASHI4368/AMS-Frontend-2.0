'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { organizationService } from '@/services/organizationService';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';

export function CreateOrgDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (val: boolean) => void }) {
  const { user } = useAuthStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we would use the actual service. Using the mock for now.
      const newOrg = await organizationService.createOrganization(name, description, user?.id || 'u3');
      toast.success(`Organization ${newOrg.name} created!`);
      
      // Invalidate query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      queryClient.invalidateQueries({ queryKey: ['my-organizations'] });
      
      onOpenChange(false);
      setName('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Create Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-muted-foreground">Organization Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="Acme Corp" 
              className="bg-card border-border text-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="description" className="text-muted-foreground">Description</Label>
            <textarea 
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="flex min-h-[100px] w-full rounded-md border border-border bg-card px-4 py-3 text-sm shadow-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="What does your team do?"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border text-foreground hover:bg-muted">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
