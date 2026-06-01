import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { useThemeColors } from '../store/themeStore';
import { useCartStore, CartItem } from '../store/cartStore';

export const CartScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  const { items, removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      
      <View style={styles.itemDetails}>
        <Typography variant="body" numberOfLines={2} style={styles.title}>
          {item.title}
        </Typography>
        <Typography variant="h2" style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
        
        <View style={styles.controlsRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.circleBtn}>
              <Ionicons name="remove" size={16} color={colors.text} />
            </TouchableOpacity>
            <Typography variant="body" style={styles.quantityText}>{item.quantity}</Typography>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.circleBtn}>
              <Ionicons name="add" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="cart-outline" size={80} color={colors.textSecondary} />
        <Typography variant="h2" style={styles.emptyText}>Кошик порожній</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Typography variant="h2">Сума:</Typography>
          <Typography variant="h1" style={styles.totalPriceText}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </View>
        <Button title="Оформити замовлення" onPress={() => console.log('Перехід до Checkout')} />
      </View>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  emptyText: { marginTop: 20 },
  list: { padding: 16 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: { width: 80, height: 80, backgroundColor: '#FFF', borderRadius: 8, padding: 5 },
  image: { width: '100%', height: '100%' },
  itemDetails: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '500' },
  price: { color: colors.primary, marginTop: 4 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  circleBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalPriceText: { color: colors.primary },
});