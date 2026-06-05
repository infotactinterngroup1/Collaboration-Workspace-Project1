import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/categories.service';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getCategories,
  });

  return (
    <div className="container max-w-screen-2xl py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Shop by Category</h1>
        <p className="text-lg text-muted-foreground">
          Discover our curated collections. From minimalist tech to premium lifestyle accessories.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div key={category.id} className="aspect-[4/3]">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
