import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import AlertCard from "@/components/ui/AlertCard";
import { Button } from "@/components/ui/button";
import { Boxes, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getInventorySummary,
  getLowStockAlerts,
  getRawMaterials,
  getFinishedProducts,
  searchInventory,
} from "@/api/inventory";
import { Skeleton } from "@/components/ui/skeleton";

const StockStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "IN_STOCK":
        return "bg-green-100 text-green-800";
      case "LOW_STOCK":
        return "bg-amber-100 text-amber-800";
      case "OUT_OF_STOCK":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "IN_STOCK":
        return "In Stock";
      case "LOW_STOCK":
        return "Low Stock";
      case "OUT_OF_STOCK":
        return "Out of Stock";
      default:
        return status;
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {getStatusText()}
    </span>
  );
};

const Inventory = () => {
  const [category, setCategory] = useState<"all" | "raw" | "finished">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    totalRawMaterials: 0,
    lowStockItems: 0,
    topSellingProduct: "",
    finishedProducts: 0,
  });
  const [alerts, setAlerts] = useState<any[]>([]);
  const [inventory, setInventory] = useState<{
    rawMaterials: any[];
    products: any[];
  }>({ rawMaterials: [], products: [] });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const navigate = useNavigate();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [summaryData, alertsData] = await Promise.all([
          getInventorySummary(),
          getLowStockAlerts(),
        ]);

        setSummary({
          totalRawMaterials: summaryData?.totalRawMaterials || 0,
          lowStockItems: summaryData?.lowStockItems || 0,
          topSellingProduct: summaryData?.topSellingProduct || "N/A",
          finishedProducts: summaryData?.finishedProducts || 0,
        });
        setAlerts(Array.isArray(alertsData) ? alertsData : []);

        await loadInventory();
      } catch (error) {
        console.error("Failed to load inventory data:", error);
        setError("Failed to load inventory data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Load inventory based on category and search
  const loadInventory = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (searchQuery) {
        response = await searchInventory({
          query: searchQuery,
          category:
            category === "all"
              ? undefined
              : category === "raw"
              ? "Raw Material"
              : "Finished Product",
          page,
          limit: pagination.limit,
        });

        setInventory({
          rawMaterials: Array.isArray(response?.rawMaterials)
            ? response.rawMaterials
            : [],
          products: Array.isArray(response?.products) ? response.products : [],
        });
        setPagination({
          ...pagination,
          page,
          total: response?.pagination?.total || 0,
          totalPages: response?.pagination?.totalPages || 1,
        });
      } else if (category === "raw") {
        response = await getRawMaterials({
          page,
          limit: pagination.limit,
        });
        setInventory({
          rawMaterials: Array.isArray(response?.data) ? response.data : [],
          products: [],
        });
        setPagination({
          page,
          limit: pagination.limit,
          total: response?.pagination?.total || 0,
          totalPages: response?.pagination?.totalPages || 1,
        });
      } else if (category === "finished") {
        response = await getFinishedProducts({
          page,
          limit: pagination.limit,
        });
        setInventory({
          rawMaterials: [],
          products: Array.isArray(response?.data) ? response.data : [],
        });
        setPagination({
          page,
          limit: pagination.limit,
          total: response?.pagination?.total || 0,
          totalPages: response?.pagination?.totalPages || 1,
        });
      } else {
        const [rawResponse, finishedResponse] = await Promise.all([
          getRawMaterials({
            page,
            limit: Math.ceil(pagination.limit / 2),
          }),
          getFinishedProducts({
            page,
            limit: Math.ceil(pagination.limit / 2),
          }),
        ]);

        setInventory({
          rawMaterials: Array.isArray(rawResponse?.data)
            ? rawResponse.data
            : [],
          products: Array.isArray(finishedResponse?.data)
            ? finishedResponse.data
            : [],
        });
        setPagination({
          ...pagination,
          page,
          total:
            (rawResponse?.pagination?.total || 0) +
            (finishedResponse?.pagination?.total || 0),
          totalPages: Math.max(
            rawResponse?.pagination?.totalPages || 1,
            finishedResponse?.pagination?.totalPages || 1
          ),
        });
      }
    } catch (error) {
      console.error("Failed to load inventory:", error);
      setError("Failed to load inventory items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (newCategory: "all" | "raw" | "finished") => {
    setCategory(newCategory);
    setSearchQuery("");
    loadInventory();
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadInventory();
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    loadInventory(newPage);
  };

  // Format inventory items for display with proper null checks
  const getDisplayItems = () => {
    // Ensure we have arrays to work with
    const rawMaterials = Array.isArray(inventory.rawMaterials)
      ? inventory.rawMaterials
      : [];
    const products = Array.isArray(inventory.products)
      ? inventory.products
      : [];

    if (category === "raw") {
      return rawMaterials.map((item) => ({
        ...item,
        category: "Raw Material",
      }));
    } else if (category === "finished") {
      return products.map((item) => ({
        ...item,
        category: "Finished Product",
      }));
    } else {
      return [
        ...rawMaterials.map((item) => ({
          ...item,
          category: "Raw Material",
        })),
        ...products.map((item) => ({
          ...item,
          category: "Finished Product",
        })),
      ].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Tarpaulin Inventory Management
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="RAW MATERIALS"
              value={`${summary.totalRawMaterials} sq m`}
              icon={Boxes}
              iconColor="text-blue-100 bg-blue-500"
            />
            <StatsCard
              title="LOW STOCK ALERTS"
              value={summary.lowStockItems.toString()}
              icon={AlertTriangle}
              iconColor="text-amber-100 bg-amber-500"
            />
            <StatsCard
              title="TOP SELLING"
              value={summary.topSellingProduct}
              icon={TrendingUp}
              iconColor="text-green-100 bg-green-500"
            />
            <StatsCard
              title="FINISHED PRODUCTS"
              value={`${summary.finishedProducts} units`}
              icon={TrendingDown}
              iconColor="text-purple-100 bg-purple-500"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Inventory Alerts</h2>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-md" />
                ))}
              </div>
            ) : alerts.length > 0 ? (
              <div className="space-y-2">
                {alerts.slice(0, 3).map((alert, index) => (
                  <AlertCard
                    key={index}
                    type={alert.status === "OUT_OF_STOCK" ? "error" : "warning"}
                    message={`${
                      alert.status === "OUT_OF_STOCK"
                        ? "Out of Stock"
                        : "Low Stock"
                    }: ${alert.name || "Unknown Item"} (${alert.stock || 0} ${
                      alert.unit || ""
                    } remaining)`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active alerts</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate("/inventory/add-raw-material")}
              >
                Add Raw Material
              </Button>
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => navigate("/inventory/add-finished-product")}
              >
                Add Finished Product
              </Button>
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => navigate("/inventory/generate-report")}
              >
                Generate Inventory Report
              </Button>
              <Button
                className="w-full bg-amber-600 text-white hover:bg-amber-700"
                onClick={() => navigate("/inventory/low-stock-alerts")}
              >
                View All Alerts ({summary.lowStockItems})
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    category === "all"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryChange("all")}
                >
                  All Items
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    category === "raw"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryChange("raw")}
                >
                  Raw Materials
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    category === "finished"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryChange("finished")}
                >
                  Finished Products
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar
                  placeholder="Search inventory..."
                  className="w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onSearch={() => handleSearch(searchQuery)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-md" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getDisplayItems().length > 0 ? (
                      getDisplayItems().map((item) => (
                        <tr
                          key={item.itemId || item.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {item.itemId || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.category || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.stock || 0} {item.unit || ""}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StockStatusBadge
                              status={item.status || "UNKNOWN"}
                            />
                          </td>
                          <td className="px-10 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(
                                  `/inventory/${
                                    item.category === "Raw Material"
                                      ? "raw-materials"
                                      : "finished-products"
                                  }/${item.id}`
                                )
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No inventory items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pagination.total > 0 && (
                <div className="px-6 py-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}{" "}
                      of {pagination.total} items
                    </p>
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
                        disabled={pagination.page === 1}
                        onClick={() => handlePageChange(pagination.page - 1)}
                      >
                        Previous
                      </button>
                      <button
                        className="px-3 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => handlePageChange(pagination.page + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
