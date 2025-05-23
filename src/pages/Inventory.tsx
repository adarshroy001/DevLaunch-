
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import AlertCard from "@/components/ui/AlertCard";
import { Boxes, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

// Mock data for inventory
const MOCK_INVENTORY = [
  { id: "PROD001", name: "Product A", category: "Electronics", stock: 5, price: "$149.99", status: "Low Stock" },
  { id: "PROD002", name: "Product B", category: "Clothing", stock: 120, price: "$29.99", status: "In Stock" },
  { id: "PROD003", name: "Product C", category: "Home Goods", stock: 45, price: "$79.50", status: "In Stock" },
  { id: "PROD004", name: "Product D", category: "Electronics", stock: 30, price: "$199.99", status: "In Stock" },
  { id: "PROD005", name: "Product E", category: "Office", stock: 0, price: "$24.99", status: "Out of Stock" }
];

const StockStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-amber-100 text-amber-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const Inventory = () => {
  const [category, setCategory] = useState("all");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Inventory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="TOTAL PRODUCTS" 
            value="1,246"
            icon={Boxes}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="LOW STOCK ITEMS" 
            value="15"
            icon={AlertTriangle} 
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard 
            title="TOP SELLING" 
            value="Product B"
            icon={TrendingUp}
            iconColor="text-green-100 bg-green-500" 
          />
          <StatsCard 
            title="LOWEST SELLING" 
            value="Product E"
            icon={TrendingDown}
            iconColor="text-red-100 bg-red-500" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Inventory Alerts</h2>
            <div className="space-y-2">
              <AlertCard type="error" message="Out of Stock: Product E" />
              <AlertCard type="warning" message="Low Stock: Product A (5 units remaining)" />
              <AlertCard type="info" message="Product B is selling faster than expected" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                Add New Product
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm">
                Update Stock Levels
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors text-sm">
                Generate Inventory Report
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${category === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCategory('all')}
                >
                  All Products
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${category === 'electronics' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCategory('electronics')}
                >
                  Electronics
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${category === 'clothing' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCategory('clothing')}
                >
                  Clothing
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar placeholder="Search products..." className="w-full sm:w-64" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_INVENTORY.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StockStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Showing 5 of 120 products</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
