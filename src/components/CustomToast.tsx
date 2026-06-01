import { useThemeColors } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';

export const CustomToast = () => {
  const colors = useThemeColors();

  const toastConfig: ToastConfig = {
    success: ({ text1, text2 }) => (
      <View style={[styles.pill, { backgroundColor: colors.surface }]}>
        <View style={[styles.iconBox, { backgroundColor: '#34C75920' }]}>
          <Ionicons name="checkmark" size={20} color="#34C759" />
        </View>
        <View style={styles.textContainer}>
          {text1 && <Text style={[styles.text1, { color: colors.text }]}>{text1}</Text>}
          {text2 && <Text style={[styles.text2, { color: colors.textSecondary }]} numberOfLines={1}>{text2}</Text>}
        </View>
      </View>
    ),
    error: ({ text1, text2 }) => (
      <View style={[styles.pill, { backgroundColor: colors.surface }]}>
        <View style={[styles.iconBox, { backgroundColor: '#FF3B3020' }]}>
          <Ionicons name="close" size={20} color="#FF3B30" />
        </View>
        <View style={styles.textContainer}>
          {text1 && <Text style={[styles.text1, { color: colors.text }]}>{text1}</Text>}
          {text2 && <Text style={[styles.text2, { color: colors.textSecondary }]} numberOfLines={1}>{text2}</Text>}
        </View>
      </View>
    ),
    info: ({ text1, text2 }) => (
      <View style={[styles.pill, { backgroundColor: colors.surface }]}>
        <View style={[styles.iconBox, { backgroundColor: `${colors.primary}20` }]}>
          <Ionicons name="information" size={20} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          {text1 && <Text style={[styles.text1, { color: colors.text }]}>{text1}</Text>}
          {text2 && <Text style={[styles.text2, { color: colors.textSecondary }]} numberOfLines={1}>{text2}</Text>}
        </View>
      </View>
    )
  };

  return <Toast config={toastConfig} topOffset={55} />;
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100, 
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 13,
    marginTop: 2,
  },
});