
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import AlertCard from "@/components/ui/AlertCard";
import SearchBar from "@/components/ui/SearchBar";
import { ShoppingCart, Clock, Truck, Boxes } from "lucide-react";
import { fetchDashboardData, searchDashboard } from "@/api/dashboard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapAlertType = (type: string) => {
  switch (type) {
    case "STOCK":
      return "error";
    case "PRODUCTION":
      return "warning";
    case "ORDER":
      return "info";
    default:
      return "info"; // fallback
  }
};


  useEffect(() => {
    setLoading(true);
    fetchDashboardData()
      .then((data) => {
        setDashboard(data.data)
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  //search 
  const handleSearch = async (query: string) => {
    try {
      const results = await searchDashboard(query);
      console.log("Search results:", results.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log('Data is ::', dashboard);
  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tarpaulin Manufacturing Dashboard</h1>
        {/* top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="TODAY'S ORDERS"
            value={dashboard?.todaysOrders ?? 'N/A'}
            icon={ShoppingCart}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard
            title="PENDING ORDERS"
            value={dashboard?.ordersStatus?.pending ?? 'N/A'}
            icon={Clock}
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard
            title="RAW MATERIAL STOCK"
            value={dashboard?.rawMaterialStock ?? 'N/A'}
            icon={Boxes}
            iconColor="text-green-100 bg-green-500"
          />
          <StatsCard
            title="READY FOR DISPATCH"
            value={dashboard?.readyForDispatch ?? 'N/A'}
            icon={Truck}
            iconColor="text-purple-100 bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Production Alerts */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Production Alerts</h2>
              <div className="space-y-2">
                {dashboard?.productionAlerts && dashboard.productionAlerts.length > 0 ? (
                  dashboard.productionAlerts.map((alert, index) => (
                    <AlertCard key={index} type={mapAlertType(alert.type)} message={alert.message} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No production alerts</p>
                )}
              </div>
            </div>

            {/* Today's Production Schedule */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Today's Production Schedule</h2>
              <div className="space-y-3">
                {dashboard?.productionSchedule && dashboard.productionSchedule.length > 0 ? (
                  dashboard.productionSchedule.map((batch, index) => {
                    let bgColor = "bg-blue-50";
                    let textColor = "bg-blue-100 text-blue-800";

                    if (batch.status === "COMPLETED") {
                      bgColor = "bg-green-50";
                      textColor = "bg-green-100 text-green-800";
                    } else if (batch.status === "PENDING") {
                      bgColor = "bg-amber-50";
                      textColor = "bg-amber-100 text-amber-800";
                    }

                    return (
                      <div key={index} className={`flex justify-between items-center p-3 ${bgColor} rounded-md`}>
                        <div>
                          <p className="font-medium">{batch.productName}</p>
                          <p className="text-sm text-gray-600">Batch #{batch.batchId} • {batch.quantity} units</p>
                        </div>
                        <span className={`px-2 py-1 ${textColor} rounded text-xs`}>
                          {batch.status.replace("_", " ").toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No production scheduled today</p>
                )}
              </div>
            </div>

          </div>
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Quick Search</h2>
              <SearchBar placeholder="Search orders, products, or customers..." />
            </div>
            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {dashboard?.recentOrders && dashboard.recentOrders.length > 0 ? (
                  dashboard.recentOrders.map((order, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{order.orderId} Hello</p>
                        <p className="text-xs text-gray-600">{order.productName}</p>
                      </div>
                      <span className="text-xs text-blue-600">₹{order.total}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No recent orders</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
