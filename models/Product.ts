import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  // stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
  },
  // stock: {
  //   type: Number,
  //   required: [true, 'Please provide stock quantity'],
  //   min: [0, 'Stock cannot be negative'],
  // },
}, {
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;