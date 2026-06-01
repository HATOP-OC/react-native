import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColors } from '../store/themeStore';

interface InputProps extends TextInputProps {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ style, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <TextInput 
        style={[
          styles.input, 
          { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
          isFocused && { borderColor: colors.primary },
          error ? { borderColor: colors.error } : null,
          style
        ]} 
        placeholderTextColor={colors.textSecondary}
        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        {...props} 
      />
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8, width: '100%' },
  input: { borderWidth: 1, borderRadius: 8, padding: 16, fontSize: 16, width: '100%' },
  errorText: { fontSize: 12, marginTop: 4, marginLeft: 4 }
});