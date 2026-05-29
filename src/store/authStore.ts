import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: true, 

  login: async (newToken: string) => {
    await SecureStore.setItemAsync('userToken', newToken);
    set({ token: newToken });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    set({ token: null });
  },

  checkToken: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        set({ token: storedToken });
      }
    } catch (e) {
      console.error('Помилка читання токену', e);
    } finally {
      set({ isLoading: false });
    }
  },
}));