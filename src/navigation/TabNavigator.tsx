import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Товари' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Кошик' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профіль' }} />
    </Tab.Navigator>
  );
};