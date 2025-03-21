'use client';

import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';

function AdminContent() {
  const { isLoading } = useAuthRedirect(true);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (isLoading) {
    return <div className="text-gray-900 dark:text-gray-100">Loading...</div>;
  }

  // Redirect non-admin users
  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
  }

  const adminActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: <Plus className="h-6 w-6" />,
      href: '/admin/add-product',
      color: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
    },
    {
      title: 'View Products',
      description: 'View and manage all products',
      icon: <Package className="h-6 w-6" />,
      href: '/admin/products',
      color: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {adminActions.map((action) => (
            <Card 
              key={action.title}
              className="p-6 hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800"
              onClick={() => router.push(action.href)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full text-white ${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{action.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<div className="text-gray-900 dark:text-gray-100">Loading...</div>}>
        <AdminContent />
      </Suspense>
    </div>
  );
}
