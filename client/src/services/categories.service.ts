import { Category } from '@/types';
import { delay } from './api';

const MOCK_CATEGORIES: Category[] = [
  { id: 'c_electronics', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400' },
  { id: 'c_clothing', name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400' },
  { id: 'c_furniture', name: 'Furniture', slug: 'furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' },
  { id: 'c_accessories', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=400' },
  { id: 'c_home', name: 'Home & Kitchen', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=400' },
  { id: 'c_watches', name: 'Watches', slug: 'watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400' },
];

export const categoriesService = {
  getCategories: async (): Promise<Category[]> => {
    await delay(500);
    return MOCK_CATEGORIES;
  },
};
