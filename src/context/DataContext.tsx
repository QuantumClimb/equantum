import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseProductsCSV, parseCollectionsCSV, mapCSVToProducts, mapCSVToCollections } from '@/utils/csvParser';
import { mockProducts, mockCollections, Product, Collection } from '@/data/mockData';

interface DataContextType {
  products: Product[];
  collections: Collection[];
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  products: [],
  collections: [],
  isLoading: true,
  error: null
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load products from CSV
        const productsCsvData = await parseProductsCSV('/equantum_SOT2.csv');
        if (productsCsvData.length > 0) {
          const mappedProducts = mapCSVToProducts(productsCsvData);
          setProducts(mappedProducts);
          
          // Load collections from CSV
          const collectionsCsvData = await parseCollectionsCSV('/collections with descriptions.csv');
          if (collectionsCsvData.length > 0) {
            const mappedCollections = mapCSVToCollections(collectionsCsvData, mappedProducts);
            setCollections(mappedCollections);
          }
        }
      } catch (err) {
        console.error("Error loading data from CSV:", err);
        setError("Failed to load product and collection data. Using mock data instead.");
        // Keep using mock data if CSV loading fails
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ products, collections, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};
