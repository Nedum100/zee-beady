"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products?: Product[];
  onUpdate?: () => void;
  showActions?: boolean;
  searchQuery?: string;
}

export default function ProductGrid({ 
  products = [], 
  onUpdate: fetchProducts,
  showActions = false,
  searchQuery
}: ProductGridProps) {
  // Filter products if searchQuery exists
  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onUpdate={fetchProducts}
          showActions={showActions}
        />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
}