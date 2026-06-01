import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { useThemeColors } from '../store/themeStore';
import { useCartStore, CartItem } from '../store/cartStore';
import { useProfileStore, UserProfile } from '../store/profileStore';

type ThemeColors = ReturnType<typeof useThemeColors>;

export const CartScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { profile, updateProfile, addOrder } = useProfileStore();
  
  const [isModalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserProfile>({
    defaultValues: profile || { name: '', phone: '', address: '' },
  });

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const onSubmit = (data: UserProfile) => {
    updateProfile(data);
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: [...items],
      total: totalPrice,
    };
    
    addOrder(newOrder);
    clearCart();
    setModalVisible(false);
    reset(data);
    
    Alert.alert(
      "Успіх!",
      "Замовлення оформлено. Товари додано в профіль.",
      [{ text: "ОК" }]
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.itemDetails}>
        <Typography variant="body" numberOfLines={2} style={styles.title}>{item.title}</Typography>
        <Typography variant="h2" style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Typography>
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
          <Typography variant="h1" style={styles.totalPriceText}>${totalPrice.toFixed(2)}</Typography>
        </View>
        <Button title="Оформити замовлення" onPress={() => setModalVisible(true)} />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView 
          style={styles.modalOverlay} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Typography variant="h2">Оформлення замовлення</Typography>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Controller
                control={control}
                rules={{ 
                  required: 'Ім\'я обов\'язкове',
                  minLength: { value: 2, message: 'Мінімум 2 символи' }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, { color: colors.text, borderColor: errors.name ? '#FF3B30' : colors.border }]}
                      placeholder="Ваше ім'я"
                      placeholderTextColor={colors.textSecondary}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.name && <Typography variant="caption" style={styles.errorText}>{errors.name.message}</Typography>}
                  </>
                )}
                name="name"
              />

              <Controller
                control={control}
                rules={{ 
                  required: 'Телефон обов\'язковий',
                  pattern: { value: /^[0-9]{10,14}$/, message: 'Введіть коректний номер (тільки цифри)' }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, { color: colors.text, borderColor: errors.phone ? '#FF3B30' : colors.border }]}
                      placeholder="Телефон (напр. 380991234567)"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.phone && <Typography variant="caption" style={styles.errorText}>{errors.phone.message}</Typography>}
                  </>
                )}
                name="phone"
              />

              <Controller
                control={control}
                rules={{ required: 'Адреса обов\'язкова' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={[styles.input, { color: colors.text, borderColor: errors.address ? '#FF3B30' : colors.border }]}
                      placeholder="Місто, Відділення НП"
                      placeholderTextColor={colors.textSecondary}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.address && <Typography variant="caption" style={styles.errorText}>{errors.address.message}</Typography>}
                  </>
                )}
                name="address"
              />

              <Button title="Підтвердити" onPress={handleSubmit(onSubmit)} style={{ marginTop: 25 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  emptyText: { marginTop: 20 },
  list: { padding: 16 },
  cartItem: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
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
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 10, padding: 14, fontSize: 16, marginTop: 15, backgroundColor: colors.background },
  errorText: { color: '#FF3B30', marginTop: 5, marginLeft: 5, fontSize: 12 },
});