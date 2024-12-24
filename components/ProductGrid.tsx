"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  cloudinaryId: string;
  description: string;
  category: string;
  stock: number;
}

interface ProductGridProps {
  products?: Product[];
  onUpdate?: (category?: string, searchQuery?: string) => Promise<void>;
  showActions?: boolean;
}

export default function ProductGrid({ 
  products = [], 
  onUpdate: fetchProducts,
  showActions = false 
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onUpdate={fetchProducts}
          showActions={showActions}
        />
      ))}
    </div>
  );
}