import { Typography } from '@/components/Typography';
import { HomeStackParamList } from '@/navigation/HomeStack';
import { useCartStore } from '@/store/cartStore';
import { ThemeColors, useThemeColors } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

type DetailsRouteProp = RouteProp<HomeStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const colors = useThemeColors();
  const styles = getStyles(colors);
  
  const { product } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show({
      type: 'success',
      text1: 'Додано',
      text2: product.title,
      position: 'top',
      visibilityTime: 2500, 
    });
  };

  const renderStars = (rate: number) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={18} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={18} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={18} color="#FFD700" />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.detailsContainer}>
          <Typography variant="h1" style={styles.title}>{product.title}</Typography>
          
          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars(product.rating.rate)}</View>
            <Typography variant="caption" style={styles.ratingText}>
              ({product.rating.count} відгуків)
            </Typography>
          </View>

          <Typography variant="h1" style={styles.price}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="h2" style={styles.descriptionTitle}>Опис товару</Typography>
          <Typography variant="body" style={styles.descriptionText}>
            {product.description}
          </Typography>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleAddToCart}
            style={styles.cartButton}
          >
            <Ionicons name="cart-outline" size={24} color="#FFF" />
            <Typography variant="body" style={styles.cartButtonText}>Додати в кошик</Typography>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: { backgroundColor: '#FFF', width: '100%', height: 350, padding: 40, paddingTop: 80, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  image: { width: '100%', height: '100%' },
  detailsContainer: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 22, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  stars: { flexDirection: 'row' },
  ratingText: { color: colors.textSecondary, marginLeft: 8 },
  price: { fontSize: 28, marginBottom: 20, color: colors.primary },
  descriptionTitle: { marginBottom: 10 },
  descriptionText: { color: colors.textSecondary, lineHeight: 22 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
  cartButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, backgroundColor: colors.primary },
  cartButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
});