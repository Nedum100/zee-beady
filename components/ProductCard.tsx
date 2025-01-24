"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart, CartItem } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import ProductActions from "./ProductActions";

interface ProductCardProps {
  product: Product;
  onUpdate?: () => void;
  showActions?: boolean;
}

export default function ProductCard({ product, onUpdate, showActions = false }: ProductCardProps) {
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
    <Card className="relative">
      {showActions && (
        <div className="absolute top-2 right-2 z-10">
          <ProductActions product={product} onUpdate={onUpdate} />
        </div>
      )}
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
          <p className="text-sm text-gray-500">
            Stock: {product.stock}
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
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}