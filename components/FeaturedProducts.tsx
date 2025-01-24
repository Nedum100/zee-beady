"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function FeaturedProducts() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <Button 
        onClick={() => router.push('/products')}
        className="mb-4"
      >
        View All Products
      </Button>
    </div>
  );
}