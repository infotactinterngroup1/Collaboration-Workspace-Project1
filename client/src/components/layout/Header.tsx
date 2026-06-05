import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">AI STORE.</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Products</Link>
            <Link to="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Categories</Link>
            <Link to="/search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">AI Search</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/search" className="hidden sm:flex text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>
          <Link to="/wishlist" className="text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Link>
          <Link to="/cart" className="text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
          <button className="hidden sm:flex text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
