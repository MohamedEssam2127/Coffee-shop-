import { api } from '@/constants/api';
import { create } from 'zustand';
import Category from '@/constants/categoryType';

type CategoryStore = {
  categories: Category[];
  loadingCategories: boolean;
  fetchCategories: () => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loadingCategories: false,
  fetchCategories: async () => {
    try {
      set({ loadingCategories: true });

      const response = await api.get('/categories');
      set({
        categories: response.data.data,
        loadingCategories: false,
      });
    } catch (error) {
      console.log(error);
      set({
        loadingCategories: false,
      });
    }
  },
}));
