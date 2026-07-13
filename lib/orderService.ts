import { api } from './api';

export interface PlaceOrderPayload {
  deliveryAddress: string;
  discountApplied: number;
}

export const orderService = {
  // GET /cart
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST /orders
  placeOrder: async (payload: PlaceOrderPayload) => {
    try {
      const response = await api.post('/orders', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
