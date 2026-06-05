import { SearchResult } from '@/types';
import { delay } from './api';
import { productsService } from './products.service';

export const searchService = {
  semanticSearch: async (query: string): Promise<SearchResult[]> => {
    await delay(1200); // Simulate AI processing time
    
    // In a real app, this would hit an AI backend. Here we just mock based on query length/keywords
    const allProducts = await productsService.getProducts();
    
    const results: SearchResult[] = allProducts
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
      .map(p => ({
        id: p.id,
        title: p.name,
        type: 'product',
        image: p.images[0],
        url: `/products/${p.id}`
      }));
      
    // Add some fake generic results if not enough product matches
    if (results.length === 0) {
      results.push({
        id: 'mock_1',
        title: `Curated collection for "${query}"`,
        type: 'category',
        url: `/categories?q=${encodeURIComponent(query)}`
      });
    }

    return results;
  },
};
