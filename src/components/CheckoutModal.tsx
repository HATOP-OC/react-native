import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import * as Location from 'expo-location';
import { Typography } from './Typography';
import { Button } from './Button';
import { useThemeColors } from '../store/themeStore';
import { UserProfile } from '../store/profileStore';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: UserProfile) => void;
  defaultValues: UserProfile;
}

type ThemeColors = ReturnType<typeof useThemeColors>;

export const CheckoutModal: React.FC<Props> = ({ visible, onClose, onSubmit, defaultValues }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  const [isLocating, setIsLocating] = useState(false);

  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<UserProfile>({
    defaultValues,
  });

  React.useEffect(() => {
    if (visible) reset(defaultValues);
  }, [visible, defaultValues, reset]);

  const handleGetLocation = async () => {
    setIsLocating(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Помилка', 'Немає доступу до геолокації.');
        return;
      }
      
      let location = await Location.getLastKnownPositionAsync() || await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      if (!location) throw new Error('Location not found');

      let geocode = await Location.reverseGeocodeAsync(location.coords);
      if (geocode && geocode.length > 0) {
        const city = geocode[0].city || geocode[0].region || geocode[0].subregion || '';
        const street = geocode[0].street || geocode[0].name || '';
        const addr = `${city}, ${street}`.replace(/^, |, $/g, '').trim();
        setValue('address', addr || `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`);
      } else {
        setValue('address', `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`);
      }
    } catch (error) {
      console.warn('GPS Fetch Error:', error);
      Alert.alert('Помилка GPS', 'Не вдалося визначити локацію. Будь ласка, введіть адресу вручну.');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Typography variant="h2">Оформлення замовлення</Typography>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Controller control={control} rules={{ required: 'Ім\'я обов\'язкове', minLength: { value: 2, message: 'Мінімум 2 символи' } }} render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput style={[styles.input, { borderColor: errors.name ? '#FF3B30' : colors.border, color: colors.text }]} placeholder="Ваше ім'я" placeholderTextColor={colors.textSecondary} onBlur={onBlur} onChangeText={onChange} value={value} />
                {errors.name && <Typography variant="caption" style={styles.errorText}>{errors.name.message}</Typography>}
              </>
            )} name="name" />

            <Controller control={control} rules={{ required: 'Телефон обов\'язковий', pattern: { value: /^[0-9]{10,14}$/, message: 'Тільки цифри' } }} render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput style={[styles.input, { borderColor: errors.phone ? '#FF3B30' : colors.border, color: colors.text }]} placeholder="Телефон" keyboardType="numeric" placeholderTextColor={colors.textSecondary} onBlur={onBlur} onChangeText={onChange} value={value} />
                {errors.phone && <Typography variant="caption" style={styles.errorText}>{errors.phone.message}</Typography>}
              </>
            )} name="phone" />

            <View style={styles.geoRow}>
              <Controller control={control} rules={{ required: 'Адреса обов\'язкова' }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={[styles.input, { flex: 1, borderColor: errors.address ? '#FF3B30' : colors.border, color: colors.text }]} placeholder="Адреса доставки" placeholderTextColor={colors.textSecondary} onBlur={onBlur} onChangeText={onChange} value={value} />
              )} name="address" />
              <TouchableOpacity onPress={handleGetLocation} style={[styles.geoButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                {isLocating ? <ActivityIndicator size="small" color={colors.primary} /> : <Ionicons name="location" size={24} color={colors.primary} />}
              </TouchableOpacity>
            </View>
            {errors.address && <Typography variant="caption" style={styles.errorText}>{errors.address.message}</Typography>}

            <Button title="Підтвердити" onPress={handleSubmit(onSubmit)} style={{ marginTop: 25 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 10, padding: 14, fontSize: 16, marginTop: 15, backgroundColor: colors.background },
  errorText: { color: '#FF3B30', marginTop: 5, marginLeft: 5, fontSize: 12 },
  geoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  geoButton: { marginTop: 15, height: 50, width: 50, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
});