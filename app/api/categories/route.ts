import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const categories = [
      {
        id: "Bags",
        title: "Bags",
        description: "Discover our collection of handcrafted Bags in various colors and sizes.",
        imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1920&auto=format"
      },
      {
        id: "Waist Beads",
        title: "Waist Beads",
        description: "Explore our premium Waist Beads for elegant jewelry pieces.",
        imageUrl: "https://images.unsplash.com/photo-1619533394727-57d522857f89?q=80&w=1920&auto=format"
      },
      {
        id: "Necklace",
        title: "Necklace",
        description: "Browse our selection of natural Necklace for organic designs.",
        imageUrl: "https://images.unsplash.com/photo-1584891800774-5c3f1d2a328d?q=80&w=1920&auto=format"
      },
      {
        id: "Anklet",
        title: "Anklet",
        description: "Find the perfect Anklet for your contemporary jewelry.",
        imageUrl: "https://images.unsplash.com/photo-1619533394727-57d522857f89?q=80&w=1920&auto=format"
      }
    ];

    // Get product counts for each category
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category: category.id });
        return {
          ...category,
          productCount: count
        };
      })
    );

    return NextResponse.json(categoryCounts);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}