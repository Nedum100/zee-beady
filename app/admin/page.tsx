'use client';

import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { useAuth } from '@/lib/auth/AuthContext';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Card } from '@/components/ui/card';
import { Shield, AlertTriangle, PlusCircle, Trash, Edit3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const { isLoading } = useAuthRedirect(true);
  const { user } = useAuth();

  // Add the console log here to check the user's role and data
  console.log('User:', user);

  const [products, setProducts] = useState<
    { id: string; name: string; description: string; price: number; imageUrl: string; category: string; stock: number }[]
  >([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stock: 0,
  });

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          cache: 'no-store',
        });
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(Array.isArray(data.products) ? data.products.map((p: any) => ({ ...p, id: p._id })) : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product functionality
  const handleAddProduct = async () => {
    if (!isFormValid()) return;

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) throw new Error('Failed to add product');

      const data = await response.json();
      setProducts((prev) => [...prev, { ...data, id: data._id }]);
      resetForm();
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Edit product functionality
  const handleEditProduct = async () => {
    if (!isFormValid()) return;

    try {
      const response = await fetch(`/api/products/${currentProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) throw new Error('Failed to edit product');

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product.id === currentProductId ? { ...updatedProduct, id: updatedProduct._id } : product))
      );
      resetForm();
      setIsEditingProduct(false);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  // Delete product functionality
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Helper Functions
  const isFormValid = () => {
    const { name, price, imageUrl } = productForm;
    if (!name || price <= 0 || !imageUrl) {
      alert('Name, Price, and Image URL are required.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
      stock: 0,
    });
    setCurrentProductId(null);
  };

  const openEditModal = (product: any) => {
    setProductForm(product);
    setCurrentProductId(product.id);
    setIsEditingProduct(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="mt-2 text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-dark transition"
          >
            <PlusCircle className="h-5 w-5" />
            Add Product
          </button>
        </div>

        {isProductsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition"
                  >
                    <Edit3 className="h-5 w-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 transition"
                  >
                    <Trash className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {(isAddingProduct || isEditingProduct) && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-lg font-bold mb-4">
                {isAddingProduct ? 'Add New Product' : 'Edit Product'}
              </h3>
              <input
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                className="border p-2 w-full mb-4"
              />
              <textarea
                placeholder="Product Description"
                value={productForm.description}
                onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                className="border p-2 w-full mb-4"
              />
              <input
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) => setProductForm((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={productForm.imageUrl}
                onChange={(e) => setProductForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Category"
                value={productForm.category}
                onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                className="border p-2 w-full mb-4"
              />
              <input
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm((prev) => ({ ...prev, stock: parseInt(e.target.value, 10) || 0 }))}
                className="border p-2 w-full mb-4"
              />

              <div className="flex justify-between">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 rounded-md shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={isAddingProduct ? handleAddProduct : handleEditProduct}
                  className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-dark transition"
                >
                  {isAddingProduct ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
