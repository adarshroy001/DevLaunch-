
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Package, Users } from "lucide-react";

const Reports = () => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <div className="flex space-x-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="TOTAL REVENUE" 
            value="₹12,45,000"
            icon={DollarSign}
            iconColor="text-green-100 bg-green-500"
          />
          <StatsCard 
            title="ORDERS COMPLETED" 
            value="342"
            icon={Package} 
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard 
            title="ACTIVE CUSTOMERS" 
            value="89"
            icon={Users}
            iconColor="text-purple-100 bg-purple-500" 
          />
          <StatsCard 
            title="PRODUCTION UNITS" 
            value="1,567"
            icon={BarChart3}
            iconColor="text-amber-100 bg-amber-500" 
          />
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales Report</TabsTrigger>
            <TabsTrigger value="production">Production Report</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
            <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Sales Trends
                  </CardTitle>
                  <CardDescription>Monthly sales performance for tarpaulin products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Sales Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing tarpaulin products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                      <span className="font-medium">Heavy Duty Tarpaulin 20x30</span>
                      <span className="text-blue-600 font-semibold">156 units</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                      <span className="font-medium">Waterproof Canvas 15x25</span>
                      <span className="text-green-600 font-semibold">142 units</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                      <span className="font-medium">Industrial Vinyl Tarp 10x15</span>
                      <span className="text-purple-600 font-semibold">98 units</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <span className="font-medium">Custom Print Tarpaulin</span>
                      <span className="text-amber-600 font-semibold">87 units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Efficiency</CardTitle>
                  <CardDescription>Daily production vs target metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Target Daily Production</span>
                      <span className="font-semibold">50 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Actual Daily Average</span>
                      <span className="font-semibold text-green-600">47 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Efficiency Rate</span>
                      <span className="font-semibold text-blue-600">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Material Usage</CardTitle>
                  <CardDescription>Raw material consumption this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>PVC Material</span>
                      <span className="font-medium">2,340 sq meters</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Canvas Fabric</span>
                      <span className="font-medium">1,890 sq meters</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vinyl Sheets</span>
                      <span className="font-medium">1,567 sq meters</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reinforcement Thread</span>
                      <span className="font-medium">45 kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Status</CardTitle>
                <CardDescription>Stock levels and reorder alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium text-red-600">Low Stock Alert</h4>
                    <p className="text-sm text-gray-600">PVC Material - 150 sq meters remaining</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium text-amber-600">Medium Stock</h4>
                    <p className="text-sm text-gray-600">Canvas Fabric - 450 sq meters</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium text-green-600">Good Stock</h4>
                    <p className="text-sm text-gray-600">Vinyl Sheets - 800 sq meters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Customer distribution by order value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                      <span>Enterprise Customers</span>
                      <span className="font-semibold">24 (₹8,45,000)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                      <span>Medium Business</span>
                      <span className="font-semibold">45 (₹2,89,000)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-md">
                      <span>Small Orders</span>
                      <span className="font-semibold">89 (₹1,11,000)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Repeat Customers</CardTitle>
                  <CardDescription>Customer retention metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Repeat Customer Rate</span>
                      <span className="font-semibold text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value</span>
                      <span className="font-semibold">₹36,400</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Lifetime Value</span>
                      <span className="font-semibold">₹1,45,600</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
