import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from './cart.store';

export type OrderStatus = 'preparing' | 'done';

export interface OrderRecord {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: number;
}

interface OrderHistoryStore {
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  markOrderDone: (id: string) => void;
  clearHistory: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      markOrderDone: (id) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status: 'done' } : o)),
        })),
      clearHistory: () => set({ orders: [] }),
    }),
    {
      name: 'order-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
