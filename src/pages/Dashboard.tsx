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
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        setDashboard(data.data);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  // Search function
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchDashboard(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || "Search failed");
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Tarpaulin Manufacturing Dashboard
        </h1>

        {/* Search Results Section */}
        {searchResults && (
          <div className="mb-6 bg-white p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Search Results</h2>
              <button
                onClick={() => {
                  setSearchResults(null);
                  setSearchQuery("");
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear search
              </button>
            </div>
            {searchResults.orders?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Orders</h3>
                <div className="space-y-2">
                  {searchResults.orders.map((order, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm">Status: {order.status}</p>
                      <p className="text-sm">Customer: {order.customerName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {searchResults.products?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Products</h3>
                <div className="space-y-2">
                  {searchResults.products.map((product, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm">Stock: {product.stock}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {searchResults.customers?.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Customers</h3>
                <div className="space-y-2">
                  {searchResults.customers.map((customer, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm">Phone: {customer.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {searchResults.orders?.length === 0 &&
              searchResults.products?.length === 0 &&
              searchResults.customers?.length === 0 && (
                <p className="text-gray-500">No results found</p>
              )}
          </div>
        )}

        {/* Main Dashboard Content */}
        {!searchResults && (
          <>
            {/* Top cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="TODAY'S ORDERS"
                value={dashboard?.todaysOrders ?? "N/A"}
                icon={ShoppingCart}
                iconColor="text-blue-100 bg-blue-500"
              />
              <StatsCard
                title="PENDING ORDERS"
                value={dashboard?.ordersStatus?.pending ?? "N/A"}
                icon={Clock}
                iconColor="text-amber-100 bg-amber-500"
              />
              <StatsCard
                title="RAW MATERIAL STOCK"
                value={dashboard?.rawMaterialStock ?? "N/A"}
                icon={Boxes}
                iconColor="text-green-100 bg-green-500"
              />
              <StatsCard
                title="READY FOR DISPATCH"
                value={dashboard?.readyForDispatch ?? "N/A"}
                icon={Truck}
                iconColor="text-purple-100 bg-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Production Alerts */}
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h2 className="text-lg font-medium mb-4">
                    Production Alerts
                  </h2>
                  <div className="space-y-2">
                    {dashboard?.productionAlerts &&
                    dashboard.productionAlerts.length > 0 ? (
                      dashboard.productionAlerts.map((alert, index) => (
                        <AlertCard
                          key={index}
                          type={mapAlertType(alert.type)}
                          message={alert.message}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No production alerts
                      </p>
                    )}
                  </div>
                </div>

                {/* Today's Production Schedule */}
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h2 className="text-lg font-medium mb-4">
                    Today's Production Schedule
                  </h2>
                  <div className="space-y-3">
                    {dashboard?.productionSchedule &&
                    dashboard.productionSchedule.length > 0 ? (
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
                          <div
                            key={index}
                            className={`flex justify-between items-center p-3 ${bgColor} rounded-md`}
                          >
                            <div>
                              <p className="font-medium">{batch.productName}</p>
                              <p className="text-sm text-gray-600">
                                Batch #{batch.batchId} • {batch.quantity} units
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 ${textColor} rounded text-xs`}
                            >
                              {batch.status
                                .replace("_", " ")
                                .toLowerCase()
                                .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500">
                        No production scheduled today
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {/* Search */}
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Quick Search</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search orders, products, or customers..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isSearching || !searchQuery.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </button>
                  </div>
                </div>
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {dashboard?.recentOrders &&
                    dashboard.recentOrders.length > 0 ? (
                      dashboard.recentOrders.map((order, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {order.orderId}
                            </p>
                            <p className="text-xs text-gray-600">
                              {order.productName}
                            </p>
                          </div>
                          <span className="text-xs text-blue-600">
                            ₹{order.total}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No recent orders</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
