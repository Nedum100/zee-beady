import connectDB from '@/lib/db';
import Product from '@/models/Product'; // Adjust the import based on your project structure

export async function getProductsByCategory(category: string) {
  await connectDB();  // Using your cached connection
  const products = await Product.find({ category: category.toLowerCase() });
  return JSON.parse(JSON.stringify(products || []));
}

export async function getAllProducts() {
  return await Product.find();
}

export async function getProductById(id: string) {
  return await Product.findById(id);
}

export async function createProduct(data: any) {
  const product = new Product(data);
  return await product.save();
}

export async function updateProductById(id: string, data: any) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProductById(id: string) {
  return await Product.findByIdAndDelete(id);
}