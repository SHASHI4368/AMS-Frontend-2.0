import { SignupForm } from '@/components/authentication/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to manage your appointments</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
