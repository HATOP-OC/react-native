import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

export const CartScreen = () => {
  return (
    <View style={styles.container}>
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
    backgroundColor: colors.background,
  },
});