'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { profileService } from '@/services/profileService';
import { useProfileStore } from '@/store/profileStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, UploadCloud } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Profile } from '@/types';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  timezone: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm({ initialData }: { initialData: Profile }) {
  const { updateProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      phoneNumber: initialData.phoneNumber || '',
      gender: initialData.gender || '',
      bio: initialData.bio || '',
      timezone: initialData.timezone || 'UTC',
    }
  });

  const onSubmit = async (data: ProfileValues) => {
    try {
      setIsLoading(true);
      const updated = await profileService.updateProfile(initialData.id, data);
      updateProfile(updated);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await profileService.uploadAvatar(file);
      const updated = await profileService.updateProfile(initialData.id, { avatarUrl: url });
      updateProfile(updated);
      toast.success('Avatar updated successfully');
    } catch (error) {
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
          <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
            Change Picture
          </Label>
          <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={isUploading} />
          <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
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
            <Input id="timezone" {...register('timezone')} disabled={isLoading} placeholder="America/New_York" />
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
