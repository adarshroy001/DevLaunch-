import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import {
  getDashboardSummary,
  getSalesReport,
  getProductionReport,
  getInventoryReport,
  getCustomerAnalysis,
} from "@/api/report";
import { Skeleton } from "@/components/ui/skeleton";

const Reports = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [salesData, setSalesData] = useState<any>(null);
  const [productionData, setProductionData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);

  // Fetch dashboard data when timeframe changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dashboard, sales, production, inventory, customers] =
          await Promise.all([
            getDashboardSummary(timeframe),
            getSalesReport(timeframe),
            getProductionReport(timeframe),
            getInventoryReport(),
            getCustomerAnalysis(timeframe),
          ]);

        setDashboardData(dashboard);
        setSalesData(sales);
        setProductionData(production);
        setInventoryData(inventory);
        setCustomerData(customers);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
            value={`₹${
              dashboardData?.summary?.totalRevenue?.toLocaleString() || "0"
            }`}
            icon={DollarSign}
            iconColor="text-green-100 bg-green-500"
          />
          <StatsCard
            title="ORDERS COMPLETED"
            value={
              dashboardData?.summary?.completedOrders?.toLocaleString() || "0"
            }
            icon={Package}
            iconColor="text-blue-100 bg-blue-500"
          />
          <StatsCard
            title="ACTIVE CUSTOMERS"
            value={
              dashboardData?.summary?.activeCustomers?.toLocaleString() || "0"
            }
            icon={Users}
            iconColor="text-purple-100 bg-purple-500"
          />
          <StatsCard
            title="PRODUCTION UNITS"
            value={
              dashboardData?.summary?.productionUnits?.toLocaleString() || "0"
            }
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
                  <CardDescription>
                    Monthly sales performance for tarpaulin products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    {salesData?.salesTrends?.length > 0 ? (
                      <p className="text-gray-500">
                        Sales Chart Placeholder (Data available)
                      </p>
                    ) : (
                      <p className="text-gray-500">No sales data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>
                    Best performing tarpaulin products this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.topProducts?.length > 0 ? (
                      dashboardData.topProducts.map(
                        (product: any, index: number) => (
                          <div
                            key={index}
                            className={`flex justify-between items-center p-3 ${
                              index % 4 === 0
                                ? "bg-blue-50"
                                : index % 4 === 1
                                ? "bg-green-50"
                                : index % 4 === 2
                                ? "bg-purple-50"
                                : "bg-amber-50"
                            } rounded-md`}
                          >
                            <span className="font-medium">{product.name}</span>
                            <span
                              className={`font-semibold ${
                                index % 4 === 0
                                  ? "text-blue-600"
                                  : index % 4 === 1
                                  ? "text-green-600"
                                  : index % 4 === 2
                                  ? "text-purple-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {product.unitsSold} units
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">No product data available</p>
                    )}
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
                  <CardDescription>
                    Daily production vs target metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Target Daily Production</span>
                      <span className="font-semibold">
                        {productionData?.productionEfficiency?.targetDaily || 0}{" "}
                        units
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Actual Daily Average</span>
                      <span className="font-semibold text-green-600">
                        {productionData?.productionEfficiency?.actualDaily?.toFixed(
                          1
                        ) || 0}{" "}
                        units
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Efficiency Rate</span>
                      <span className="font-semibold text-blue-600">
                        {productionData?.productionEfficiency?.efficiencyRate?.toFixed(
                          1
                        ) || 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            productionData?.productionEfficiency
                              ?.efficiencyRate || 0,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Material Usage</CardTitle>
                  <CardDescription>
                    Raw material consumption this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {productionData?.materialUsage?.length > 0 ? (
                      productionData.materialUsage.map(
                        (material: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>{material.name}</span>
                            <span className="font-medium">
                              {material.amount_used?.toLocaleString()}{" "}
                              {material.unit}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">
                        No material usage data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Status</CardTitle>
                <CardDescription>
                  Stock levels and reorder alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Out of Stock */}
                  {inventoryData?.outOfStock?.map((item: any) => (
                    <div key={item.name} className="p-4 border rounded-md">
                      <h4 className="font-medium text-red-600">Out of Stock</h4>
                      <p className="text-sm text-gray-600">
                        {item.name} - {item.stock} {item.unit} remaining
                      </p>
                    </div>
                  ))}

                  {/* Low Stock */}
                  {inventoryData?.lowStock?.map((item: any) => (
                    <div key={item.name} className="p-4 border rounded-md">
                      <h4 className="font-medium text-amber-600">Low Stock</h4>
                      <p className="text-sm text-gray-600">
                        {item.name} - {item.stock} {item.unit} remaining
                      </p>
                    </div>
                  ))}

                  {/* Healthy Stock */}
                  {inventoryData?.healthyStock?.slice(0, 1).map((item: any) => (
                    <div key={item.name} className="p-4 border rounded-md">
                      <h4 className="font-medium text-green-600">Good Stock</h4>
                      <p className="text-sm text-gray-600">
                        {item.name} - {item.stock} {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>
                    Customer distribution by order value
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerData?.customerSegments?.map(
                      (segment: any, index: number) => (
                        <div
                          key={index}
                          className={`flex justify-between items-center p-3 ${
                            segment.segment === "Enterprise"
                              ? "bg-blue-50"
                              : segment.segment === "Medium Business"
                              ? "bg-green-50"
                              : "bg-amber-50"
                          } rounded-md`}
                        >
                          <span>{segment.segment}</span>
                          <span className="font-semibold">
                            {segment.customer_count} (₹
                            {segment.total_value?.toLocaleString()})
                          </span>
                        </div>
                      )
                    )}
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
                      <span className="font-semibold text-green-600">
                        {customerData?.repeatCustomerMetrics?.repeatCustomerRate?.toFixed(
                          1
                        ) || 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value</span>
                      <span className="font-semibold">
                        ₹
                        {customerData?.repeatCustomerMetrics?.avgOrderValue?.toLocaleString() ||
                          0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Lifetime Value</span>
                      <span className="font-semibold">
                        ₹
                        {customerData?.repeatCustomerMetrics?.customerLifetimeValue?.toLocaleString() ||
                          0}
                      </span>
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
