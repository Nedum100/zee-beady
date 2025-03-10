'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { Suspense } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  cloudinaryId: string;
}

function ProductsContent() {
  const { isLoading: authLoading } = useAuthRedirect(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading || authLoading) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
        <Button 
          onClick={() => router.push('/admin/add-product')}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="relative bg-white dark:bg-[#111827] rounded-lg shadow-md transition-colors duration-200 border border-gray-200 dark:border-gray-800"
          >
            <ProductCard product={product} />
            <div className="absolute top-2 right-2">
              <ProductActions product={product} onUpdate={fetchProducts} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<div className="text-gray-900 dark:text-white">Loading...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}