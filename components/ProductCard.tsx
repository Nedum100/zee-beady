"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart, CartItem } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  cloudinaryId?: string;
}

export const CATEGORIES = {
  "waist-beads": {
    title: "Waist Beads",
    description: "Beautiful waist beads collection"
  },
  "bracelets": {
    title: "Bracelets",
    description: "Handcrafted bracelets"
  },
  "necklaces": {
    title: "Necklaces",
    description: "Elegant necklaces"
  },
  "anklets": {
    title: "Anklets",
    description: "Beautiful anklets"
  },
  "bags": {
    title: "Bags",
    description: "Handcrafted bags"
  }
} as const;

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    };
    addItem(cartItem);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-muted-foreground mb-2">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ₦{formatPrice(product.price)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> 
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}