import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../services/api';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, amount: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({ items: items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
      updateQuantity: (id, amount) => {
        set({
          items: get().items.map((item) => {
            if (item.id === id) {
              const newQuantity = Math.max(1, item.quantity + amount);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);