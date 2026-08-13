'use client';

import { useQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { useEffect } from 'react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { profile, setProfile } = useProfileStore();

  useEffect(() => {
    if (user && !profile) {
      // Initialize profile store with the fully loaded user object from auth
      setProfile(user as any);
    }
  }, [user, profile, setProfile]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-card p-6 md:p-8 rounded-md border border-border shadow-sm">
        {!profile ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ProfileForm initialData={profile} />
        )}
      </div>
    </div>
  );
}
