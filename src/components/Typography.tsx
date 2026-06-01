import { useThemeColors } from '@/store/themeStore';
import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
}

export const Typography: React.FC<TypographyProps> = ({ variant = 'body', style, ...props }) => {
  const colors = useThemeColors();

  const textStyle = {
    h1: { fontSize: 24, fontWeight: 'bold' as const, color: colors.text },
    h2: { fontSize: 20, fontWeight: '600' as const, color: colors.text },
    body: { fontSize: 16, color: colors.text },
    caption: { fontSize: 12, color: colors.textSecondary },
  };

  return <Text style={[textStyle[variant], style]} {...props} />;
};