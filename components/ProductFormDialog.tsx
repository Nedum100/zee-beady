"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  productForm: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
  };
  setProductForm: (value: any) => void;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  productForm,
  setProductForm,
}: ProductFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-lg font-bold mb-4">Add New Product</h3>
          
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full mb-4 rounded-md"
            value={productForm.name}
            onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, name: e.target.value }))}
          />

          <textarea
            placeholder="Product Description"
            className="border p-2 w-full mb-4 rounded-md"
            value={productForm.description}
            onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, description: e.target.value }))}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              placeholder="Price (₦)"
              className="border p-2 w-full rounded-md"
              value={productForm.price}
              onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            />

            <input
              type="number"
              placeholder="Stock"
              className="border p-2 w-full rounded-md"
              value={productForm.stock}
              onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 w-full mb-4 rounded-md"
            value={productForm.imageUrl}
            onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, imageUrl: e.target.value }))}
          />

          <select
            className="border p-2 w-full mb-4 rounded-md"
            value={productForm.category}
            onChange={(e) => setProductForm((prev: typeof productForm) => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select Category</option>
            <option value="waist-beads">Waist Beads</option>
            <option value="bracelets">Bracelets</option>
            <option value="necklaces">Necklaces</option>
            <option value="anklets">Anklets</option>
            <option value="bags">Bags</option>
          </select>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              className="px-4 py-2"
            >
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 