import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    await connectToDatabase();
    
    // Normalize the category name
    let category = params.category;
    
    // Map singular to plural if needed
    const categoryMap: { [key: string]: string } = {
      'necklace': 'necklaces',
      'anklet': 'anklets',
      'bracelet': 'bracelets'
    };

    if (categoryMap[category]) {
      category = categoryMap[category];
    }

    console.log('Fetching products for category:', category); // Debug log

    const products = await Product.find({ category: category });
    
    console.log('Found products:', products); // Debug log

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 