import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { CartItem } from '../store/cartStore';
import { ThemeColors, useThemeColors } from '../store/themeStore';
import { Typography } from './Typography';

interface Props {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, amount: number) => void;
}



export const CartItemCard: React.FC<Props> = ({ item, onRemove, onUpdateQuantity }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => onRemove(item.id)}>
      <Ionicons name="trash" size={24} color="#FFF" />
      <Typography variant="caption" style={styles.deleteText}>Видалити</Typography>
    </TouchableOpacity>
  );

  return (
    <View style={styles.swipeableWrapper}>
      <ReanimatedSwipeable renderRightActions={renderRightActions} friction={2}>
        <View style={styles.cartItem}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.itemDetails}>
            <Typography variant="body" numberOfLines={2} style={styles.title}>{item.title}</Typography>
            <Typography variant="h2" style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Typography>
            <View style={styles.controlsRow}>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => onUpdateQuantity(item.id, -1)} style={styles.circleBtn}>
                  <Ionicons name="remove" size={16} color={colors.text} />
                </TouchableOpacity>
                <Typography variant="body" style={styles.quantityText}>{item.quantity}</Typography>
                <TouchableOpacity onPress={() => onUpdateQuantity(item.id, 1)} style={styles.circleBtn}>
                  <Ionicons name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ReanimatedSwipeable>
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  swipeableWrapper: { marginBottom: 16 },
  cartItem: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border },
  imageContainer: { width: 80, height: 80, backgroundColor: '#FFF', borderRadius: 8, padding: 5 },
  image: { width: '100%', height: '100%' },
  itemDetails: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '500' },
  price: { color: colors.primary, marginTop: 4 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  circleBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  deleteAction: { backgroundColor: '#FF3B30', justifyContent: 'center', alignItems: 'center', width: 80, height: '100%', borderRadius: 12, marginLeft: 10 },
  deleteText: { color: '#FFF', marginTop: 4 },
});