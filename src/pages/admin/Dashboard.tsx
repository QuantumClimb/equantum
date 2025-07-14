
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { mockProducts, mockCollections } from '@/data/mockData';

const AdminDashboard = () => {
  const [isRunningAutomation, setIsRunningAutomation] = useState<string | null>(null);
  
  const runAutomation = (type: string) => {
    setIsRunningAutomation(type);
    
    // Simulate automation running
    setTimeout(() => {
      setIsRunningAutomation(null);
      toast.success(`${type} automation completed successfully!`);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-equantum-text mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your products, collections, and run automation scripts.</p>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
                <p className="text-3xl font-bold text-equantum-text">{mockProducts.length}</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Collections</h3>
                <p className="text-3xl font-bold text-equantum-text">{mockCollections.length}</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Featured Products</h3>
                <p className="text-3xl font-bold text-equantum-text">{mockProducts.filter(p => p.featured).length}</p>
              </div>
            </div>
            
            <div className="glass mb-8 p-6 rounded-xl">
              <h2 className="text-xl font-medium text-equantum-text mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">#1001</td>
                      <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Apr 5, 2025</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">$125.00</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">#1002</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Apr 4, 2025</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Processing</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">$89.95</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">#1003</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Robert Johnson</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Apr 3, 2025</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Shipped</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">$239.50</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-medium text-equantum-text mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
                  Add New Product
                </Button>
                <Button className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
                  Create Collection
                </Button>
                <Button className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
                  Export Orders
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products" className="w-full">
            <div className="glass rounded-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-equantum-text">All Products</h2>
                <Button className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
                  Add New Product
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProducts.map((product, index) => (
                      <tr key={product.id} className={index !== mockProducts.length - 1 ? "border-b border-gray-200" : ""}>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{product.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{product.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {product.salePrice ? (
                            <div>
                              <span className="font-medium">${product.salePrice.toFixed(2)}</span>
                              <span className="line-through text-gray-500 ml-2">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{product.stock}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                            <Button variant="outline" size="sm" className="text-xs text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Collections Tab */}
          <TabsContent value="collections" className="w-full">
            <div className="glass rounded-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-equantum-text">All Collections</h2>
                <Button className="bg-equantum-primary hover:bg-equantum-primary/90 text-white">
                  Add New Collection
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {mockCollections.map((collection) => (
                  <div key={collection.id} className="glass-card rounded-lg overflow-hidden">
                    <div className="h-40 relative">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                      {collection.featured && (
                        <div className="absolute top-2 left-2 bg-equantum-primary text-white text-xs font-bold px-2 py-1 rounded">
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-equantum-text text-lg">{collection.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">{collection.products.length} products</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs flex-1">Edit</Button>
                        <Button variant="outline" size="sm" className="text-xs text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Automation Tab */}
          <TabsContent value="automation" className="w-full">
            <div className="glass p-6 rounded-xl mb-8">
              <h2 className="text-xl font-medium text-equantum-text mb-4">Run Automation Scripts</h2>
              <p className="text-gray-600 mb-6">
                These scripts help automate various tasks related to product management, content generation, and data population.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-medium text-equantum-text mb-2">Purge Data</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Clear old product and collection data to prepare for fresh imports.
                  </p>
                  <Button 
                    className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white"
                    onClick={() => runAutomation('Purge')}
                    disabled={!!isRunningAutomation}
                  >
                    {isRunningAutomation === 'Purge' ? 'Running...' : 'Run purge.py'}
                  </Button>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-equantum-text mb-2">Upload Assets</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Upload product and collection images to the system.
                  </p>
                  <Button 
                    className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white"
                    onClick={() => runAutomation('Upload')}
                    disabled={!!isRunningAutomation}
                  >
                    {isRunningAutomation === 'Upload' ? 'Running...' : 'Run upload.py'}
                  </Button>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-equantum-text mb-2">Enrich Content</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Generate AI-powered product descriptions, meta fields, and SEO tags.
                  </p>
                  <Button 
                    className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white"
                    onClick={() => runAutomation('Enrich')}
                    disabled={!!isRunningAutomation}
                  >
                    {isRunningAutomation === 'Enrich' ? 'Running...' : 'Run enrich.py'}
                  </Button>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-equantum-text mb-2">Generate Collections</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Automatically create collections based on product types and tags.
                  </p>
                  <Button 
                    className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white"
                    onClick={() => runAutomation('Generate')}
                    disabled={!!isRunningAutomation}
                  >
                    {isRunningAutomation === 'Generate' ? 'Running...' : 'Run generate.py'}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-medium text-equantum-text mb-4">CSV Import</h2>
              <p className="text-gray-600 mb-6">
                Import product data from equantum_SOT.csv file.
              </p>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4 flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-equantum-primary hover:text-equantum-primary/90 focus-within:outline-none">
                    <span>Upload CSV file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">CSV only, max 10MB</p>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-equantum-primary hover:bg-equantum-primary/90 text-white"
                  onClick={() => {
                    toast.success("CSV import started successfully!");
                  }}
                >
                  Import Products
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
