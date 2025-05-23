
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
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
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
            title="TOTAL STOCK AVAILABLE" 
            value="1200"
            icon={Boxes}
            iconColor="text-green-100 bg-green-500" 
          />
          <StatsCard 
            title="THIS MONTH'S DISPATCH" 
            value="350"
            icon={Truck}
            iconColor="text-purple-100 bg-purple-500" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Alerts</h2>
              <div className="space-y-2">
                <AlertCard type="error" message="Low Stock: Product A" />
                <AlertCard type="warning" message="Delayed Dispatch: Order #ORD110" />
              </div>
            </div>
            
            {/* Add more dashboard content here */}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Quick Search</h2>
              <SearchBar placeholder="Search by Order ID or Customer Name..." />
            </div>
            
            {/* Add more sidebar widgets here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
