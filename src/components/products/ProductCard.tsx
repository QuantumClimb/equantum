
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/mockData';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (event: React.MouseEvent) => {
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
  
  return (
    <Link to={`/products/${product.id}`} className="group">
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
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button 
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
            <button 
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-puremills-primary transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
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
          
          {product.rating && (
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          )}
          
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
            onClick={handleAddToCart}
            className="w-full bg-puremills-primary hover:bg-puremills-primary/90 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
