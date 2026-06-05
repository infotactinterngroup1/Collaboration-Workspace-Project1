import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white tracking-tight">{category.name}</h3>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            Shop now <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
