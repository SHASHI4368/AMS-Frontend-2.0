'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { profileService } from '@/services/profileService';
import { useProfileStore } from '@/store/profileStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, UploadCloud, Check, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Profile } from '@/types';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch('/api/imagekit/auth');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  timezone: z.string().optional(),
  avatarUrl: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm({ initialData }: { initialData: Profile }) {
  const { updateProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
    };
  }, [selectedFile]);

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const { register, handleSubmit, control, getValues, setValue, formState: { errors } } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      phoneNumber: initialData.phoneNumber || '',
      gender: initialData.gender || '',
      bio: initialData.bio || '',
      timezone: initialData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      avatarUrl: initialData.avatarUrl || '',
    }
  });

  const onSubmit = async (data: ProfileValues) => {
    try {
      setIsLoading(true);
      const updated = await profileService.updateProfile(data);
      updateProfile(updated);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
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
      formData.append('fileName', `avatar-${initialData.id}`);
      formData.append('useUniqueFileName', 'true');

      const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      setValue('avatarUrl', data.url, { shouldDirty: true });
      const currentData = getValues();
      const updated = await profileService.updateProfile(currentData);
      updateProfile(updated);
      toast.success('Avatar updated successfully');
      setIsAvatarDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
          <AvatarImage src={initialData.avatarUrl} />
          <AvatarFallback className="text-2xl">{initialData.firstName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
            <DialogTrigger render={<Button variant="outline" disabled={isUploading} />}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
              Change Picture
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Profile Picture</DialogTitle>
                <DialogDescription>
                  Select a new image from your device to update your profile avatar.
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
                    <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl!} alt="Preview" className="object-cover h-full w-full" />
                    </div>
                    <p className="text-sm font-medium mb-4 truncate w-full text-center px-4">{selectedFile.name}</p>
                    
                    <div className="flex w-full gap-3">
                      <Button variant="outline" onClick={() => setSelectedFile(null)} disabled={isUploading} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleManualUpload} disabled={isUploading} className="flex-1">
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                        Proceed
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 2MB max.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register('firstName')} disabled={isLoading} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register('lastName')} disabled={isLoading} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="space-y-3">
            <Label>Email</Label>
            <Input value={initialData.email} disabled className="bg-background text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" {...register('phoneNumber')} disabled={isLoading} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="timezone">Timezone</Label>
            <Controller
              control={control}
              name="timezone"
              render={({ field }) => (
                <Popover open={isTimezoneOpen} onOpenChange={setIsTimezoneOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between h-12 px-4 font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isLoading}
                      />
                    }
                  >
                    <span className="truncate">
                      {field.value ? field.value.replace(/_/g, ' ') : "Select timezone"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent className="w-[--anchor-width] p-0 rounded-md" align="start">
                    <Command>
                      <CommandInput placeholder="Search timezone..." />
                      <CommandList>
                        <CommandEmpty>No timezone found.</CommandEmpty>
                        <CommandGroup>
                          {Intl.supportedValuesOf('timeZone').map((tz) => (
                            <CommandItem
                              key={tz}
                              value={tz}
                              onSelect={() => {
                                field.onChange(tz);
                                setIsTimezoneOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 shrink-0",
                                  field.value === tz ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="truncate">{tz.replace(/_/g, ' ')}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="bio">Bio</Label>
          <textarea 
            id="bio"
            {...register('bio')}
            disabled={isLoading}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us a little about yourself"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
}
