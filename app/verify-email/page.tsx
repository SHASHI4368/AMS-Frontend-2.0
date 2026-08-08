import { VerificationForm } from '@/components/authentication/VerificationForm';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Verify your email</h1>
          <p className="text-muted-foreground mt-2">We've sent a 6-digit verification code to your email address.</p>
        </div>
        <VerificationForm />
      </div>
    </div>
  );
}
