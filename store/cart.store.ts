import { create } from 'zustand';
import { api } from '@/lib/api';
import Product from '@/constants/productType';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CartStore {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, size: string, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/cart');
      const data = response.data.data || response.data;
      set({ cart: data, loading: false });
    } catch (err: any) {
      console.log('Fetch Cart Error:', err);
      set({ error: err.message || 'Failed to fetch cart', loading: false });
    }
  },

  addToCart: async (productId, size, quantity) => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart', {
        product: productId,
        size,
        quantity,
      });
      // Refresh cart
      const response = await api.get('/cart');
      const data = response.data.data || response.data;
      set({ cart: data, loading: false });
    } catch (err: any) {
      console.log('Add to Cart Error:', err);
      set({ error: err.message || 'Failed to add item to cart', loading: false });
      throw err;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      await api.put(`/cart/${itemId}`, { quantity });
      const response = await api.get('/cart');
      const data = response.data.data || response.data;
      set({ cart: data });
    } catch (err: any) {
      console.log('Update Quantity Error:', err);
      set({ error: err.message || 'Failed to update quantity' });
    }
  },

  removeItem: async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      const response = await api.get('/cart');
      const data = response.data.data || response.data;
      set({ cart: data });
    } catch (err: any) {
      console.log('Remove Item Error:', err);
      set({ error: err.message || 'Failed to remove item' });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete('/cart');
      set({ cart: null, loading: false });
    } catch (err: any) {
      console.log('Clear Cart Error:', err);
      set({ error: err.message || 'Failed to clear cart', loading: false });
    }
  },
}));
