
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useData } from '@/context/DataContext'; 
import { Skeleton } from '@/components/ui/skeleton';

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const collectionParam = searchParams.get('collection');
  const searchParam = searchParams.get('search');
  const { products, collections, isLoading } = useData();
  
  const [filters, setFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    priceRange: [0, 1000] as [number, number],
    inStock: false
  });
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  
  // Set initial price range based on available products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.salePrice || p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  }, [products]);
  
  // Apply collection filter when URL param changes
  useEffect(() => {
    if (collectionParam && products.length > 0) {
      setActiveCollection(collectionParam);
      
      // Set product type filter based on collection name if it matches a type
      const matchingType = products.find(p => 
        p.type.toLowerCase() === collectionParam.toLowerCase()
      )?.type;
      
      if (matchingType) {
        setFilters(prev => ({
          ...prev,
          types: [matchingType]
        }));
      } else if (collectionParam.toLowerCase() === 'all') {
        // Clear type filters for "all" collection
        setFilters(prev => ({
          ...prev,
          types: []
        }));
      }
    } else {
      setActiveCollection(null);
    }
  }, [collectionParam, products]);
  
  // Apply search filter when URL param changes
  useEffect(() => {
    if (searchParam && products.length > 0) {
      const searchTermLower = searchParam.toLowerCase();
      const searchResults = products.filter(product => {
        return (
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
        );
      });
      setFilteredProducts(searchResults);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParam, products]);
  
  // Apply all filters
  useEffect(() => {
    if (products.length === 0) return;
    
    let results = [...products];
    
    // Apply search filter
    if (searchParam) {
      const searchTermLower = searchParam.toLowerCase();
      results = results.filter(product => {
        return (
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
        );
      });
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      results = results.filter(product => filters.categories.includes(product.category));
    }
    
    // Apply type filter
    if (filters.types.length > 0) {
      results = results.filter(product => filters.types.includes(product.type));
    }
    
    // Apply price filter
    results = results.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Apply in stock filter
    if (filters.inStock) {
      results = results.filter(product => product.stock > 0);
    }
    
    setFilteredProducts(results);
  }, [filters, searchParam, products]);
  
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Get collection data
  const collectionData = collectionParam && collections.length > 0
    ? collections.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === collectionParam.toLowerCase())
    : null;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-10 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <Skeleton className="h-64 w-full" />
            </div>
            
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Collection Banner */}
      {collectionData && collectionData.bannerImage && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <img 
            src={collectionData.bannerImage} 
            alt={collectionData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-4xl font-bold text-white mb-2">{collectionData.name}</h1>
                <p className="text-white/90">{collectionData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Products with Filters */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Title (if no collection banner) */}
        {(!collectionData || !collectionData.bannerImage) && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-equantum-text">
              {searchParam 
                ? `Search Results for "${searchParam}"` 
                : collectionData?.name || "All Products"}
            </h1>
            {collectionData?.description && (
              <p className="text-gray-600 mt-2">{collectionData.description}</p>
            )}
          </div>
        )}
        
        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={toggleFilters}
            variant="outline" 
            className="w-full flex items-center justify-center border-equantum-primary text-equantum-primary"
          >
            {isFilterVisible ? (
              <>
                <X size={18} className="mr-2" />
                Hide Filters
              </>
            ) : (
              <>
                <Menu size={18} className="mr-2" />
                Show Filters
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className={`lg:w-1/4 ${isFilterVisible ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">{filteredProducts.length} products</p>
                  <select 
                    className="border-gray-300 rounded-md text-gray-600 focus:border-equantum-primary focus:ring-equantum-primary"
                    defaultValue="featured"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="best-selling">Best Selling</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-equantum-text mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setFilters({
                      categories: [],
                      types: [],
                      priceRange: [0, 1000],
                      inStock: false
                    });
                  }}
                  className="bg-equantum-primary text-white hover:bg-equantum-primary/90"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
