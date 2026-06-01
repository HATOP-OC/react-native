import { getCategories, getProducts } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useProducts = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { 
    data: products = [], 
    isLoading, 
    error, 
    refetch, 
    isRefetching 
  } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: () => getProducts(activeCategory),
  });

  return {
    products,
    categories: ['all', ...categories],
    activeCategory,
    loadingProducts: isLoading,
    refreshing: isRefetching,
    error: error ? 'Не вдалося завантажити дані' : null,
    handleCategoryPress: setActiveCategory,
    handleRefresh: refetch,
  };
};