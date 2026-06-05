import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { productsService } from '@/services/products.service';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function Products() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getProducts,
  });

  return (
    <div className="container max-w-screen-2xl py-10">
      <div className="flex flex-col md:flex-row items-baseline justify-between border-b pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Sort by:</span>
            <select className="bg-transparent border-none font-medium focus:ring-0 focus:outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 shrink-0 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center gap-2 font-semibold pb-4 border-b">
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Categories</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 text-foreground font-medium">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span>All Categories</span>
                </li>
                <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Electronics</span>
                </li>
                <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Clothing</span>
                </li>
                <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Accessories</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm">Price Range</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="radio" name="price" className="rounded-full border-gray-300" />
                  <span>Under $50</span>
                </li>
                <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="radio" name="price" className="rounded-full border-gray-300" />
                  <span>$50 - $100</span>
                </li>
                <li className="flex items-center gap-2 hover:text-foreground cursor-pointer">
                  <input type="radio" name="price" className="rounded-full border-gray-300" />
                  <span>Over $100</span>
                </li>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] rounded-xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
