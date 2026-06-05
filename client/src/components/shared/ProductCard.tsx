import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ product, quantity: 1 });
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <Card className="overflow-hidden border-transparent bg-transparent shadow-none transition-all hover:shadow-lg dark:hover:border-border">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          {product.discount && (
            <Badge className="absolute left-3 top-3 z-10 bg-destructive text-destructive-foreground hover:bg-destructive">
              -{product.discount}%
            </Badge>
          )}
          <button
            onClick={handleWishlistToggle}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
          </button>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              className="w-full gap-2 bg-white text-black hover:bg-white/90"
              size="sm"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
        <CardContent className="p-4 pt-5">
          <div className="mb-1 flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="line-clamp-1 font-semibold text-foreground group-hover:underline">
            {product.name}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
