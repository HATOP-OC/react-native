import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/useProducts';
import { ThemeColors, useThemeColors } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';

export const HomeScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    products,
    categories,
    activeCategory,
    loadingProducts,
    refreshing,
    error,
    handleCategoryPress,
    handleRefresh
  } = useProducts();

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (error) {
    return (
      <ScrollView
        contentContainerStyle={styles.errorContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()} 
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <Typography variant="h2" style={styles.errorText}>
          Помилка
        </Typography>
        <Typography variant="body" style={styles.errorSubText}>
          {error}
        </Typography>

        <View style={styles.retryButtonWrapper}>
          <Button title="Спробувати знову" onPress={() => handleRefresh()} /> 
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Пошук товарів..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryPress}
        />
      </View>

      {loadingProducts && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <ProductCard product={item} index={index} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => handleRefresh()} 
          ListEmptyComponent={
            <Typography variant="body" style={styles.emptySearch}>
              Товарів не знайдено
            </Typography>
          }
        />
      )}
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: colors.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    errorText: { textAlign: 'center', marginBottom: 10 },
    errorSubText: { textAlign: 'center', color: colors.textSecondary },
    retryButtonWrapper: { marginTop: 24, width: '100%', alignItems: 'center' },
    filterWrapper: { backgroundColor: colors.surface },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      margin: 16,
      marginBottom: 0,
      borderRadius: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, paddingVertical: 12, color: colors.text, fontSize: 16 },
    listContainer: { padding: 16 },
    row: { justifyContent: 'space-between' },
    emptySearch: { textAlign: 'center', marginTop: 40, color: colors.textSecondary },
  });
