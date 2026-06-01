import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '../store/themeStore';
import { Typography } from './Typography';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  const colors = useThemeColors();
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.primary : 'transparent',
                borderColor: isActive ? colors.primary : colors.border
              }
            ]}
            onPress={() => onSelectCategory(cat)}
          >
            <Typography 
              variant="body" 
              style={{ 
                color: isActive ? '#FFFFFF' : colors.text,
                textTransform: 'capitalize',
                fontSize: 14
              }}
            >
              {cat === 'all' ? 'Всі' : cat}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
});