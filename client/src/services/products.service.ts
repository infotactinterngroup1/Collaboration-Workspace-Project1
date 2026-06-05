import { Product } from '@/types';
import { delay } from './api';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p_1',
    name: 'Minimalist Titanium Watch',
    brand: 'Chrono',
    price: 249.99,
    originalPrice: 299.99,
    discount: 15,
    categoryId: 'c_watches',
    description: 'A sleek, lightweight titanium watch with sapphire crystal and automatic movement.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'],
    rating: 4.8,
    reviewsCount: 124,
    stock: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_2',
    name: 'Ergonomic Mesh Office Chair',
    brand: 'ErgoFit',
    price: 399.00,
    categoryId: 'c_furniture',
    description: 'Adjustable lumbar support and breathable mesh back for all-day comfort.',
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800'],
    rating: 4.5,
    reviewsCount: 89,
    stock: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_3',
    name: 'Noise Cancelling Headphones',
    brand: 'SoundMax',
    price: 349.50,
    originalPrice: 399.00,
    discount: 12,
    categoryId: 'c_electronics',
    description: 'Industry-leading noise cancellation with 30-hour battery life.',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
    rating: 4.9,
    reviewsCount: 432,
    stock: 80,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_4',
    name: 'Premium Leather Weekend Bag',
    brand: 'Voyage',
    price: 189.00,
    categoryId: 'c_accessories',
    description: 'Full-grain leather duffel bag perfect for short trips and weekend getaways.',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'],
    rating: 4.7,
    reviewsCount: 56,
    stock: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_5',
    name: 'Smart Home Hub Display',
    brand: 'TechCore',
    price: 129.99,
    categoryId: 'c_electronics',
    description: 'Control your entire home with this intuitive 8-inch smart display.',
    images: ['https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800'],
    rating: 4.6,
    reviewsCount: 210,
    stock: 150,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_6',
    name: 'Organic Cotton Basic Tee',
    brand: 'Essentials',
    price: 29.99,
    categoryId: 'c_clothing',
    description: 'Ultra-soft, sustainably sourced organic cotton t-shirt in regular fit.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    rating: 4.4,
    reviewsCount: 856,
    stock: 300,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_7',
    name: 'Ceramic Pour-Over Coffee Maker',
    brand: 'BrewMaster',
    price: 45.00,
    categoryId: 'c_home',
    description: 'Hand-crafted ceramic dripper for the perfect cup of pour-over coffee.',
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800'],
    rating: 4.8,
    reviewsCount: 112,
    stock: 60,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p_8',
    name: 'Wireless Mechanical Keyboard',
    brand: 'Keychron',
    price: 109.00,
    categoryId: 'c_electronics',
    description: 'Compact 75% layout with hot-swappable switches and RGB backlight.',
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'],
    rating: 4.7,
    reviewsCount: 320,
    stock: 45,
    createdAt: new Date().toISOString(),
  }
];

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    await delay(800);
    return MOCK_PRODUCTS;
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(500);
    return MOCK_PRODUCTS.find((p) => p.id === id);
  },
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_PRODUCTS.slice(0, 4);
  },
  getTrendingProducts: async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_PRODUCTS.slice(4, 8);
  }
};
