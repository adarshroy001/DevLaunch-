import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import AddOrderForm from "@/components/forms/AddOrderForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Filter, X } from "lucide-react";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { Link } from "react-router-dom";
import {
  createOrder,
  getOrders,
  searchOrders,
  filterOrders,
  getDispatchedOrders,
  getPendingOrders,
  getCancelledOrders,
} from "@/api/order";
import { mockOrders } from "@/data/orderBookMockData";

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    fetchOrders();
  }, [pagination.page, filter, filters.searchQuery]);

  const fetchOrders = async (filterParams: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filterParams,
      };

      let response;
      if (filters.searchQuery) {
        response = await searchOrders(filters.searchQuery, params);
      } else if (filter === "pending") {
        response = await getPendingOrders(params);
      } else if (filter === "dispatched") {
        response = await getDispatchedOrders(params);
      } else if (filter === "cancelled") {
        response = await getCancelledOrders(params);
      } else {
        response = await getOrders(params);
      }

      if (response.success) {
        // setOrders(response.data.orders);
        setOrders(mockOrders);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Failed to fetch orders");
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (orderData: any) => {
    try {
      setLoading(true);
      const response = await createOrder(orderData);
      if (response.success) {
        setIsAddOrderOpen(false);
        fetchOrders(); // Refresh the orders list
      }
    } catch (err: any) {
      setError(err.message || "Failed to create order");
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
      setError(null);

      const filterParams: any = {};

      if (filters.status !== "All Status") {
        filterParams.status = filters.status.toUpperCase().replace(" ", "_");
      }

      if (filters.products.length > 0) {
        filterParams.productType = filters.products[0];
      }

      if (filters.startDate) {
        filterParams.startDate = filters.startDate;
      }

      if (filters.endDate) {
        filterParams.endDate = filters.endDate;
      }

      const params = {
        page: 1, // Reset to first page when filtering
        limit: pagination.limit,
        ...filterParams,
      };

      const response = await filterOrders(params);

      if (response.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Failed to filter orders");
      }

      setIsFilterModalOpen(false);
    } catch (err: any) {
      console.error("Error filtering orders:", err);
      setError(err.message || "Failed to filter orders");
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
    fetchOrders();
  };

  const handlePageChange = (newPage: number) => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Order
              </Button>
            </DialogTrigger>
            <AddOrderForm
              onClose={() => setIsAddOrderOpen(false)}
              onSubmit={handleCreateOrder}
            />
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs and Search */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex space-x-4">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${filter === "all"
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
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search orders..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                  className="w-full sm:w-64 "
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Search</Button>
              </form>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">ORDER ID</TableHead>
                  <TableHead>CUSTOMER NAME</TableHead>
                  <TableHead>PRODUCT</TableHead>
                  <TableHead className="w-24">QUANTITY</TableHead>
                  <TableHead className="w-32">DATE</TableHead>
                  <TableHead className="w-32">STATUS</TableHead>
                  <TableHead className="w-32">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-blue-600 min-w-40">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        {order.customerName ||
                          order.customer?.company ||
                          order.customer?.name}
                      </TableCell>
                      <TableCell>
                        {order.product ||
                          (order.items && order.items.length > 0
                            ? order.items[0].itemName
                            : "N/A")}
                      </TableCell>
                      <TableCell className="pl-10">
                        {order.quantity ||
                          (order.items?.reduce(
                            (sum: number, item: any) => sum + Number(item.quantity || 0),
                            0
                          ) || 0)}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {order.date ||
                          (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A")}
                      </TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/order/${order.id}`}
                          className="text-blue-600 hover:text-blue-900 text-center px-4"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing {orders.length} of {pagination.total} orders
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={pagination.page <= 1 || loading}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={pagination.page >= pagination.totalPages || loading}
                >
                  Next
                </Button>
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
                <option>Pending</option>
                <option>Processing</option>
                <option>In Production</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Products
              </label>
              <div className="space-y-2">
                {[
                  "Heavy Duty Tarpaulin",
                  "Waterproof Canvas",
                  "Industrial Vinyl Tarp",
                  "Custom Print Tarpaulin",
                  "Fire Retardant Tarp",
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

export default Orders;