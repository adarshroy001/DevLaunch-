
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { orderBookMockOrders, ORDER_BOOK_STATUSES } from "@/data/orderBookMockData";
import type { OrderBookEntry } from "@/types";
import { ArrowLeft, Printer, Save } from "lucide-react";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<OrderBookEntry | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<string>("");

  useEffect(() => {
    const foundOrder = orderBookMockOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setCurrentStatus(foundOrder.status);
      setCurrentItems(foundOrder.items);
    } else {
      // Handle order not found, e.g., navigate to a 404 page or show error
      toast({ title: "Error", description: "Order not found.", variant: "destructive" });
      navigate("/orderbook");
    }
  }, [orderId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleStatusUpdate = () => {
    if (order) {
      // In a real app, this would be an API call
      // For now, update local state of this page and show toast
      setOrder(prev => prev ? { ...prev, status: currentStatus } : null);
      toast({ title: "Status Updated", description: `Order ${order.id} status changed to ${currentStatus}.` });
    }
  };

  const handleProductUpdate = () => {
    if (order) {
      // In a real app, this would be an API call
      setOrder(prev => prev ? { ...prev, items: currentItems } : null);
      toast({ title: "Product Updated", description: `Order ${order.id} product details updated.` });
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p>Loading order details or order not found...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="outline" onClick={() => navigate("/orderbook")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Order Book
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order ID: {order.id}</CardTitle>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print Order
              </Button>
            </div>
            <CardDescription>Customer: {order.customer} | Date: {order.date}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Status</Label>
              <div className="mt-1">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
            <div>
              <Label>Product Details</Label>
              <p>{order.items}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="status-update">New Status</Label>
                <Select value={currentStatus} onValueChange={setCurrentStatus}>
                  <SelectTrigger id="status-update">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_BOOK_STATUSES.map(statusVal => (
                      <SelectItem key={statusVal} value={statusVal}>
                        {statusVal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStatusUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Status
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="product-update">New Product Details</Label>
                <Input
                  id="product-update"
                  value={currentItems}
                  onChange={(e) => setCurrentItems(e.target.value)}
                  placeholder="Enter new product details"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProductUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
