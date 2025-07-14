
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('equantum-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('equantum-cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('equantum-cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && (item.variant ? i.variant === item.variant : !i.variant)
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        toast.success(`Updated quantity for ${item.name}`);
        return updatedItems;
      } else {
        toast.success(`Added ${item.name} to cart`);
        return [...prevItems, item];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      toast.info("Item removed from cart");
      return updatedItems;
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
