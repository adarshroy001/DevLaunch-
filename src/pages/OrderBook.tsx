import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { orderBookMockOrders } from "@/data/orderBookMockData";
import { ShoppingCart, Clock, CheckCircle, Filter, X } from "lucide-react";
import { filterOrders, getOrders } from "@/api/order";

const OrderBook = () => {
  const [filter, setFilter] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "All Status",
    products: [],
    startDate: "",
    endDate: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const handleApplyFilters = async () => {
    try {
      const params = {
        page: 1,
        limit: pagination.limit,
        ...filters,
      };

      let response;
      try {
        response = await filterOrders(params);
      } catch (filterError: any) {
        if (filterError.response?.status === 404) {
          response = await getOrders(params);
        } else {
          throw filterError;
        }
      }

      if (response.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Failed to filter orders");
      }

      setIsFilterModalOpen(false);
    } catch (err: any) {
      console.error("Error filtering orders:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to filter orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      handlePageChange(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      handlePageChange(pagination.page + 1);
    }
  };

  const handleProductChange = (product, checked) => {
    setFilters((prev) => ({
      ...prev,
      products: checked
        ? [...prev.products, product]
        : prev.products.filter((p) => p !== product),
    }));
  };

  const handleClearAll = () => {
    setFilters({
      status: "All Status",
      products: [],
      startDate: "",
      endDate: "",
    });
  };

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
                />
              </div>
            </div>
          </div>

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
                {orderBookMockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items}
                    </td>
                    <td className="pr-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/orderbook/${order.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing {orderBookMockOrders.length} of{" "}
                {orderBookMockOrders.length} orders
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700">
                  Next
                </button>
              </div>
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
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBook;
