import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsService } from '@/services/products.service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getProductById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container max-w-screen-xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-6 pt-10">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
          Return to products
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container max-w-screen-xl py-10">
      <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          {product.discount && (
            <Badge className="absolute left-4 top-4 z-10 bg-destructive text-destructive-foreground text-sm px-3 py-1">
              -{product.discount}% OFF
            </Badge>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">
            {product.brand}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-foreground">
              {product.reviewsCount} reviews
            </span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-10 text-balance leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg rounded-full"
              onClick={() => addToCart({ product, quantity: 1 })}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-14 w-14 rounded-full shrink-0"
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Truck className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Free Shipping</p>
                <p>On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <ShieldCheck className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">2 Year Warranty</p>
                <p>Full coverage included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
