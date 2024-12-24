import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function getProductsByCategory(category: string) {
  await connectDB();  // Using your cached connection
  const products = await Product.find({ category: category.toLowerCase() });
  return JSON.parse(JSON.stringify(products || []));
} 