
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import { ShoppingCart, Clock, CheckCircle, AlertTriangle } from "lucide-react";

// Mock data for tarpaulin orders
const MOCK_ORDERS = [
  { id: "ORD123", customer: "Construction Co. Ltd", date: "2025-05-20", status: "Processing", total: "₹24,600", items: "Heavy Duty Tarpaulin 20x30" },
  { id: "ORD124", customer: "Warehouse Solutions", date: "2025-05-20", status: "Shipped", total: "₹18,950", items: "Waterproof Canvas 15x25" },
  { id: "ORD125", customer: "Industrial Corp", date: "2025-05-20", status: "Completed", total: "₹53,275", items: "Custom Print Tarpaulin" },
  { id: "ORD126", customer: "Farm Equipment Co", date: "2025-05-19", status: "Processing", total: "₹7,825", items: "Agricultural Cover 12x18" },
  { id: "ORD127", customer: "Event Management Ltd", date: "2025-05-19", status: "Delayed", total: "₹31,520", items: "Fire Retardant Tarp 25x40" }
];

const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-amber-100 text-amber-800";
      case "Cancelled":
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

const OrderBook = () => {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tarpaulin Order Book</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard 
            title="NEW ORDERS" 
            value="15"
            icon={ShoppingCart}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="IN PRODUCTION" 
            value="28"
            icon={Clock} 
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard 
            title="COMPLETED TODAY" 
            value="12"
            icon={CheckCircle}
            iconColor="text-green-100 bg-green-500" 
          />
        </div>
        
        <div className="bg-white rounded-md shadow-sm mb-6">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('all')}
                >
                  All Orders
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'processing' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('processing')}
                >
                  In Production
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'completed' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar placeholder="Search orders..." className="w-full sm:w-64" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Showing 5 of 45 orders</p>
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

export default OrderBook;
