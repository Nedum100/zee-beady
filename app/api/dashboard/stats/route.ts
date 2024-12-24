import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    // Get basic stats
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments();
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Calculate conversion rate
    const conversionRate = totalCustomers ? (totalOrders / totalCustomers) * 100 : 0;

    return NextResponse.json({
      totalSales,
      totalOrders,
      totalCustomers,
      conversionRate,
      monthlyGrowth: {
        sales: 0,
        orders: 0,
        customers: 0,
        conversion: 0
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch dashboard stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 