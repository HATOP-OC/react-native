import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // <--- Імпортуємо Toast
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { useThemeColors, ThemeColors } from '../store/themeStore';
import { useCartStore } from '../store/cartStore';
import { useProfileStore, UserProfile } from '../store/profileStore';
import { CartItemCard } from '../components/CartItemCard';
import { CheckoutModal } from '../components/CheckoutModal';

export const CartScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { profile, updateProfile, addOrder } = useProfileStore();
  
  const [isModalVisible, setModalVisible] = useState(false);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (data: UserProfile) => {
    updateProfile(data);
    const newOrder = { 
      id: Math.random().toString(36).substr(2, 9), 
      date: new Date().toISOString(), 
      items: [...items], 
      total: totalPrice 
    };
    addOrder(newOrder);
    clearCart();
    setModalVisible(false);
    
    Toast.show({
      type: 'success',
      text1: 'Успіх!',
      text2: 'Замовлення оформлено. Товари додано в твій профіль.',
      position: 'top',
      visibilityTime: 4000,
    });
  };

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
        renderItem={({ item }) => (
          <CartItemCard 
            item={item} 
            onRemove={removeFromCart} 
            onUpdateQuantity={updateQuantity} 
          />
        )} 
        contentContainerStyle={styles.list} 
      />
      
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Typography variant="h2">Сума:</Typography>
          <Typography variant="h1" style={styles.totalPriceText}>${totalPrice.toFixed(2)}</Typography>
        </View>
        <Button title="Оформити замовлення" onPress={() => setModalVisible(true)} />
      </View>

      <CheckoutModal 
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCheckoutSubmit}
        defaultValues={profile || { name: '', phone: '', address: '' }}
      />
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  emptyText: { marginTop: 20 },
  list: { padding: 16 },
  footer: { padding: 20, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalPriceText: { color: colors.primary },
});