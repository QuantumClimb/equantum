
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[];
  category: string;
  type: string;
  tags?: string[];
  variants?: ProductVariant[];
  featured?: boolean;
  stock: number;
  rating?: number;
  reviews?: number;
  metafields?: {
    benefits?: string[];
    ingredients?: string;
    howToUse?: string;
    specifications?: Record<string, string>;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  bannerImage?: string;
  products: string[]; // Product IDs
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
}

// Mock Product Data
export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Organic Hemp Protein Powder",
    price: 29.99,
    description: "Plant-based protein sourced from organic hemp seeds.",
    fullDescription: "Our Organic Hemp Protein Powder is a complete plant-based protein source derived from the finest organic hemp seeds. Rich in essential amino acids, fiber, and healthy fats, this powder offers a nutty flavor that's perfect for smoothies, baking, or simply mixed with water. Each serving provides 20g of clean protein to support muscle recovery and overall wellness.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622484212850-eb596d769eeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Superfoods",
    type: "Protein",
    tags: ["organic", "plant-based", "protein", "hemp", "non-gmo"],
    featured: true,
    stock: 50,
    rating: 4.8,
    reviews: 124,
    variants: [
      {
        id: "prod-001-var-1",
        name: "500g Pouch",
        price: 29.99,
        stock: 30
      },
      {
        id: "prod-001-var-2",
        name: "1kg Pouch",
        price: 49.99,
        stock: 20
      }
    ],
    metafields: {
      benefits: [
        "Complete plant protein with all essential amino acids",
        "Rich in omega-3 and omega-6 fatty acids",
        "High in fiber to support digestive health",
        "Sustainably grown and minimally processed"
      ],
      ingredients: "100% Organic Hemp Protein",
      howToUse: "Add 2-3 tablespoons to smoothies, oatmeal, or baked goods. Mix with your favorite milk or water."
    },
    seo: {
      title: "Organic Hemp Protein Powder | Complete Plant Protein | equantum",
      description: "High-quality organic hemp protein powder with 20g protein per serving. Plant-based, non-GMO, and sustainably sourced.",
      keywords: ["hemp protein", "plant protein", "organic protein", "vegan protein"]
    }
  },
  {
    id: "prod-002",
    name: "Ceremonial Grade Matcha",
    price: 39.99,
    salePrice: 34.99,
    description: "Premium ceremonial grade matcha from Uji, Japan.",
    fullDescription: "Our Ceremonial Grade Matcha is hand-picked from the finest tea leaves in Uji, Japan. This vibrant green powder is stone-ground to perfection, resulting in a smooth, umami-rich flavor with subtle sweet notes. Rich in antioxidants and L-theanine, it provides calm, focused energy without the jitters of coffee.",
    image: "https://images.unsplash.com/photo-1582793988951-9aed5f8f1f1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Superfoods",
    type: "Tea",
    tags: ["organic", "matcha", "tea", "japanese", "antioxidants"],
    featured: true,
    stock: 30,
    rating: 4.9,
    reviews: 83,
    metafields: {
      benefits: [
        "Rich in antioxidants to fight free radicals",
        "Contains L-theanine for calm, focused energy",
        "Supports metabolism and detoxification",
        "Enhances mood and concentration"
      ],
      ingredients: "100% Organic Ceremonial Grade Matcha Green Tea Powder",
      howToUse: "For traditional preparation, sift 1-2 tsp into a bowl, add 2oz hot water (not boiling), and whisk until frothy."
    }
  },
  {
    id: "prod-003",
    name: "Organic Coconut Butter",
    price: 18.99,
    description: "Creamy coconut butter made from pure organic coconuts.",
    image: "https://images.unsplash.com/photo-1572484843049-82ed1ce534b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Pantry",
    type: "Butter",
    tags: ["organic", "coconut", "butter", "vegan"],
    stock: 45,
    rating: 4.7,
    reviews: 56
  },
  {
    id: "prod-004",
    name: "Adaptogenic Mushroom Blend",
    price: 44.99,
    description: "Powerful blend of 7 organic medicinal mushrooms.",
    image: "https://images.unsplash.com/photo-1604336089793-28e99c5f3f5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Superfoods",
    type: "Adaptogens",
    tags: ["mushrooms", "adaptogens", "immunity", "organic"],
    featured: true,
    stock: 25,
    rating: 4.8,
    reviews: 112
  },
  {
    id: "prod-005",
    name: "Cold-Pressed Rosehip Oil",
    price: 24.99,
    description: "Nutrient-rich facial oil for radiant skin.",
    image: "https://images.unsplash.com/photo-1614859275172-55311df180a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    type: "Oils",
    tags: ["skincare", "facial oil", "organic", "cold-pressed"],
    stock: 35,
    rating: 4.9,
    reviews: 94
  },
  {
    id: "prod-006",
    name: "Organic Cacao Nibs",
    price: 15.99,
    description: "Raw, unprocessed cacao nibs for baking and snacking.",
    image: "https://images.unsplash.com/photo-1606245931770-257d5c3c9937?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Superfoods",
    type: "Cacao",
    tags: ["cacao", "raw", "organic", "antioxidants"],
    stock: 60,
    rating: 4.6,
    reviews: 78
  },
  {
    id: "prod-007",
    name: "Grass-Fed Collagen Peptides",
    price: 32.99,
    description: "Type I & III collagen for skin, hair, and joint health.",
    image: "https://images.unsplash.com/photo-1620231013566-1a912df62a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Supplements",
    type: "Collagen",
    tags: ["collagen", "grass-fed", "beauty", "joint health"],
    stock: 40,
    rating: 4.7,
    reviews: 203
  },
  {
    id: "prod-008",
    name: "Organic Ashwagandha Powder",
    price: 19.99,
    description: "Ancient adaptogen for stress relief and vitality.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Supplements",
    type: "Adaptogens",
    tags: ["ashwagandha", "adaptogen", "organic", "stress-relief"],
    featured: true,
    stock: 55,
    rating: 4.8,
    reviews: 156
  }
];

// Mock Collection Data
export const mockCollections: Collection[] = [
  {
    id: "col-001",
    name: "All Products",
    description: "Shop our full range of organic products",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1498252992631-9380b51a1baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    products: mockProducts.map(p => p.id),
    featured: true,
    seo: {
      title: "All Organic Products | equantum",
      description: "Discover our complete range of organic, sustainably sourced products for health, wellness, and conscious living."
    }
  },
  {
    id: "col-002",
    name: "Protein",
    description: "Plant-based proteins for optimal nutrition",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    products: mockProducts.filter(p => p.type === "Protein").map(p => p.id),
    featured: true
  },
  {
    id: "col-003",
    name: "Adaptogens",
    description: "Natural adaptogens for stress and balance",
    image: "https://images.unsplash.com/photo-1604336089793-28e99c5f3f5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    products: mockProducts.filter(p => p.type === "Adaptogens").map(p => p.id),
    featured: true
  },
  {
    id: "col-004",
    name: "Tea",
    description: "Premium organic teas for mind and body",
    image: "https://images.unsplash.com/photo-1582793988951-9aed5f8f1f1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    products: mockProducts.filter(p => p.type === "Tea").map(p => p.id)
  },
  {
    id: "col-005",
    name: "Oils & Butters",
    description: "Cold-pressed oils and butters for cooking and beauty",
    image: "https://images.unsplash.com/photo-1614859275172-55311df180a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    products: mockProducts.filter(p => p.type === "Oils" || p.type === "Butter").map(p => p.id)
  }
];
