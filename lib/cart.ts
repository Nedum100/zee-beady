"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity === 0) {
            return {
              items: state.items.filter((i) => i._id !== itemId),
            };
          }
          return {
            items: state.items.map((i) =>
              i._id === itemId ? { ...i, quantity } : i
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      total: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);