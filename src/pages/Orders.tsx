import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AddOrderForm from "@/components/forms/AddOrderForm";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Filter } from "lucide-react";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import RemarksComponent from "@/components/remark/remark";

// Mock data for tarpaulin orders
const MOCK_ORDERS = [
  { id: "ORD123", customer: "John Doe", product: "Heavy Duty Tarpaulin 20x30", quantity: 5, date: "2025-05-20", status: "Pending" },
  { id: "ORD124", customer: "Sarah Smith", product: "Waterproof Canvas 15x25", quantity: 2, date: "2025-05-20", status: "Dispatched" },
  { id: "ORD125", customer: "Michael Johnson", product: "Industrial Vinyl Tarp 10x15", quantity: 7, date: "2025-05-20", status: "Completed" },
  { id: "ORD126", customer: "Emma Wilson", product: "Custom Print Tarpaulin 12x18", quantity: 1, date: "2025-05-19", status: "Pending" },
  { id: "ORD127", customer: "Robert Brown", product: "Fire Retardant Tarp 25x40", quantity: 4, date: "2025-05-19", status: "Cancelled" }
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending Orders" },
    { id: "dispatched", label: "Dispatched" },
    { id: "cancelled", label: "Cancelled" }
  ];

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
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heavy-duty">Heavy Duty Tarpaulin</SelectItem>
                    <SelectItem value="waterproof">Waterproof Canvas</SelectItem>
                    <SelectItem value="vinyl">Industrial Vinyl Tarp</SelectItem>
                    <SelectItem value="custom">Custom Print Tarpaulin</SelectItem>
                    <SelectItem value="fire-retardant">Fire Retardant Tarp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <Input
                  placeholder="Enter customer name"
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                />
              </div>
            </div>
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
        <RemarksComponent/>
      </div>
    </div>
  );
};

export default Orders;
