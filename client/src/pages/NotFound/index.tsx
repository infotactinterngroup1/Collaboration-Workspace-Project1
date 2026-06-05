import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-muted-foreground">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page not found</h2>
      <p className="text-muted-foreground mt-4 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/" className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
        Go back home
      </Link>
    </div>
  );
}
