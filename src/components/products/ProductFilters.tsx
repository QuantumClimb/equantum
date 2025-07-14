
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

// Get unique values for filters
const getUniqueCategories = () => {
  const categories = new Set(mockProducts.map(product => product.category));
  return Array.from(categories);
};

const getUniqueTypes = () => {
  const types = new Set(mockProducts.map(product => product.type));
  return Array.from(types);
};

interface ProductFiltersProps {
  filters: {
    categories: string[];
    types: string[];
    priceRange: [number, number];
    inStock: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    categories: string[];
    types: string[];
    priceRange: [number, number];
    inStock: boolean;
  }>>;
  className?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, setFilters, className }) => {
  const categories = getUniqueCategories();
  const types = getUniqueTypes();
  
  // Find min and max prices
  const prices = mockProducts.map(p => p.salePrice || p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  
  const handleCategoryChange = (category: string) => {
    if (filters.categories.includes(category)) {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== category)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };
  
  const handleTypeChange = (type: string) => {
    if (filters.types.includes(type)) {
      setFilters(prev => ({
        ...prev,
        types: prev.types.filter(t => t !== type)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        types: [...prev.types, type]
      }));
    }
  };
  
  const handlePriceChange = (value: number, isMin: boolean) => {
    setFilters(prev => ({
      ...prev,
      priceRange: isMin 
        ? [value, prev.priceRange[1]] 
        : [prev.priceRange[0], value]
    }));
  };
  
  const handleInStockChange = () => {
    setFilters(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      types: [],
      priceRange: [minPrice, maxPrice],
      inStock: false
    });
  };
  
  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.types.length > 0 || 
    filters.inStock ||
    filters.priceRange[0] > minPrice ||
    filters.priceRange[1] < maxPrice;
  
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-equantum-text">Filters</h2>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-equantum-primary flex items-center"
          >
            <X size={16} className="mr-1" />
            Clear
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-equantum-primary focus:ring-equantum-primary"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Product Types</h3>
        <div className="space-y-2">
          {types.map(type => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="h-4 w-4 rounded border-gray-300 text-equantum-primary focus:ring-equantum-primary"
              />
              <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-600">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-price" className="sr-only">Minimum Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="min-price"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), true)}
                min={minPrice}
                max={filters.priceRange[1]}
                className="pl-7 block w-full rounded-md border-gray-300 focus:border-equantum-primary focus:ring-equantum-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="max-price" className="sr-only">Maximum Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="max-price"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), false)}
                min={filters.priceRange[0]}
                max={maxPrice}
                className="pl-7 block w-full rounded-md border-gray-300 focus:border-equantum-primary focus:ring-equantum-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* In Stock Only */}
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="in-stock"
            checked={filters.inStock}
            onChange={handleInStockChange}
            className="h-4 w-4 rounded border-gray-300 text-equantum-primary focus:ring-equantum-primary"
          />
          <label htmlFor="in-stock" className="ml-2 text-sm text-gray-600">
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
