import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { mockOrders } from "@/data/orderBookMockData";
import { ArrowLeft } from "lucide-react";

const ItemDetailsPage = () => {
    const { orderId, itemId } = useParams<{ orderId: string; itemId: string }>();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);

    const foundOrder = mockOrders.find(o => o.id === orderId);
    useEffect(() => {
        if (foundOrder) {
            const foundItem = foundOrder.items.find(i => i.id === itemId);
            if (foundItem) {
                setItem(foundItem);
                setOrderInfo({
                    id: foundOrder.id,
                    customerName: foundOrder.customerName,
                    date: foundOrder.date,
                    status: foundOrder.status
                });
            } else {
                toast({ title: "Error", description: "Item not found.", variant: "destructive" });
                navigate(`/order/${foundOrder.id}/lists/`);
            }
        } else {
            toast({ title: "Error", description: "Order not found.", variant: "destructive" });
            navigate("/orders");
        }
    }, [orderId, itemId, navigate]);

    if (!item || !orderInfo) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-6 text-center">
                    <p>Loading item details or item not found...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <Button 
                    variant="outline" 
                    onClick={() => navigate(`/order/${foundOrder.id}/lists/`)} 
                    className="mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Order Details
                </Button>

                {/* Order Context Card */}
                <Card className="mb-6">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Order Context</CardTitle>
                        <CardDescription>
                            Order ID: {orderInfo.id} | Customer: {orderInfo.customerName} | Date: {orderInfo.date}
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Item Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">{item.itemName}</CardTitle>
                        <CardDescription>Item ID: {item.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">GSM:</Label>
                                        <p className="text-sm mt-1">{item.gsm}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Length:</Label>
                                        <p className="text-sm mt-1">{item.length} meters</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Width:</Label>
                                        <p className="text-sm mt-1">{item.width} meters</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Quantity:</Label>
                                        <p className="text-sm mt-1">{item.quantity} {item.unit}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Unit:</Label>
                                        <p className="text-sm mt-1">{item.unit}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Pieces per Unit:</Label>
                                        <p className="text-sm mt-1">{item.pcsPerUnit}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Top Color:</Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div 
                                            className="w-6 h-6 rounded border border-gray-300" 
                                            style={{backgroundColor: item.colourTop?.toLowerCase() || '#gray'}}
                                        ></div>
                                        <p className="text-sm capitalize">{item.colourTop}</p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Bottom Color:</Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div 
                                            className="w-6 h-6 rounded border border-gray-300" 
                                            style={{backgroundColor: item.colourBottom?.toLowerCase() || '#gray'}}
                                        ></div>
                                        <p className="text-sm capitalize">{item.colourBottom}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dimensions Summary */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dimensions Summary</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Total Area:</span>
                                        <p className="text-lg font-semibold">{(parseFloat(item.length) * parseFloat(item.width)).toFixed(2)} m²</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Per Piece:</span>
                                        <p className="text-lg font-semibold">{item.length} × {item.width} m</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Total Quantity:</span>
                                        <p className="text-lg font-semibold">{item.quantity} {item.unit}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Total Pieces:</span>
                                        <p className="text-lg font-semibold">{parseInt(item.quantity) * parseInt(item.pcsPerUnit)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Remarks */}
                        {item.remarks && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Remarks: </h3>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">{item.remarks}</p>
                                </div>
                            </div>
                        )}

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">Item Code:</span>
                                    <span>{item.id}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">Material Grade:</span>
                                    <span>{item.gsm} GSM</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">Color Combination:</span>
                                    <span className="capitalize">{item.colourTop} / {item.colourBottom}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="font-medium text-gray-600">Packaging Unit:</span>
                                    <span>{item.pcsPerUnit}  {item.unit}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ItemDetailsPage;