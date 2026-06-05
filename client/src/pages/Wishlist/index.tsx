import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="container max-w-screen-xl py-24 flex flex-col items-center justify-center text-center">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Save items you love to your wishlist. Review them anytime and easily move them to your cart when you're ready to buy.
        </p>
        <Button size="lg" className="rounded-full px-8" asChild>
          <Link to="/products">Explore Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Your Wishlist</h1>
        <span className="text-muted-foreground">{items.length} items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group relative rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md">
            <button 
              onClick={() => removeItem(item.id)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-destructive hover:bg-background"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <Link to={`/products/${item.id}`} className="block">
              <div className="aspect-square overflow-hidden bg-muted">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{item.brand}</div>
                <h3 className="font-semibold line-clamp-1 group-hover:underline mb-2">{item.name}</h3>
                <div className="font-bold">${item.price.toFixed(2)}</div>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <Button 
                className="w-full rounded-full gap-2" 
                variant="outline"
                onClick={() => {
                  addToCart({ product: item, quantity: 1 });
                  removeItem(item.id);
                }}
              >
                <ShoppingBag className="h-4 w-4" /> Move to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
