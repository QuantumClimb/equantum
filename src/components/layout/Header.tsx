
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import SearchBar from '../common/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { totalItems } = useCart();
  const { searchTerm, setSearchTerm, searchResults, clearSearch } = useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      clearSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/logo.png"
              alt="equantum Logo"
              className="h-10 md:h-12"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-puremills-text hover:text-puremills-primary font-medium transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-puremills-text hover:text-puremills-primary font-medium transition-colors">
            Products
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-puremills-text hover:text-puremills-primary font-medium transition-colors">
              Collections
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md">
              <DropdownMenuLabel>Shop Collections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/products?collection=all" className="w-full">All Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?collection=protein" className="w-full">Protein</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?collection=adaptogens" className="w-full">Adaptogens</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?collection=tea" className="w-full">Tea</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearch}
            aria-label="Search"
            className="p-2 text-puremills-text hover:text-puremills-primary transition-colors"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          
          <Link to="/cart" className="relative p-2 text-puremills-text hover:text-puremills-primary transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-puremills-primary text-white text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link to="/admin" className="hidden md:block">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-puremills-primary/20 text-puremills-primary">A</AvatarFallback>
            </Avatar>
          </Link>
          
          <button
            className="md:hidden p-2 text-puremills-text"
            onClick={toggleMobileMenu}
            aria-label="Mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} aria-label="Close menu">
              <X size={24} className="text-puremills-text" />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 p-8">
            <Link 
              to="/" 
              className="text-xl font-medium text-puremills-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-xl font-medium text-puremills-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/products?collection=all" 
              className="text-xl font-medium text-puremills-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Collections
            </Link>
            <Link 
              to="/admin" 
              className="text-xl font-medium text-puremills-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
            <div className="pt-6">
              <Button 
                variant="outline" 
                className="border-puremills-primary text-puremills-primary hover:bg-puremills-primary hover:text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  toggleSearch();
                }}
              >
                <Search size={16} className="mr-2" />
                Search Products
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/10 z-40 backdrop-blur-sm animate-fade-in" onClick={toggleSearch}>
          <div className="container mx-auto p-4 pt-20" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 animate-scale-in">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
