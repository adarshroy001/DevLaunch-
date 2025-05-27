import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import AlertCard from "@/components/ui/AlertCard";
import { Button } from "@/components/ui/button";
import { Boxes, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for tarpaulin inventory
const MOCK_INVENTORY = [
  { id: "MAT001", name: "PVC Material", category: "Raw Material", stock: "150 sq m", price: "₹45/sq m", status: "Low Stock" },
  { id: "MAT002", name: "Canvas Fabric", category: "Raw Material", stock: "450 sq m", price: "₹65/sq m", status: "In Stock" },
  { id: "MAT003", name: "Vinyl Sheets", category: "Raw Material", stock: "800 sq m", price: "₹55/sq m", status: "In Stock" },
  { id: "PROD001", name: "Heavy Duty Tarpaulin 20x30", category: "Finished Product", stock: "25 units", price: "₹4,200/unit", status: "In Stock" },
  { id: "MAT004", name: "Reinforcement Thread", category: "Raw Material", stock: "0 kg", price: "₹150/kg", status: "Out of Stock" }
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
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tarpaulin Inventory Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="RAW MATERIALS" 
            value="1,400 sq m"
            icon={Boxes}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="LOW STOCK ALERTS" 
            value="3"
            icon={AlertTriangle} 
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard 
            title="TOP SELLING" 
            value="Heavy Duty 20x30"
            icon={TrendingUp}
            iconColor="text-green-100 bg-green-500" 
          />
          <StatsCard 
            title="FINISHED PRODUCTS" 
            value="156 units"
            icon={TrendingDown}
            iconColor="text-purple-100 bg-purple-500" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Inventory Alerts</h2>
            <div className="space-y-2">
              <AlertCard type="error" message="Out of Stock: Reinforcement Thread - Production halted" />
              <AlertCard type="warning" message="Low Stock: PVC Material (150 sq m remaining)" />
              <AlertCard type="info" message="Heavy Duty Tarpaulin 20x30 demand increased by 25%" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button 
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate('/inventory/add-raw-material')}
              >
                Add Raw Material
              </Button>
              <Button 
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => navigate('/inventory/add-finished-product')}
              >
                Add Finished Product
              </Button>
              <Button 
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => navigate('/inventory/generate-report')}
              >
                Generate Inventory Report
              </Button>
              <Button 
                className="w-full bg-amber-600 text-white hover:bg-amber-700"
                onClick={() => navigate('/inventory/low-stock-alerts')}
              >
                Low Stock Alerts
              </Button>
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
                  All Items
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${category === 'raw' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCategory('raw')}
                >
                  Raw Materials
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${category === 'finished' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCategory('finished')}
                >
                  Finished Products
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar placeholder="Search inventory..." className="w-full sm:w-64" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
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
                      <button className="text-green-600 hover:text-green-900">Reorder</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Showing 5 of 48 items</p>
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
