'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Users, TrendingUp, Activity, Package, CreditCard } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/card';

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    conversionRate: 0,
    monthlyGrowth: {
      sales: 0,
      orders: 0,
      customers: 0,
      conversion: 0
    }
  });

  useEffect(() => {
    console.log("Session status:", status); // Add this line for debugging
    console.log("Session data:", session); // Add this line for debugging
  }, [status, session]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    };
    
    if (status === 'authenticated' && session) {
      fetchStats();
    }
  }, [status, session]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Redirecting to login...</div>; // Show a message while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your store overview</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value={`₦${stats.totalSales.toLocaleString()}`}
            description={`${stats.monthlyGrowth.sales >= 0 ? '+' : ''}${stats.monthlyGrowth.sales}% from last month`}
            icon={<CreditCard className="h-6 w-6" />}
            trend={stats.monthlyGrowth.sales >= 0 ? 'up' : 'down'}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            description={`${stats.monthlyGrowth.orders >= 0 ? '+' : ''}${stats.monthlyGrowth.orders}% from last month`}
            icon={<Package className="h-6 w-6" />}
            trend={stats.monthlyGrowth.orders >= 0 ? 'up' : 'down'}
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toLocaleString()}
            description={`${stats.monthlyGrowth.customers >= 0 ? '+' : ''}${stats.monthlyGrowth.customers}% from last month`}
            icon={<Users className="h-6 w-6" />}
            trend={stats.monthlyGrowth.customers >= 0 ? 'up' : 'down'}
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate.toFixed(1)}%`}
            description={`${stats.monthlyGrowth.conversion >= 0 ? '+' : ''}${stats.monthlyGrowth.conversion}% from last month`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={stats.monthlyGrowth.conversion >= 0 ? 'up' : 'down'}
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
              <select className="px-3 py-2 border rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            {/* Add your chart component here */}
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              Chart coming soon...
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {/* Sample activity items - replace with real data */}
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <DashboardPage />
    </SessionProvider>
  );
}