
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import AlertCard from "@/components/ui/AlertCard";
import SearchBar from "@/components/ui/SearchBar";
import { ShoppingCart, Clock, Truck, Boxes } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tarpaulin Manufacturing Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="TODAY'S ORDERS" 
            value="15"
            icon={ShoppingCart}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="PENDING ORDERS" 
            value="45"
            icon={Clock} 
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard 
            title="RAW MATERIAL STOCK" 
            value="1,200 sq m"
            icon={Boxes}
            iconColor="text-green-100 bg-green-500" 
          />
          <StatsCard 
            title="READY FOR DISPATCH" 
            value="28 units"
            icon={Truck}
            iconColor="text-purple-100 bg-purple-500" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Production Alerts</h2>
              <div className="space-y-2">
                <AlertCard type="error" message="Low Stock: PVC Material (150 sq meters remaining)" />
                <AlertCard type="warning" message="Delayed Production: Heavy Duty Tarpaulin 20x30 batch" />
                <AlertCard type="info" message="New bulk order received: 500 units Custom Print Tarpaulin" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Today's Production Schedule</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                  <div>
                    <p className="font-medium">Heavy Duty Tarpaulin 20x30</p>
                    <p className="text-sm text-gray-600">Batch #HD2030-001 • 25 units</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">In Progress</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                  <div>
                    <p className="font-medium">Waterproof Canvas 15x25</p>
                    <p className="text-sm text-gray-600">Batch #WC1525-002 • 30 units</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                  <div>
                    <p className="font-medium">Industrial Vinyl Tarp 10x15</p>
                    <p className="text-sm text-gray-600">Batch #IV1015-003 • 20 units</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Pending</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Quick Search</h2>
              <SearchBar placeholder="Search orders, products, or customers..." />
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">ORD127</p>
                    <p className="text-xs text-gray-600">Custom Print Tarpaulin</p>
                  </div>
                  <span className="text-xs text-blue-600">₹15,600</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">ORD126</p>
                    <p className="text-xs text-gray-600">Heavy Duty Tarpaulin</p>
                  </div>
                  <span className="text-xs text-blue-600">₹32,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">ORD125</p>
                    <p className="text-xs text-gray-600">Fire Retardant Tarp</p>
                  </div>
                  <span className="text-xs text-blue-600">₹28,900</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
