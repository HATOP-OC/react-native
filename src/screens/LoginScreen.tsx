import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; 
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { useThemeColors } from '../store/themeStore';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const login = useAuthStore((state) => state.login);
  const colors = useThemeColors();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Помилка',
        text2: 'Введіть логін та пароль',
        position: 'top',
      });
      return;
    }
    login('fake-jwt-token-12345');
  };

  const handleBiometricAuth = async () => {
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Toast.show({
        type: 'info',
        text1: 'Увага',
        text2: 'Біометрія не налаштована. Додайте відбиток у налаштуваннях.',
      });
      return;
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Підтвердіть вхід',
      fallbackLabel: 'Використати пароль',
      cancelLabel: 'Скасувати',
    });
    
    if (auth.success) {
      login('biometric-jwt-token');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h1" style={{ marginBottom: 30 }}>Вхід</Typography>
      
      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      <Input 
        placeholder="Пароль" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      
      <Button title="Увійти" onPress={handleLogin} style={{ marginTop: 10 }} />

      {isBiometricSupported && (
        <TouchableOpacity
          style={[
            styles.bioButton, 
            { borderColor: colors.primary, backgroundColor: colors.surface }
          ]}
          onPress={handleBiometricAuth}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="finger-print" 
            size={24} 
            color={colors.primary} 
            style={styles.bioIcon} 
          />
          <Typography variant="body" style={[styles.bioText, { color: colors.primary }]}>
            Біометричний вхід
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
  },
  bioIcon: { marginRight: 10 },
  bioText: { fontSize: 16, fontWeight: 'bold' },
});