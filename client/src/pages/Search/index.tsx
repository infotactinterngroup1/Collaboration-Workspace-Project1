import { useState } from 'react';
import { Search as SearchIcon, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store/useSearchStore';
import { searchService } from '@/services/search.service';
import { SearchResult } from '@/types';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const { addRecentSearch, recentSearches } = useSearchStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    addRecentSearch(query);
    
    try {
      const data = await searchService.semanticSearch(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsSearching(false);
    }
  };

  const suggestedQueries = [
    "warm winter jackets",
    "best shoes for running",
    "office wear for men",
    "minimal black sneakers",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    // Simulate form submit
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSearch(syntheticEvent);
  };

  return (
    <div className="container max-w-screen-xl py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center rounded-full border bg-primary/10 px-3 py-1 text-sm font-medium mb-6">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span className="text-primary">Semantic AI Search</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            What are you looking for?
          </h1>
          <p className="text-muted-foreground text-lg">
            Use natural language to find exactly what you need.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative flex items-center shadow-lg rounded-full overflow-hidden mb-8 border-2 border-primary/20 focus-within:border-primary transition-colors">
          <div className="absolute left-6 text-muted-foreground">
            <SearchIcon className="h-6 w-6" />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'comfortable ergonomic chair for home office under $500'"
            className="w-full h-16 pl-16 pr-32 border-0 bg-background text-lg shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            type="submit" 
            disabled={!query.trim() || isSearching}
            className="absolute right-2 h-12 rounded-full px-6 text-base"
          >
            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
          </Button>
        </form>

        {!isSearching && results.length === 0 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Suggested Queries</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((recent) => (
                    <button
                      key={recent}
                      onClick={() => handleSuggestionClick(recent)}
                      className="inline-flex items-center rounded-full border border-dashed bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <SearchIcon className="mr-2 h-3 w-3" />
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isSearching && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <p className="text-muted-foreground animate-pulse text-lg">AI is analyzing your request...</p>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold">Results for "{query}"</h2>
              <span className="text-sm text-muted-foreground">{results.length} found</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((result) => (
                <Link key={result.id} to={result.url} className="group block">
                  <div className="rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
                    {result.image && (
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {result.type}
                      </div>
                      <h3 className="font-medium group-hover:underline line-clamp-2">
                        {result.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
