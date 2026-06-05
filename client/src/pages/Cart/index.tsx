import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container max-w-screen-xl py-24 flex flex-col items-center justify-center text-center">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Looks like you haven't added anything to your cart yet. Discover our premium collections and find something you love.
        </p>
        <Button size="lg" className="rounded-full px-8" asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-6 py-6 border-b">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:underline">
                      <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.product.brand}</p>
                  </div>
                  <p className="font-bold text-lg">${item.product.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium border-x min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="rounded-2xl border bg-card p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl mb-8">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Discount code" className="rounded-full" />
                <Button variant="outline" className="rounded-full shrink-0">Apply</Button>
              </div>
              <Button size="lg" className="w-full h-14 rounded-full text-lg">
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
