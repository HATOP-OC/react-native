import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TabNavigator } from './src/navigation/TabNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import { useAuthStore } from './src/store/authStore';
import { useThemeColors } from './src/store/themeStore';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

const queryClient = new QueryClient();

export default function App() {
  const { token, isLoading, checkToken } = useAuthStore();
  const colors = useThemeColors();

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    const styles = getStyles(colors);
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            {token ? <TabNavigator /> : <LoginScreen />}
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
});