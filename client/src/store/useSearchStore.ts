import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (query) => {
        set((state) => {
          const filtered = state.recentSearches.filter((q) => q.toLowerCase() !== query.toLowerCase());
          return { recentSearches: [query, ...filtered].slice(0, 5) };
        });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage',
    }
  )
);
