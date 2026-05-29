import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../components/Typography';
import { useThemeColors } from '../store/themeStore';

export const CartScreen = () => {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h1">Кошик</Typography>
      <Typography variant="body" style={{ marginTop: 10 }}>
        Тут будуть додані товари
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});