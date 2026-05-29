import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={[styles.input, style]} 
        placeholderTextColor={colors.textSecondary}
        {...props} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
});