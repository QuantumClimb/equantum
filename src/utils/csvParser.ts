
// Function to parse CSV data for products and collections
export const parseCSVData = (csv: string) => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map(header => header.trim());
  
  const results = [];
  
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    const row: Record<string, string> = {};
    
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = currentLine[j]?.trim() || "";
    }
    
    results.push(row);
  }
  
  return results;
};

// Function specifically for parsing product CSV
export const parseProductsCSV = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const csvData = await response.text();
    return parseCSVData(csvData);
  } catch (error) {
    console.error("Error loading products CSV:", error);
    return [];
  }
};

// Function specifically for parsing collections CSV
export const parseCollectionsCSV = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const csvData = await response.text();
    return parseCSVData(csvData);
  } catch (error) {
    console.error("Error loading collections CSV:", error);
    return [];
  }
};

// Map CSV product data to our product model
export const mapCSVToProducts = (csvProducts: Record<string, string>[]) => {
  return csvProducts.map((csvProduct, index) => {
    // Generate a unique ID if none provided
    const id = csvProduct.id || `prod-${(index + 1).toString().padStart(3, '0')}`;
    
    // Parse price and sale price if available
    const price = parseFloat(csvProduct.price) || 0;
    const salePrice = csvProduct.salePrice ? parseFloat(csvProduct.salePrice) : undefined;
    
    // Parse stock as number
    const stock = parseInt(csvProduct.stock) || 0;
    
    // Parse rating if available
    const rating = csvProduct.rating ? parseFloat(csvProduct.rating) : undefined;
    const reviews = csvProduct.reviews ? parseInt(csvProduct.reviews) : undefined;
    
    // Handle tags and images
    const tags = csvProduct.tags ? csvProduct.tags.split(';').map(tag => tag.trim()) : [];
    const images = csvProduct.images ? csvProduct.images.split(';').map(img => img.trim()) : [];
    
    // Handle featured flag
    const featured = csvProduct.featured === 'true' || csvProduct.featured === '1';
    
    // Parse any metafields
    const benefits = csvProduct.benefits ? csvProduct.benefits.split(';').map(benefit => benefit.trim()) : [];
    
    return {
      id,
      name: csvProduct.name || `Product ${id}`,
      price,
      salePrice,
      description: csvProduct.description || '',
      fullDescription: csvProduct.fullDescription || csvProduct.description || '',
      image: csvProduct.image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      images: images.length > 0 ? images : [csvProduct.image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'],
      category: csvProduct.category || 'Uncategorized',
      type: csvProduct.type || 'General',
      tags,
      featured,
      stock,
      rating,
      reviews,
      metafields: {
        benefits,
        ingredients: csvProduct.ingredients || '',
        howToUse: csvProduct.howToUse || '',
        specifications: {}
      },
      seo: {
        title: csvProduct.seoTitle || csvProduct.name,
        description: csvProduct.seoDescription || csvProduct.description,
        keywords: csvProduct.seoKeywords ? csvProduct.seoKeywords.split(';').map(kw => kw.trim()) : tags
      }
    };
  });
};

// Map CSV collection data to our collection model
export const mapCSVToCollections = (csvCollections: Record<string, string>[], products: any[]) => {
  return csvCollections.map((csvCollection, index) => {
    // Generate a unique ID if none provided
    const id = csvCollection.id || `col-${(index + 1).toString().padStart(3, '0')}`;
    
    // Handle featured flag
    const featured = csvCollection.featured === 'true' || csvCollection.featured === '1';
    
    // Filter products based on collection type or name
    const collectionProducts = products.filter(product => {
      if (csvCollection.name.toLowerCase() === 'all products' || csvCollection.name.toLowerCase() === 'all') {
        return true; // Include all products
      }
      
      // Filter by type if type matches collection name
      if (product.type.toLowerCase() === csvCollection.name.toLowerCase()) {
        return true;
      }
      
      // Check if collection's linked products includes this product ID
      if (csvCollection.products) {
        const productIds = csvCollection.products.split(';').map(id => id.trim());
        return productIds.includes(product.id);
      }
      
      return false;
    });
    
    return {
      id,
      name: csvCollection.name || `Collection ${id}`,
      description: csvCollection.description || '',
      image: csvCollection.image || 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7',
      bannerImage: csvCollection.bannerImage || csvCollection.image || 'https://images.unsplash.com/photo-1498252992631-9380b51a1baf',
      products: collectionProducts.map(p => p.id),
      featured,
      seo: {
        title: csvCollection.seoTitle || csvCollection.name,
        description: csvCollection.seoDescription || csvCollection.description
      }
    };
  });
};
