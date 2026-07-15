import { api } from '@/constants/api';
import { create } from 'zustand';
import Product from '@/constants/productType';

type ProductStore = {
  products: Product[];
  loading: boolean;
  productLoading: boolean;
  product: Product | undefined;
  fetchProducts: (params?: { category?: string }) => Promise<void>;
  fetechProduct: (id: String) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  productLoading: false,
  product: undefined,
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
  fetechProduct: async (id) => {
    try {
      set({ productLoading: true });
      const response = await api.get(`/products/${id}`);
      set({ productLoading: false, product: response.data.data });
    } catch (error) {
      console.log(error);
      set({
        productLoading: false,
      });
    }
  },
}));
