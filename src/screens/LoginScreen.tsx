import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { useThemeColors } from '../store/themeStore'; 

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  
  const login = useAuthStore((state) => state.login);
  const colors = useThemeColors(); 

  const handleLogin = () => {
    let isValid = true;
    let newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Обов\'язкове поле';
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Обов\'язкове поле';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const fakeToken = 'fake-jwt-token-12345';
      login(fakeToken);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Typography variant="h1" style={styles.title}>Вхід</Typography>
        
        <Input 
          placeholder="Логін" 
          value={username} 
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
          }} 
          autoCapitalize="none"
          error={errors.username}
        />
        <Input 
          placeholder="Пароль" 
          value={password} 
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
          }} 
          secureTextEntry 
          error={errors.password}
        />
        
        <Button 
          title="Увійти" 
          onPress={handleLogin} 
          style={styles.button} 
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});