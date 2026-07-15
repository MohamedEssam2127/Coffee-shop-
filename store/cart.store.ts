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
  items: CartItem[];
  totalPrice: number;
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

function parseCartResponse(responseData: any): Cart {
  const rawData = responseData.data || responseData;
  const items: CartItem[] = Array.isArray(rawData) ? rawData : rawData.items || [];

  const totalPrice = items.reduce((sum, item) => {
    const basePrice = item.product?.price || 0;
    const sizeObj = item.product?.sizes?.find((s: any) => s.size === item.size);
    const modifier = sizeObj?.priceModifier || 0;
    return sum + (basePrice + modifier) * item.quantity;
  }, 0);

  return { items, totalPrice };
}

function computeTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const basePrice = item.product?.price || 0;
    const sizeObj = item.product?.sizes?.find((s: any) => s.size === item.size);
    const modifier = sizeObj?.priceModifier || 0;
    return sum + (basePrice + modifier) * item.quantity;
  }, 0);
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/cart');
      const cart = parseCartResponse(response.data);
      set({ cart, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch cart', loading: false });
    }
  },

  addToCart: async (productId, size, quantity) => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart', { product: productId, size, quantity });
      const response = await api.get('/cart');
      const cart = parseCartResponse(response.data);
      set({ cart, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to add item to cart', loading: false });
      throw err;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    const previousCart = get().cart;

    if (previousCart) {
      const updatedItems = previousCart.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
      set({ cart: { items: updatedItems, totalPrice: computeTotalPrice(updatedItems) } });
    }

    try {
      await api.put(`/cart/${itemId}`, { quantity });
    } catch (err: any) {
      set({ cart: previousCart, error: err.message || 'Failed to update quantity' });
    }
  },

  removeItem: async (itemId) => {
    const previousCart = get().cart;

    if (previousCart) {
      const updatedItems = previousCart.items.filter((item) => item._id !== itemId);
      set({ cart: { items: updatedItems, totalPrice: computeTotalPrice(updatedItems) } });
    }

    try {
      await api.delete(`/cart/${itemId}`);
    } catch (err: any) {
      set({ cart: previousCart, error: err.message || 'Failed to remove item' });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete('/cart');
      set({ cart: null, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to clear cart', loading: false });
    }
  },
}));
