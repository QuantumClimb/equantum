
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-puremills-background min-h-[80vh] flex items-center py-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-puremills-secondary/20 to-puremills-primary/10 backdrop-blur-sm"></div>
        <img 
          src="https://images.unsplash.com/photo-1498252992631-9380b51a1baf" 
          alt="Organic products backdrop" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl glass p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-puremills-text mb-4 leading-tight">
            Earth's Finest Organic Products
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Sustainably sourced, meticulously crafted superfoods and wellness products for conscious living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-puremills-primary hover:bg-puremills-primary/90 text-white font-medium px-8 py-3 rounded-full"
            >
              <Link to="/products">
                Shop All Products
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-puremills-primary text-puremills-primary hover:bg-puremills-primary/10"
            >
              <Link to="/products?collection=featured">
                Explore Featured
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
