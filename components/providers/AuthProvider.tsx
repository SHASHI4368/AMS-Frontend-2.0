'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { Loader2 } from 'lucide-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          login(user);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [login, logout]);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
