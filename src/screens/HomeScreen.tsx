import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColors } from '../store/themeStore';
import { ProductCard } from '../components/ProductCard';
import { Typography } from '../components/Typography';
import { CategoryFilter } from '../components/CategoryFilter';
import { useProducts } from '../hooks/useProducts';

export const HomeScreen = () => {
  const colors = useThemeColors();
  const {
    products, categories, activeCategory, loadingInitial, 
    loadingProducts, refreshing, error, handleCategoryPress, handleRefresh
  } = useProducts();

  if (loadingInitial) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background, padding: 20 }]}>
        <Typography variant="h2" style={styles.errorText}>⚠️ Помилка</Typography>
        <Typography variant="body" style={{ textAlign: 'center', color: colors.textSecondary }}>{error}</Typography>
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      
      <View style={{ backgroundColor: colors.surface }}>
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategoryPress} 
        />
      </View>

      {loadingProducts ? (
        <View style={[styles.center, { flex: 1 }]}>
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

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { textAlign: 'center', marginBottom: 10 },
  listContainer: { padding: 16 },
  row: { justifyContent: 'space-between' },
});