"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";

interface Product {
  featured: any;
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  cloudinaryId: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          setError(`Error fetching products, status code: ${response.status}`);
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data)

       if (!data || !data.products) {
           setError("Error: API did not return data, or it does not have a products property")
           throw new Error("Error: API did not return data, or it does not have a products property");
        }

      if (!Array.isArray(data.products)) {
          setError("Error: API response `products` property is not an array");
          throw new Error("Data is not an array");
        }

        setProducts(data.products.filter((p: Product) => p.featured).slice(0, 4));
        setError(null)
      } catch (error: any) {
           setError(error?.message || "An unknown error occurred" );
          console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

   if (error) {
        return <div>{error}</div>
    }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${product.cloudinaryId}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">
                  ₦{product.price.toFixed(2)} {/* Display in Naira */}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <CheckoutButton />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}