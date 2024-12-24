'use client';

import { useState, useEffect } from 'react';
import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export default function ProductsPage() {
  const { isLoading } = useAuthRedirect(true);
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stock: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product');

      toast({
        title: 'Success',
        description: 'Product added successfully',
      });

      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
        stock: 0,
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });

      fetchProducts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setIsAddingProduct(!isAddingProduct)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {isAddingProduct && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                required
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="p-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-muted-foreground mb-2">{product.description}</p>
            <p className="font-semibold mb-2">₦{product.price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mb-4">
              Stock: {product.stock}
            </p>
            <div className="flex justify-between">
              <Button onClick={() => handleDeleteProduct(product._id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

