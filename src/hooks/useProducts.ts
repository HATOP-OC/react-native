import { useState, useEffect } from 'react';
import { getProducts, getCategories, Product } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadInitialData = async () => {
    setLoadingInitial(true);
    setError(null);
    try {
      const [prods, cats] = await Promise.all([getProducts('all'), getCategories()]);
      setProducts(prods);
      setCategories(['all', ...cats]);
    } catch (err) {
      setError('Не вдалося завантажити дані. Спробуйте пізніше.');
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCategoryPress = async (category: string) => {
    if (category === activeCategory) return;
    
    setActiveCategory(category);
    setLoadingProducts(true);
    try {
      const data = await getProducts(category);
      setProducts(data);
    } catch (err) {
      setError('Не вдалося завантажити товари для цієї категорії.');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getProducts(activeCategory);
      setProducts(data);
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  return {
    products,
    categories,
    activeCategory,
    loadingInitial,
    loadingProducts,
    refreshing,
    error,
    handleCategoryPress,
    handleRefresh,
  };
};