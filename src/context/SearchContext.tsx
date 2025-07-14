
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts } from '@/data/mockData';

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: any[];
  isSearching: boolean;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simple search function that looks at product name, description, and tags
    const results = mockProducts.filter(product => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
      );
    });
    
    setSearchResults(results);
    setIsSearching(false);
  }, [searchTerm]);
  
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };
  
  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      searchResults,
      isSearching,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
