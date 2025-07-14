import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useData } from '@/context/DataContext';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, isLoading } = useData();
  const [product, setProduct] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const { addItem } = useCart();
  
  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
        
        // Set default variant if variants exist
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0].id);
        }
      }
    }
  }, [productId, products]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="w-full h-[500px] rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/3 mb-8" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-8" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-equantum-text mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
            <Button asChild className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
    
    // Update main image if variant has an image
    const variant = product.variants?.find((v: any) => v.id === variantId);
    if (variant && variant.image) {
      setMainImage(variant.image);
    }
  };
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants?.find((v: any) => v.id === selectedVariant);
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: variant ? variant.price : (product.salePrice || product.price),
      quantity,
      image: mainImage || product.image,
      variant: variant ? variant.name : undefined
    };
    
    addItem(productToAdd);
  };
  
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-equantum-primary">Home</Link>
            </li>
            <li className="mx-2">
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-equantum-primary">Products</Link>
            </li>
            <li className="mx-2">
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            <li className="text-equantum-text font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="glass-card overflow-hidden rounded-2xl mb-4">
              <img 
                src={mainImage || product.image} 
                alt={product.name} 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(image)}
                    className={`glass-card overflow-hidden rounded-lg p-1 border-2 ${mainImage === image ? 'border-equantum-primary' : 'border-transparent'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-20 object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-equantum-text mb-2">{product.name}</h1>
              
              {/* Price */}
              <div className="mt-4 flex items-baseline">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-semibold text-equantum-text">${selectedVariant && product.variants ? product.variants.find((v: any) => v.id === selectedVariant)?.price.toFixed(2) : product.salePrice.toFixed(2)}</span>
                    <span className="ml-2 text-lg line-through text-gray-500">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-equantum-text">${selectedVariant && product.variants ? product.variants.find((v: any) => v.id === selectedVariant)?.price.toFixed(2) : product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
                </div>
              )}
              
              {/* Product Tags */}
              <div className="mt-4 flex flex-wrap gap-1">
                {product.tags?.map((tag: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-equantum-secondary/20 text-equantum-text rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Short Description */}
              <div className="mt-6">
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
            
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant.id)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedVariant === variant.id
                          ? 'bg-equantum-primary text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-equantum-primary'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-y border-gray-300 py-1 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-white text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-equantum-primary hover:bg-equantum-primary/90 text-white"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="border-equantum-primary text-equantum-primary hover:bg-equantum-primary/10"
              >
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Benefits */}
            {product.metafields?.benefits && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-equantum-text mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {product.metafields.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-equantum-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="glass">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Ingredients</TabsTrigger>
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.fullDescription || product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="p-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-equantum-text mb-3">Ingredients</h3>
                <p className="text-gray-600 mb-6">{product.metafields?.ingredients || "No ingredients information available."}</p>
                
                {product.metafields?.specifications && (
                  <>
                    <h3 className="text-lg font-medium text-equantum-text mb-3">Specifications</h3>
                    <ul className="space-y-2">
                      {Object.entries(product.metafields.specifications).map(([key, value], idx) => (
                        <li key={idx} className="flex">
                          <span className="font-medium text-equantum-text w-32">{key}:</span>
                          <span className="text-gray-600">{String(value)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="how-to-use" className="p-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-equantum-text mb-3">How to Use</h3>
                <p className="text-gray-600">{product.metafields?.howToUse || "No usage information available."}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
