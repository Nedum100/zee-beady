'use client';

import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { LoginForm } from '@/components/auth/LoginForm';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const { isLoading } = useAuthRedirect(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-10 shadow-lg border border-gray-200 bg-white">
        <LoginForm />
      </Card>
    </div>
  );
}
