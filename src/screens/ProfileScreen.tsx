import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../components/Typography';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { ThemeColors, useThemeColors } from '../store/themeStore';



export const ProfileScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  
  const logout = useAuthStore((state) => state.logout);
  const { profile, orders, clearProfileData } = useProfileStore();

  const handleLogout = () => {
    clearProfileData();
    logout();
  };

  const hasName = Boolean(profile?.name);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          {hasName ? (
            <Typography variant="h1" style={{ color: '#FFF' }}>
              {profile!.name.charAt(0).toUpperCase()}
            </Typography>
          ) : (
            <Ionicons name="person" size={40} color="#FFF" />
          )}
        </View>
        <Typography variant="h1" style={styles.nameText}>
          {hasName ? profile!.name : 'Гість'}
        </Typography>
        {!hasName && (
          <Typography variant="caption" style={{ color: colors.textSecondary, marginTop: 5 }}>
            Зробіть замовлення, щоб зберегти дані
          </Typography>
        )}
      </View>

      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>Мої дані</Typography>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
            <Typography variant="body" style={[styles.infoText, !profile?.phone && styles.placeholderText]}>
              {profile?.phone || 'Телефон не додано'}
            </Typography>
          </View>
          <View style={[styles.infoRow, { marginTop: 15 }]}>
            <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
            <Typography variant="body" style={[styles.infoText, !profile?.address && styles.placeholderText]}>
              {profile?.address || 'Адресу не додано'}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>Мої продукти (Замовлення)</Typography>
        
        {orders.length === 0 ? (
          <View style={styles.emptyOrders}>
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              У вас ще немає замовлень
            </Typography>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Typography variant="caption" style={{ color: colors.textSecondary }}>
                  Замовлення #{order.id}
                </Typography>
                <Typography variant="h2" style={{ color: colors.primary }}>
                  ${order.total.toFixed(2)}
                </Typography>
              </View>
              
              <View style={styles.orderItemsList}>
                {order.items.map((item) => (
                  <View key={item.id} style={styles.miniItem}>
                    <View style={styles.miniImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.miniImage} resizeMode="contain" />
                    </View>
                    <View style={styles.miniItemInfo}>
                      <Typography variant="caption" numberOfLines={1}>{item.title}</Typography>
                      <Typography variant="caption" style={{ color: colors.textSecondary }}>
                        {item.quantity} шт.
                      </Typography>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Typography variant="body" style={styles.logoutText}>Вийти з акаунта</Typography>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  nameText: { fontSize: 24 },
  section: { padding: 20 },
  sectionTitle: { marginBottom: 15 },
  infoCard: { backgroundColor: colors.surface, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoText: { marginLeft: 15, fontSize: 16, color: colors.text },
  placeholderText: { color: colors.textSecondary, fontStyle: 'italic' },
  emptyOrders: { backgroundColor: colors.surface, padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  orderCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: colors.border },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 10, marginBottom: 10 },
  orderItemsList: { gap: 10 },
  miniItem: { flexDirection: 'row', alignItems: 'center' },
  miniImageContainer: { width: 40, height: 40, backgroundColor: '#FFF', borderRadius: 6, padding: 2, marginRight: 10 },
  miniImage: { width: '100%', height: '100%' },
  miniItemInfo: { flex: 1 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 10, marginBottom: 40 },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});