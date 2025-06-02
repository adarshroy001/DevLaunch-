import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AddOrderForm from "@/components/forms/AddOrderForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Filter, X } from "lucide-react";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { Link } from "react-router-dom";

// Mock data for tarpaulin orders
const MOCK_ORDERS = [
  { id: "ORD123", customer: "John Doe", product: "Heavy Duty Tarpaulin 20x30", quantity: 5, date: "2025-05-20", status: "Pending" },
  { id: "ORD124", customer: "Sarah Smith", product: "Waterproof Canvas 15x25", quantity: 2, date: "2025-05-20", status: "Dispatched" },
  { id: "ORD125", customer: "Michael Johnson", product: "Industrial Vinyl Tarp 10x15", quantity: 7, date: "2025-05-20", status: "Completed" },
  { id: "ORD126", customer: "Emma Wilson", product: "Custom Print Tarpaulin 12x18", quantity: 1, date: "2025-05-19", status: "Pending" },
  { id: "ORD127", customer: "Robert Brown", product: "Fire Retardant Tarp 25x40", quantity: 4, date: "2025-05-19", status: "Cancelled" }
];

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "All Status",
    products: [],
    startDate: "",
    endDate: ""
  });

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending Orders" },
    { id: "dispatched", label: "Dispatched" },
    { id: "cancelled", label: "Cancelled" }
  ];

  const handleProductChange = (product, checked) => {
    setFilters(prev => ({
      ...prev,
      products: checked
        ? [...prev.products, product]
        : prev.products.filter(p => p !== product)
    }));
  };

  const handleApplyFilters = () => {
    // Apply filter logic here
    setIsFilterModalOpen(false);
  };

  const handleClearAll = () => {
    setFilters({
      status: "All Status",
      products: [],
      startDate: "",
      endDate: ""
    });
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
            <AddOrderForm onClose={() => setIsAddOrderOpen(false)} />
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex py-0 px-6">
              <button 
                  className={`px-3 my-2 text-sm rounded-md ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setFilter('all')}
                >
                  All Orders
                </button>
              {/* Filter Section - Updated */}
              <div className="my-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex space-x-4">
                    <button
                      className="px-3 py-1.5 text-sm rounded-md text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => setIsFilterModalOpen(true)}
                    >
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

            </nav>
          </div>



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
                {MOCK_ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="pl-10">{order.quantity}</TableCell>
                    <TableCell className="text-gray-500">{order.date}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <Link to={`/orderbook/${order.id}`} className="text-blue-600 hover:text-blue-900 text-center px-4">
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Showing 5 of 124 orders</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Dispatched</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
              <div className="space-y-2">
                {['Heavy Duty Tarpaulin', 'Waterproof Canvas', 'Industrial Vinyl Tarp', 'Custom Print Tarpaulin', 'Fire Retardant Tarp'].map((product) => (
                  <label key={product} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.products.includes(product)}
                      onChange={(e) => handleProductChange(product, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{product}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
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

export default Orders;