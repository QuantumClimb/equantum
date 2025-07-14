
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/admin/Dashboard";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { DataProvider } from "./context/DataContext";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <CartProvider>
            <SearchProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
              <Sonner />
            </SearchProvider>
          </CartProvider>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
