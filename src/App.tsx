
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderBook from "./pages/OrderBook";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Inventory from "./pages/Inventory";
import AddRawMaterialPage from "./pages/AddRawMaterialPage"; 
import AddFinishedProductPage from "./pages/AddFinishedProductPage"; 
import InventoryReportPage from "./pages/InventoryReportPage"; 
import LowStockAlertsPage from "./pages/LowStockAlertsPage"; 
import Dispatch from "./pages/Dispatch";
import CreateShipmentPage from "./pages/CreateShipmentPage";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import OrderListsPage from "./pages/OrderLists";
import ItemDetailsPage from "./pages/ItemDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderbook" element={<OrderBook />} />
          <Route path="/orderbook/:orderId" element={<OrderDetailsPage />} />
          <Route path="/order/:orderId/lists" element={<OrderListsPage />} />
          <Route path="/orders/:orderId/items/:itemId" element={<ItemDetailsPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add-raw-material" element={<AddRawMaterialPage />} /> {/* New route */}
          <Route path="/inventory/add-finished-product" element={<AddFinishedProductPage />} /> {/* New route */}
          <Route path="/inventory/generate-report" element={<InventoryReportPage />} /> {/* New route */}
          <Route path="/inventory/low-stock-alerts" element={<LowStockAlertsPage />} /> {/* New route */}
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/create-shipment" element={<CreateShipmentPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
