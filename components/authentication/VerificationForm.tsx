/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {api} from "@/lib/axios";

const verificationSchema = z.object({
  code: z.string().length(6, 'Verification code must be exactly 6 digits'),
});

type VerificationValues = z.infer<typeof verificationSchema>;

export function VerificationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { register, handleSubmit, formState: { errors } } = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema)
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: VerificationValues) => {
    try {
      setIsLoading(true);
      await authService.verifyEmail({...data, email: sessionStorage.getItem('signupEmail') || ''});
      toast.success(
        "Email verified successfully! You can now log in.",
      );
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    toast.success('Verification code resent');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <Input 
            id="code" 
            placeholder="Enter 6-digit code (e.g. 123456)" 
            maxLength={6}
            className="text-center text-lg tracking-widest"
            {...register('code')} 
            disabled={isLoading} 
          />
          {errors.code && <p className="text-sm text-red-500 text-center">{errors.code.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Email
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{' '}
          {countdown > 0 ? (
            <span className="text-muted-foreground">Resend in {countdown}s</span>
          ) : (
            <button onClick={handleResend} className="text-primary hover:underline">
              Resend code
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
