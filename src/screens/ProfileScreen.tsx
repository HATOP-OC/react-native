import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../components/Typography';
import { useThemeColors } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';

export const ProfileScreen = () => {
  const colors = useThemeColors();
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h1" style={{ marginBottom: 30 }}>Мій Профіль</Typography>
      
      <Button title="Вийти" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});