import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { getOrderBook, filterOrderBook, searchOrders } from "@/api/order";
import { ShoppingCart, Clock, CheckCircle, Filter, X } from "lucide-react";

const OrderBook = () => {
  const [filter, setFilter] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "All Status",
    products: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
  });

  // API state management
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    newOrders: 0,
    inProduction: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order book data on component mount
  useEffect(() => {
    fetchOrderBook();
  }, [filter, filters.searchQuery]);

  const fetchOrderBook = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (filters.searchQuery) {
        response = await searchOrders(filters.searchQuery, {
          status: filter === "all" ? undefined : filter.toUpperCase(),
        });
      } else if (filter === "all") {
        response = await getOrderBook();
      } else {
        response = await filterOrderBook({
          status: filter.toUpperCase(),
          productName: filters.products[0],
          startDate: filters.startDate,
          endDate: filters.endDate,
        });
      }

      if (response.success) {
        setOrders(response.data.orders || []);
        if (response.data.summary) {
          setStats({
            newOrders: response.data.summary.newOrders || 0,
            inProduction: response.data.summary.inProduction || 0,
            completed: response.data.summary.completed || 0,
          });
        }
      } else {
        throw new Error(response.message || "Failed to fetch order book");
      }
    } catch (err: any) {
      console.error("Error fetching order book:", err);
      setError(err.message || "Failed to fetch order book");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (product: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      products: checked
        ? [...prev.products, product]
        : prev.products.filter((p) => p !== product),
    }));
  };

  const handleApplyFilters = async () => {
    try {
      setLoading(true);
      await fetchOrderBook();
      setIsFilterModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setFilters({
      status: "All Status",
      products: [],
      startDate: "",
      endDate: "",
      searchQuery: "",
    });
    fetchOrderBook();
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Tarpaulin Order Book</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="NEW ORDERS"
            value={stats.newOrders.toString()}
            icon={ShoppingCart}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard
            title="IN PRODUCTION"
            value={stats.inProduction.toString()}
            icon={Clock}
            iconColor="text-amber-100 bg-amber-500"
          />
          <StatsCard
            title="COMPLETED TODAY"
            value={stats.completed.toString()}
            icon={CheckCircle}
            iconColor="text-green-100 bg-green-500"
          />
        </div>

        <div className="bg-white rounded-md shadow-sm mb-6">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    filter === "all"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All Orders
                </button>
                <button
                  className="px-3 py-1.5 text-sm rounded-md text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsFilterModalOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar
                  placeholder="Search orders..."
                  className="w-full sm:w-64"
                  // onSearch={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer ||
                          order.customer?.company ||
                          order.customer?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date ||
                          new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.product ||
                          order.items
                            ?.map((item: any) => item.product?.name)
                            .join(", ") ||
                          "N/A"}
                      </td>
                      <td className="pr-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/order/${order.orderId}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing {orders.length} of {orders.length} orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filter Orders</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Processing</option>
                <option>In Production</option>
                <option>Shipped</option>
                <option>Completed</option>
                <option>Delayed</option>
              </select>
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Products
              </label>
              <div className="space-y-2">
                {[
                  "Premium Tarp",
                  "Heavy Duty Waterproof",
                  "Pro Industrial Grade",
                  "Custom Brand",
                ].map((product) => (
                  <label key={product} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.products.includes(product)}
                      onChange={(e) =>
                        handleProductChange(product, e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {product}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Clear All Option */}
            <div className="mb-6">
              <button
                onClick={handleClearAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply Filters"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBook;
