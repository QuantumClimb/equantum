
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, X, ChevronLeft } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 max-w-2xl mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-equantum-text mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-equantum-text mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-medium text-equantum-text">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-equantum-primary flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Clear Cart
                </button>
              </div>
              
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="px-6 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-20 h-20">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="text-base font-medium text-equantum-text">
                              <Link to={`/products/${item.id}`} className="hover:text-equantum-primary">
                                {item.name}
                              </Link>
                            </h3>
                            {item.variant && (
                              <p className="text-sm text-gray-500">{item.variant}</p>
                            )}
                            <p className="text-sm font-medium text-equantum-text mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border-x border-gray-300 py-1 text-gray-700 focus:outline-none"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="ml-3 text-gray-400 hover:text-equantum-primary"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Button asChild variant="outline" className="flex items-center">
                <Link to="/products">
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-equantum-text">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-equantum-text">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-equantum-text">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-equantum-text">Calculated at checkout</span>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-equantum-text">Total</span>
                    <span className="text-lg font-bold text-equantum-text">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white mt-6"
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-equantum-text mb-2">We Accept</h3>
                  <div className="flex space-x-2">
                    <div className="p-2 border border-gray-200 rounded-md">
                      <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="24" rx="4" fill="white"/>
                        <path d="M15.528 7.406H11.91V16.594H15.528V7.406Z" fill="#00579F"/>
                        <path d="M12.193 12L14.962 7.406H11.91C11.91 7.406 10.977 9.594 10.672 10.5C10.366 9.594 9.434 7.406 9.434 7.406H6.381L9.15 12L6.381 16.594H9.434C9.434 16.594 10.366 14.406 10.672 13.5C10.977 14.406 11.91 16.594 11.91 16.594H14.962L12.193 12Z" fill="#00579F"/>
                        <path d="M23.085 16.594V16.594H25.529V14.103H27.365V12.018H25.529V9.897H28.907V7.406H22.782V16.594H23.085Z" fill="#00579F"/>
                        <path d="M33.62 7.406H29.696C29.696 7.406 28.764 9.594 28.459 10.5C28.154 9.594 27.221 7.406 27.221 7.406H24.169L26.938 12L24.169 16.594H27.221C27.221 16.594 28.154 14.406 28.459 13.5C28.764 14.406 29.696 16.594 29.696 16.594H32.749L30.587 12.406L33.62 7.406Z" fill="#00579F"/>
                      </svg>
                    </div>
                    <div className="p-2 border border-gray-200 rounded-md">
                      <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="24" rx="4" fill="white"/>
                        <path d="M25.528 8H21.91C20.854 8 20 8.895 20 10C20 11.105 20.854 12 21.91 12H25.528C26.584 12 27.438 11.105 27.438 10C27.438 8.895 26.584 8 25.528 8Z" fill="#FF5F00"/>
                        <path d="M21.91 12H25.528C26.584 12 27.438 11.105 27.438 10H20C20 11.105 20.854 12 21.91 12Z" fill="#EB001B"/>
                        <path d="M20 10C20 11.105 20.854 12 21.91 12C22.966 12 23.82 11.105 23.82 10C23.82 8.895 22.966 8 21.91 8C20.854 8 20 8.895 20 10Z" fill="#F79E1B"/>
                      </svg>
                    </div>
                    <div className="p-2 border border-gray-200 rounded-md">
                      <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="24" rx="4" fill="white"/>
                        <path d="M21.857 9C21.385 9 21 9.448 21 10C21 10.552 21.385 11 21.857 11H24.143C24.615 11 25 10.552 25 10C25 9.448 24.615 9 24.143 9H21.857Z" fill="#253B80"/>
                        <path d="M22 12C22 11.448 22.448 11 23 11H26C26.552 11 27 11.448 27 12C27 12.552 26.552 13 26 13H23C22.448 13 22 12.552 22 12Z" fill="#179BD7"/>
                        <path d="M24 14C24 13.448 24.448 13 25 13H28C28.552 13 29 13.448 29 14C29 14.552 28.552 15 28 15H25C24.448 15 24 14.552 24 14Z" fill="#253B80"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
