import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Профіль</Typography>
      <Typography variant="body" style={{ marginTop: 10 }}>
        Сторінка в розробці (Заглушка)
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