"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

const categories = [
  { value: 'waist-beads', label: 'Waist Beads' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'anklets', label: 'Anklets' },
  { value: 'bags', label: 'Bags' }
];

export default function AddProduct() {
  const router = useRouter();
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "waist-beads",
    imageUrl: "",
    stock: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      handleError()
    }
  };

  const handleError = () => {
    toast({
      title: "Error",
      description: "Failed to add product",
      className: "bg-destructive text-destructive-foreground"
    })
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Product description"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
