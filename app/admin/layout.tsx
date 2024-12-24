'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect non-admin users to the home page
  useEffect(() => {
    // Ensure the redirect only happens after loading is complete
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/'); // Redirect to home if user is not admin
    }
  }, [user, isLoading, router]); // Run effect when user or isLoading changes

  // Display loading screen while user data is being fetched
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If user is not an admin, render nothing (already redirected)
  if (!user || user.role !== 'admin') {
    return null;
  }

  // Render admin layout if user is an admin
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6">
        <nav className="mb-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
        </nav>
        {children} {/* Render children (admin page content) */}
      </div>
    </div>
  );
}
