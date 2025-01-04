'use client';

import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { isLoading } = useAuthRedirect(true);
  const { data: session } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect non-admin users
  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Add your admin dashboard content here */}
    </div>
  );
}
