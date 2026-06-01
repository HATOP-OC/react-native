import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useThemeColors, useThemeStore } from '../store/themeStore';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const colors = useThemeColors();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
        
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
            <Ionicons 
              name={isDark ? 'sunny' : 'moon'} 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Товари' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Кошик' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профіль' }} />
    </Tab.Navigator>
  );
};