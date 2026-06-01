import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TabNavigator } from './src/navigation/TabNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import { CustomToast } from './src/components/CustomToast';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useAuthStore } from './src/store/authStore';
import { useThemeColors, ThemeColors } from './src/store/themeStore';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

const queryClient = new QueryClient();

export default function App() {
  const { token, isLoading, checkToken } = useAuthStore();
  const colors = useThemeColors();

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    const loaderStyles = getLoaderStyles(colors);
    return (
      <View style={loaderStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ErrorBoundary>
            <NavigationContainer>
              {token ? <TabNavigator /> : <LoginScreen />}
            </NavigationContainer>
            <CustomToast />
          </ErrorBoundary>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const getLoaderStyles = (colors: ThemeColors) => StyleSheet.create({
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.background 
  },
});