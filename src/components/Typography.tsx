import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
}

export const Typography: React.FC<TypographyProps> = ({ variant = 'body', style, ...props }) => {
  return <Text style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  h2: { fontSize: 20, fontWeight: '600', color: colors.text },
  body: { fontSize: 16, color: colors.text },
  caption: { fontSize: 12, color: colors.textSecondary },
});