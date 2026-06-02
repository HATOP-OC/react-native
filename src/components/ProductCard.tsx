import { HomeStackParamList } from '@/navigation/HomeStack';
import { Product } from '@/services/api';
import { ThemeColors, useThemeColors } from '@/store/themeStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Typography } from './Typography';

interface ProductCardProps {
  product: Product;
  index: number; 
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; 

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400).springify()}>
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProductDetails', { product })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>
        
        <View style={styles.infoContainer}>
          <Typography variant="body" numberOfLines={2} style={styles.title}>{product.title}</Typography>
          <Typography variant="caption" style={styles.category}>{product.category}</Typography>
          <Typography variant="h2" style={styles.price}>${product.price.toFixed(2)}</Typography>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderColor: colors.border,
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
  imageContainer: { backgroundColor: '#FFFFFF', padding: 12, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 120 },
  infoContainer: { padding: 12 },
  title: { height: 40, fontSize: 14, fontWeight: '500' },
  category: { marginTop: 4, textTransform: 'uppercase', fontSize: 10, color: colors.textSecondary },
  price: { marginTop: 8, fontSize: 16, fontWeight: 'bold', color: colors.primary },
});