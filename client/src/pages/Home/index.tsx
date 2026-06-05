import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { productsService } from '@/services/products.service';
import { categoriesService } from '@/services/categories.service';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: featuredProducts, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsService.getFeaturedProducts,
  });

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getCategories,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative max-w-screen-2xl pt-24 pb-32 md:pt-36 md:pb-40">
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>AI-Powered Product Discovery</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl text-balance">
              Find exactly what you're looking for. <span className="text-muted-foreground">Instantly.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-balance">
              Experience the future of shopping with our semantic AI search. 
              Premium products curated specifically for your lifestyle and needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
                <Link to="/products">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background" asChild>
                <Link to="/search">Try AI Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container max-w-screen-2xl py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Explore our premium collections tailored for you.</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <Link to="/categories">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        {loadingCategories ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Products */}
      <section className="container max-w-screen-2xl py-20 border-t">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground mt-2">Our most sought-after premium products this week.</p>
          </div>
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* AI Search Banner */}
      <section className="container max-w-screen-2xl py-24 my-10 bg-primary text-primary-foreground rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <Sparkles className="h-12 w-12 text-primary-foreground/80 mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Not sure what you want?
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Describe your ideal outfit, room aesthetic, or tech setup using natural language. Our AI will curate the perfect items for you.
          </p>
          <div className="pt-8 w-full max-w-xl">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder='Try "minimalist office desk setup under $500"'
                className="w-full h-14 pl-6 pr-32 rounded-full bg-primary-foreground text-primary font-medium focus:outline-none focus:ring-4 focus:ring-primary-foreground/20 placeholder:text-primary/50"
                readOnly
              />
              <Button className="absolute right-1.5 h-11 rounded-full px-6" asChild>
                <Link to="/search">Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
