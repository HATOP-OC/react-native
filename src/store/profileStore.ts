import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from './cartStore';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

interface ProfileState {
  profile: UserProfile | null;
  orders: Order[];
  updateProfile: (data: UserProfile) => void;
  addOrder: (order: Order) => void;
  clearProfileData: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      orders: [],
      updateProfile: (data) => set({ profile: data }),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      clearProfileData: () => set({ profile: null, orders: [] }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);