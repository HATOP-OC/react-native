const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = async (category: string = 'all'): Promise<Product[]> => {
  try {
    const endpoint = category === 'all' 
      ? `${BASE_URL}/products` 
      : `${BASE_URL}/products/category/${category}`;
      
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Помилка завантаження товарів');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Помилка завантаження категорій');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};