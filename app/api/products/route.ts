import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { Session } from 'next-auth';
import { getToken } from "next-auth/jwt";
import { headers, cookies } from "next/headers";

// Get all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json({ products: products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Add type for the session user
interface CustomSession extends Session {
  user: {
    id: string;
    role: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Create new product
export async function POST(req: Request) {
  try {
    const token = await getToken({
      req: {
        headers: await headers(),
        cookies: await cookies(),
      } as any
    });

    if (!token?.role || token.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();
    console.log('Received data:', data); // Log the incoming data

    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'imageUrl', 'category', 'stock'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Your existing category validation
    const validCategories = ['waist-beads', 'bracelets', 'necklaces', 'anklets', 'bags'];
    if (!validCategories.includes(data.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: (error as Error).message },
      { status: 500 }
    );
  }
}