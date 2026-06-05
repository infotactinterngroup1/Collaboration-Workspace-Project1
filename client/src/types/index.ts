export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  brand: string;
  categoryId: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  subcategories?: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'category' | 'brand';
  image?: string;
  url: string;
}
