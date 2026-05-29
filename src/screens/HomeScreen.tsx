import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Список товарів</Typography>
      <Button title="Тестова кнопка" style={{ marginTop: 20 }} />
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