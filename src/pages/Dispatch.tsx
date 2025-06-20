import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/cards/StatsCard";
import SearchBar from "@/components/ui/SearchBar";
import { Truck, Package, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createDispatch,
  getTodayDispatches,
  getAllDispatches,
  searchShipments,
  getDeliveredShipments,
  getInTransitShipments,
} from "@/api/dispatch";

const DispatchStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "bg-blue-100 text-blue-800";
      case "IN_TRANSIT":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "DELAYED":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "Ready for Pickup";
      case "IN_TRANSIT":
        return "In Transit";
      case "DELIVERED":
        return "Delivered";
      case "DELAYED":
        return "Delayed";
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

const Dispatch = () => {
  const [filter, setFilter] = useState<"all" | "transit" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todaysDispatches: 0,
    pendingShipments: 0,
    deliveredToday: 0,
    delayedShipments: 0,
  });
  const [todayDispatches, setTodayDispatches] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const todayData = await getTodayDispatches();
        const todayCount = todayData?.todaysDispatches || 0;
        const recentDispatches = todayData?.recentDispatches || [];

        setStats({
          todaysDispatches: todayCount,
          pendingShipments: 0,
          deliveredToday: 0,
          delayedShipments: 0,
        });
        setTodayDispatches(recentDispatches);

        await loadShipments();
      } catch (err) {
        console.error("Failed to load dispatch data:", err);
        setError("Failed to load dispatch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Load shipments based on filter and search
  const loadShipments = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (searchQuery) {
        response = await searchShipments({
          query: searchQuery,
          status:
            filter === "all"
              ? undefined
              : filter === "transit"
              ? "IN_TRANSIT"
              : "DELIVERED",
          page,
          limit: pagination.limit,
        });
      } else if (filter === "transit") {
        response = await getInTransitShipments({
          page,
          limit: pagination.limit,
        });
      } else if (filter === "delivered") {
        response = await getDeliveredShipments({
          page,
          limit: pagination.limit,
        });
      } else {
        response = await getAllDispatches({
          page,
          limit: pagination.limit,
        });
      }

      // Handle potential undefined responses
      const data = response?.data || [];
      const total = response?.pagination?.total || 0;
      const totalPages = response?.pagination?.totalPages || 1;

      setShipments(data);
      setPagination({
        ...pagination,
        page,
        total,
        totalPages,
      });

      // Update stats based on fetched data
      if (filter === "all") {
        const pending = data.filter(
          (shipment: any) => shipment.status === "READY_FOR_PICKUP"
        ).length;
        const delivered = data.filter(
          (shipment: any) => shipment.status === "DELIVERED"
        ).length;
        const delayed = data.filter(
          (shipment: any) => shipment.status === "DELAYED"
        ).length;

        setStats((prev) => ({
          ...prev,
          pendingShipments: pending,
          deliveredToday: delivered,
          delayedShipments: delayed,
        }));
      }
    } catch (err) {
      console.error("Failed to load shipments:", err);
      setError("Failed to load shipments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: "all" | "transit" | "delivered") => {
    setFilter(newFilter);
    setSearchQuery("");
    loadShipments();
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadShipments();
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    loadShipments(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dispatch</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="TODAY'S DISPATCHES"
              value={stats.todaysDispatches.toString()}
              icon={Truck}
              iconColor="text-blue-100 bg-blue-500"
            />
            <StatsCard
              title="PENDING SHIPMENTS"
              value={stats.pendingShipments.toString()}
              icon={Package}
              iconColor="text-amber-100 bg-amber-500"
            />
            <StatsCard
              title="DELIVERED TODAY"
              value={stats.deliveredToday.toString()}
              icon={CheckCircle}
              iconColor="text-green-100 bg-green-500"
            />
            <StatsCard
              title="DELAYED SHIPMENTS"
              value={stats.delayedShipments.toString()}
              icon={AlertTriangle}
              iconColor="text-red-100 bg-red-500"
            />
          </div>
        )}

        <div className="bg-white rounded-md shadow-sm mb-6">
          <div className="p-6">
            <div>
              <h2 className="text-lg font-medium mb-4">
                Today's Dispatch Status
              </h2>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 rounded-md" />
                  ))}
                </div>
              ) : todayDispatches.length > 0 ? (
                <div className="space-y-3">
                  {todayDispatches.map((dispatchItem) => (
                    <div
                      key={dispatchItem.id}
                      className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                          <Info size={16} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {dispatchItem.customer || "Unknown Customer"}
                        </p>
                        <div className="text-sm text-gray-600">
                          Order {dispatchItem.order?.orderId || "N/A"}:{" "}
                          <DispatchStatusBadge
                            status={dispatchItem.status || "UNKNOWN"}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No dispatch information for today.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    filter === "all"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("all")}
                >
                  All Shipments
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    filter === "transit"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("transit")}
                >
                  In Transit
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    filter === "delivered"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("delivered")}
                >
                  Delivered
                </button>
              </div>
              <div className="flex gap-5 justify-center items-center">
                <div>
                  <Link
                    to="/create-shipment"
                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors text-sm"
                  >
                    Create New Challan
                  </Link>
                </div>
                <div className="w-full sm:w-auto">
                  {/* <SearchBar
                    placeholder="Search shipments..."
                    className="w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onSearch={() => handleSearch(searchQuery)}
                  /> */}
                </div>
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
                        Dispatch ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carrier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shipments.length > 0 ? (
                      shipments.map((shipment) => (
                        <tr
                          key={shipment.id || shipment.dispatchId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {shipment.dispatchId || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {shipment.order?.orderId || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {shipment.customer || "Unknown Customer"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <DispatchStatusBadge
                              status={shipment.status || "UNKNOWN"}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shipment.createdAt
                              ? new Date(shipment.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {shipment.carrier || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                            {shipment.trackingId || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              onClick={() =>
                                navigate(
                                  `/dispatch/${
                                    shipment.id || shipment.dispatchId
                                  }`
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
                          colSpan={8}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No shipments found
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
                      of {pagination.total} shipments
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

export default Dispatch;
