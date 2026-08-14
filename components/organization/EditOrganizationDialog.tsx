'use client';

import { Organization } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, UploadCloud, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { organizationService } from '@/services/organizationService';
import { useQueryClient } from '@tanstack/react-query';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch('/api/imagekit/auth');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return { signature: data.signature, expire: data.expire, token: data.token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

interface EditOrganizationDialogProps {
  organization: Organization;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditOrganizationDialog({ organization, open, onOpenChange }: EditOrganizationDialogProps) {
  const [name, setName] = useState(organization.name);
  const [description, setDescription] = useState(organization.description || '');
  const [logoUrl, setLogoUrl] = useState(organization.logoUrl || '');
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (selectedFile) URL.revokeObjectURL(URL.createObjectURL(selectedFile));
    };
  }, [selectedFile]);

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await organizationService.updateOrganization(organization.id, { name, description, logoUrl });
      toast.success('Organization updated successfully');
      queryClient.invalidateQueries({ queryKey: ['organization', organization.id] });
      queryClient.invalidateQueries({ queryKey: ['my-organizations'] });
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update organization');
    } finally {
      setLoading(false);
    }
  };

  const handleManualUpload = async () => {
    if (!selectedFile) return;
    if (selectedFile.size > 2000000) {
      toast.error("File size must be less than 2MB");
      return;
    }
    
    setIsUploading(true);
    try {
      const authData = await authenticator();
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('publicKey', publicKey || '');
      formData.append('signature', authData.signature);
      formData.append('expire', authData.expire.toString());
      formData.append('token', authData.token);
      formData.append('fileName', `org-logo-${organization.id}`);
      formData.append('useUniqueFileName', 'true');

      const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      setLogoUrl(data.url);
      
      toast.success('Logo uploaded! Click Save Changes to apply.');
      setIsLogoDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Edit Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="space-y-3">
            <Label htmlFor="edit-name" className="text-muted-foreground">Organization Name</Label>
            <Input 
              id="edit-name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="bg-card border-border text-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="edit-description" className="text-muted-foreground">Description</Label>
            <Textarea 
              id="edit-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="flex min-h-[100px] w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm shadow-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-3">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center border border-border shrink-0 overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-full w-full object-cover rounded-md" />
                ) : (
                  <span className="text-muted-foreground text-xl font-bold">{(name || 'OR').substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              
              <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
                <DialogTrigger render={<Button type="button" variant="outline" disabled={isUploading} />}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  Upload New Logo
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Organization Logo</DialogTitle>
                    <DialogDescription>
                      Select a new image from your device to update your organization logo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors w-full overflow-hidden min-h-[250px]">
                    {!selectedFile ? (
                      <>
                        <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">Select an image to preview</p>
                        <Label htmlFor="manual-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                          Browse Files
                        </Label>
                        <input 
                          id="manual-upload"
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </>
                    ) : (
                      <>
                        <div className="relative h-32 w-32 rounded-md overflow-hidden mb-4 border-4 border-background shadow-sm">
                          <img src={previewUrl!} alt="Preview" className="object-cover h-full w-full" />
                        </div>
                        <p className="text-sm font-medium mb-4 truncate w-full text-center px-4">{selectedFile.name}</p>
                        
                        <div className="flex w-full gap-3">
                          <Button type="button" variant="outline" onClick={() => setSelectedFile(null)} disabled={isUploading} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="button" onClick={handleManualUpload} disabled={isUploading} className="flex-1">
                            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Proceed
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border text-foreground hover:bg-muted">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
