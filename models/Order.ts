import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  total: Number,
  createdAt: { type: Date, default: Date.now },
  customerName: String,
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number
  }]
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
