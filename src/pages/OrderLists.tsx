import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import OrderStatusBadge from "@/components/shared/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { mockOrders } from "@/data/orderBookMockData";
import type { OrderBookEntry } from "@/types";
import { ArrowLeft } from "lucide-react";

const OrderListsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<OrderBookEntry | null>(null);
    const [items, setItems] = useState<any[]>([]);
    
    useEffect(() => {
        const foundOrder = mockOrders.find(o => o.id === orderId);
        if (foundOrder) {
            setOrder(foundOrder as OrderBookEntry);
            setItems(foundOrder.items || []);
        } else {
            toast({ title: "Error", description: "Order not found.", variant: "destructive" });
            navigate("/orderbook");
        }
    }, [orderId, navigate]);

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
                <Button variant="outline" onClick={() => navigate("/orders")} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders 
                </Button>

                <Card className="mb-6">
                    <CardHeader className="mb-1 pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Order ID: {order.id}</CardTitle>
                                <CardDescription className="mt-1">Customer: {order.customerName} | Date: {order.date}</CardDescription>
                            </div>
                            <OrderStatusBadge status={order.status} />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-700">Total Items:</Label>
                                <span className="ml-2 text-sm">{order.items.length}</span>
                            </div>
                            {order.mainRemark && (
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Remark:</Label>
                                    <span className="ml-2 text-sm">{order.mainRemark}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Items List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Order Items</CardTitle>
                        <CardDescription>Items included in this order</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {items.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No items added yet. Click "Add Item" to get started.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={index} className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                                            <Link 
                                                to={``} 
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                View details
                                            </Link>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-600">GSM:</span>
                                                <span className="ml-1">{item.gsm}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Width:</span>
                                                <span className="ml-1">{item.width}in</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Qty:</span>
                                                <span className="ml-1">{item.quantity}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Weight:</span>
                                                <span className="ml-1">{item.weight}Kg</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Top Color:</span>
                                                <span className="ml-1">{item.colourTop}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-600">Bottom Color:</span>
                                                <span className="ml-1">{item.colourBottom}</span>
                                            </div>
                                        </div>
                                        
                                        {item.remarks && (
                                            <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                                                <span className="font-medium text-gray-600">Remarks:</span>
                                                <span className="ml-1">{item.remarks}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderListsPage;