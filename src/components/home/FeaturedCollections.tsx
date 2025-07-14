
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedCollections = () => {
  const { collections, isLoading } = useData();
  const featuredCollections = collections.filter(collection => collection.featured);
  
  if (isLoading) {
    return (
      <section className="py-16 bg-puremills-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl glass-card">
                <Skeleton className="w-full h-64" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-puremills-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-puremills-text mb-2">Featured Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of premium organic products, designed to nourish your body and support your wellness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCollections.map((collection) => (
            <Link 
              key={collection.id} 
              to={`/products?collection=${collection.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl glass-card hover-scale">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{collection.name}</h3>
                    <p className="text-white/80 text-sm">{collection.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
