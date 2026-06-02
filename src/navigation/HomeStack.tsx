import { HomeScreen } from '@/screens/HomeScreen';
import { ProductDetailsScreen } from '@/screens/ProductDetailsScreen';
import { Product } from '@/services/api';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetails: { product: Product };
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};