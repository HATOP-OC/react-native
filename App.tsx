import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TabNavigator } from '@/navigation/TabNavigator';
import { LoginScreen } from '@/screens/LoginScreen';
import { CustomToast } from '@/components/CustomToast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuthStore } from '@/store/authStore';
import { useThemeColors, ThemeColors } from '@/store/themeStore';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 60 * 24, 
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

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
      <PersistQueryClientProvider 
        client={queryClient} 
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <SafeAreaProvider>
          <ErrorBoundary>
            <NavigationContainer>
              {token ? <TabNavigator /> : <LoginScreen />}
            </NavigationContainer>
            <CustomToast />
          </ErrorBoundary>
        </SafeAreaProvider>
      </PersistQueryClientProvider>
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