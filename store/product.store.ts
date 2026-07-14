import { api } from '@/constants/api';
import { create } from 'zustand';
import Product from '@/constants/productType';

type ProductStore = {
  products: Product[];
  loading: boolean;

  fetchProducts: (params?: { category?: string }) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  fetchProducts: async (params) => {
    try {
      set({ loading: true });

      const response = await api.get('/products', {
        params: {
          category: params?.category,
        },
      });
      set({
        products: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({
        loading: false,
      });
    }
  },
}));
