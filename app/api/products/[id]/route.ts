import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';

// Get single product
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await Promise.resolve(params); // Await here
    try {
        await connectToDatabase();
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// Update product
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await Promise.resolve(params); // Await here
    try {
        const session = await getServerSession();
        const authHeader = request.headers.get('Authorization');
        const role = authHeader?.split(' ')[1];
        const productId = id;

        if (!session?.user || role !== 'admin') {
            console.log('Auth failed:', {
                hasUser: !!session?.user,
                role,
                sessionRole: session?.user?.role
            });
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        const data = await request.json();
        await connectToDatabase();

        const product = await Product.findByIdAndUpdate(
            productId,
            data,
            { new: true }
        );

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// Delete product
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
  const { id } = await Promise.resolve(params); // Await here
  try {
      const session = await getServerSession();
      const authHeader = request.headers.get('Authorization');
      const role = authHeader?.split(' ')[1];
      const productId = id;

      if (!session?.user || role !== 'admin') {
          console.log('Auth failed:', { session, role });
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      await connectToDatabase();
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}