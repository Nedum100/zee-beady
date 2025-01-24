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
        imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525352/zee_beady/bags/8_vhzrsl.jpg"
      },
      {
        id: "Waist Beads",
        title: "Waist Beads",
        description: "Explore our premium Waist Beads for elegant jewelry pieces.",
        imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1736857658/zee_beady/waist%20beads/Waist%20bead%203.jpg"
      },
      {
        id: "Necklace",
        title: "Necklace",
        description: "Browse our selection of natural Necklace for organic designs.",
        imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525354/zee_beady/necklaces/16_yd1a7x.jpg"
      },
      {
        id: "Anklet",
        title: "Anklet",
        description: "Find the perfect Anklet for your contemporary jewelry.",
        imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525354/zee_beady/anklets/13_ybirjp.jpg"
      },
      {
        id: "Bracelet",
        title: "Bracelet",
        description: "Find the bracelets for your contemporary use.",
        imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525349/zee_beady/bracelets/1_n6kads.jpg"
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