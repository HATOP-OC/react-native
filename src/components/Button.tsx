import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { useThemeColors } from '../store/themeStore';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; 
}

export const Button: React.FC<ButtonProps> = ({ title, style, textStyle, ...props }) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});