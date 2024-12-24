import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    const product = await Product.create({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category.toLowerCase(),
      imageUrl: data.imageUrl
    });
    
    return NextResponse.json({ message: 'Product created', product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}