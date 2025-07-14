
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, searchResults, clearSearch } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Show dropdown if we have search results and a search term
    if (searchResults.length > 0 && searchTerm.trim() !== '') {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchResults, searchTerm]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsDropdownOpen(false);
    }
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
    setIsDropdownOpen(false);
    clearSearch();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-20 bg-white/70 backdrop-blur-sm border-puremills-secondary/30 focus:border-puremills-primary focus:ring-puremills-primary/20"
          onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2">
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 mr-1"
              onClick={() => {
                clearSearch();
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              <X size={16} />
            </Button>
          )}
          <Button type="submit" variant="ghost" size="icon" className="h-8 w-8">
            <Search size={16} />
          </Button>
        </div>
      </form>

      {isDropdownOpen && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-50 max-h-[400px] overflow-y-auto glass-card"
        >
          <div className="p-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
            <ul>
              {searchResults.map((product) => (
                <li key={product.id} className="mb-1">
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {searchResults.length > 5 && (
              <div className="mt-2 text-center">
                <Button
                  variant="link"
                  className="text-sm text-puremills-primary"
                  onClick={handleSearch}
                >
                  View all {searchResults.length} results
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
