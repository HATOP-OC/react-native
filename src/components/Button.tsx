import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useThemeColors } from '../store/themeStore';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, style, ...props }) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.primary }, style]} 
      activeOpacity={0.8} 
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }, 
});