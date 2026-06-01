import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { Product } from '../services/api';

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetails: { product: Product };
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};