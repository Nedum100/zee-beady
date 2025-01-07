'use client';

import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const { isLoading } = useAuthRedirect(true);
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect non-admin users
  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
  }

  const handleProductsView = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      router.push('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleProductsView}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          View Products
        </button>
        <button
          onClick={() => router.push('/admin/products/edit')}
          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-200"
        >
          Edit Products
        </button>
        <button
          onClick={() => router.push('/admin/products/delete')}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Delete Products
        </button>
      </div>
    </div>
  );
}
