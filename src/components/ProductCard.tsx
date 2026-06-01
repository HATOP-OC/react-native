import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Typography } from './Typography';
import { useThemeColors } from '../store/themeStore';
import { Product } from '../services/api';
import { HomeStackParamList } from '../navigation/HomeStack';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const colors = useThemeColors();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: colors.surface, borderColor: colors.border }
      ]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Typography variant="body" numberOfLines={2} style={styles.title}>
          {product.title}
        </Typography>
        <Typography variant="caption" style={styles.category}>
          {product.category}
        </Typography>
        <Typography variant="h2" style={[styles.price, { color: colors.primary }]}>
          ${product.price.toFixed(2)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    height: 40,
    fontSize: 14,
    fontWeight: '500',
  },
  category: {
    marginTop: 4,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});