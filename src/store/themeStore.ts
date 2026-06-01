import { create } from 'zustand';
import { lightColors, darkColors } from '../theme/colors';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false, 
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

export const useThemeColors = () => {
  const isDark = useThemeStore((state) => state.isDark);
  return isDark ? darkColors : lightColors;
};

export type ThemeColors = ReturnType<typeof useThemeColors>;