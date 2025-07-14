
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useData } from '@/context/DataContext';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts = () => {
  const { products, isLoading } = useData();
  const featuredProducts = products.filter(product => product.featured);
  const { addItem } = useCart();
  
  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.image,
    });
  };
  
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-puremills-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="glass-card overflow-hidden flex flex-col h-full">
                <Skeleton className="w-full h-64" />
                <div className="p-4">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-puremills-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-puremills-text mb-2">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most loved organic superfoods and wellness products, selected for their exceptional quality and benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`} 
              className="group"
            >
              <div className="glass-card overflow-hidden flex flex-col h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.salePrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </div>
                  )}
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Heart size={18} />
                  </button>
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="font-medium text-puremills-text group-hover:text-puremills-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline mt-1 mb-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-semibold text-puremills-text">${product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm line-through text-gray-500">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-puremills-text">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {product.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 text-xs bg-puremills-secondary/20 text-puremills-text rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 pt-0 mt-auto">
                  <Button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full bg-puremills-primary hover:bg-puremills-primary/90 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            asChild
            variant="outline" 
            className="border-puremills-primary text-puremills-primary hover:bg-puremills-primary/10"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
