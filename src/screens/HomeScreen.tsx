import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColors } from '../store/themeStore';
import { ProductCard } from '../components/ProductCard';
import { Typography } from '../components/Typography';
import { CategoryFilter } from '../components/CategoryFilter';
import { useProducts } from '../hooks/useProducts';

export const HomeScreen = () => {
  const colors = useThemeColors();
  const styles = getStyles(colors);
  
  const {
    products, categories, activeCategory, loadingProducts, 
    refreshing, error, handleCategoryPress, handleRefresh
  } = useProducts();

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="h2" style={styles.errorText}>Помилка</Typography>
        <Typography variant="body" style={styles.errorSubText}>{error}</Typography>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterWrapper}>
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
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 20 },
  errorText: { textAlign: 'center', marginBottom: 10 },
  errorSubText: { textAlign: 'center', color: colors.textSecondary },
  filterWrapper: { backgroundColor: colors.surface },
  listContainer: { padding: 16 },
  row: { justifyContent: 'space-between' },
});