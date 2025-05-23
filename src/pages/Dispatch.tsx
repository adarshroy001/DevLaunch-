
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import { Truck, Package, CheckCircle, AlertTriangle } from "lucide-react";

// Mock data for dispatch
const MOCK_DISPATCH = [
  { id: "DIS001", orderId: "ORD123", customer: "John Doe", status: "Ready for Pickup", date: "2025-05-24", carrier: "FedEx", tracking: "FX12345678" },
  { id: "DIS002", orderId: "ORD118", customer: "Sarah Smith", status: "In Transit", date: "2025-05-23", carrier: "UPS", tracking: "1Z999AA10123456784" },
  { id: "DIS003", orderId: "ORD115", customer: "Michael Brown", status: "Delivered", date: "2025-05-22", carrier: "USPS", tracking: "9400123456789012345678" },
  { id: "DIS004", orderId: "ORD110", customer: "Emma Wilson", status: "Delayed", date: "2025-05-20", carrier: "DHL", tracking: "456789012" },
  { id: "DIS005", orderId: "ORD109", customer: "Robert Lee", status: "Delivered", date: "2025-05-19", carrier: "Amazon Logistics", tracking: "TBA123456789" }
];

const DispatchStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Ready for Pickup":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-amber-100 text-amber-800";
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

const Dispatch = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dispatch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="TODAY'S DISPATCHES" 
            value="8"
            icon={Truck}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="PENDING SHIPMENTS" 
            value="12"
            icon={Package}
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard 
            title="DELIVERED TODAY" 
            value="5"
            icon={CheckCircle}
            iconColor="text-green-100 bg-green-500" 
          />
          <StatsCard 
            title="DELAYED SHIPMENTS" 
            value="2"
            icon={AlertTriangle}
            iconColor="text-red-100 bg-red-500" 
          />
        </div>

        <div className="bg-white rounded-md shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Today's Pickup Schedule</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-md border border-blue-100">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">10:00</div>
                  </div>
                  <div>
                    <p className="font-medium">FedEx</p>
                    <p className="text-sm text-gray-500">4 packages</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-md border border-purple-100">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">13:30</div>
                  </div>
                  <div>
                    <p className="font-medium">UPS</p>
                    <p className="text-sm text-gray-500">2 packages</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-md border border-green-100">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">16:00</div>
                  </div>
                  <div>
                    <p className="font-medium">USPS</p>
                    <p className="text-sm text-gray-500">3 packages</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                  Create New Shipment
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors text-sm">
                  Print Shipping Labels
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm">
                  Schedule Pickup
                </button>
                <button className="w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors text-sm">
                  View Shipping Rates
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('all')}
                >
                  All Shipments
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'transit' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('transit')}
                >
                  In Transit
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === 'delivered' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('delivered')}
                >
                  Delivered
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar placeholder="Search shipments..." className="w-full sm:w-64" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispatch ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_DISPATCH.map((dispatch) => (
                  <tr key={dispatch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{dispatch.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispatch.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispatch.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DispatchStatusBadge status={dispatch.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispatch.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispatch.carrier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{dispatch.tracking}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Track</button>
                      <button className="text-gray-600 hover:text-gray-900">Print</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Showing 5 of 42 shipments</p>
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

export default Dispatch;
