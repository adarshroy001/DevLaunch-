
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for low stock items - replace with actual data fetching
const MOCK_LOW_STOCK_ITEMS = [
  { id: "MAT001", name: "PVC Material", stock: "150 sq m", threshold: "200 sq m" },
  { id: "PROD002", name: "Medium Duty Tarpaulin 10x15", stock: "10 units", threshold: "20 units" },
];

const LowStockAlertsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/inventory">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inventory
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Review items that are currently low in stock and need reordering.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {MOCK_LOW_STOCK_ITEMS.length > 0 ? (
              <ul className="space-y-3">
                {MOCK_LOW_STOCK_ITEMS.map(item => (
                  <li key={item.id} className="p-4 border rounded-md flex justify-between items-center hover:bg-amber-50">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name} <span className="text-sm text-gray-500">({item.id})</span></p>
                      <p className="text-sm text-red-600">Current Stock: {item.stock}</p>
                      <p className="text-sm text-gray-500">Threshold: {item.threshold}</p>
                    </div>
                    <Button variant="outline" size="sm">Reorder</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items are currently low on stock.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LowStockAlertsPage;
