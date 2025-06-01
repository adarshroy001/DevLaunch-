
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
import { ArrowLeft, Edit, Plus, Printer, Save, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderBookEntry | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<string>("");

  // Update items section starts here 
  const [items, setItems] = useState<any[]>([]);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [itemFormData, setItemFormData] = useState({
    itemName: "",
    gsm: "",
    colourTop: "",
    colourBottom: "",
    length: "",
    width: "",
    quantity: "",
    unit: "",
    pcsPerUnit: "",
    remarks: ""
  });
  // Update items section starts here 


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

  // Update items section starts here 


  const handleItemInputChange = (field: string, value: string) => {
    setItemFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetItemForm = () => {
    setItemFormData({
      itemName: "",
      gsm: "",
      colourTop: "",
      colourBottom: "",
      length: "",
      width: "",
      quantity: "",
      unit: "",
      pcsPerUnit: "",
      remarks: ""
    });
  };

  const handleAddItem = () => {
    setEditingItemIndex(null);
    resetItemForm();
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (index: number) => {
    setEditingItemIndex(index);
    setItemFormData(items[index]);
    setIsItemDialogOpen(true);
  };

  const handleDeleteItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleItemSubmit = () => {
    if (editingItemIndex !== null) {
      // Edit existing item
      setItems(prev => prev.map((item, index) =>
        index === editingItemIndex ? { ...itemFormData } : item
      ));
    } else {
      // Add new item
      setItems(prev => [...prev, { ...itemFormData }]);
    }

    setIsItemDialogOpen(false);
    resetItemForm();
    setEditingItemIndex(null);
  };

  //Update items sections ends here
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

        <div className="">
          <Card>
            <CardContent className="flex flex-wrap justify-between mt-6">
              <h3 className="text-lg md:text-2xl font-semibold ">Update Status</h3>
              <div className="flex">
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
                <CardFooter>
                  <Button onClick={handleStatusUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Status
                  </Button>
                </CardFooter>
              </div>
            </CardContent>
            <div className="pr-12 pl-8 pb-4">
              <div className="flex justify-between items-center mb-4 flex-wrap">
                <h3 className="text-lg md:text-2xl font-semibold ">Update Items</h3>
                <Button
                  type="button"
                  onClick={handleAddItem}
                  className=" text-white px-3 py-1 text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No items added yet. Click "Add Item" to get started.
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div><span className="font-medium">Item:</span> {item.itemName}</div>
                          <div><span className="font-medium">GSM:</span> {item.gsm}</div>
                          <div><span className="font-medium">Size:</span> {item.length}ft x {item.width}ft</div>
                          <div><span className="font-medium">Qty:</span> {item.quantity} {item.unit}</div>
                          <div><span className="font-medium">Top Color:</span> {item.colourTop}</div>
                          <div><span className="font-medium">Bottom Color:</span> {item.colourBottom}</div>
                          <div><span className="font-medium">Pcs/Unit:</span> {item.pcsPerUnit}</div>
                          {item.remarks && <div><span className="font-medium">Remarks:</span> {item.remarks}</div>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Item Dialog */}
            <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItemIndex !== null ? "Edit Item" : "Add Item"}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Item Name</Label>
                    <Input
                      value={itemFormData.itemName}
                      onChange={(e) => handleItemInputChange("itemName", e.target.value)}
                      placeholder="Enter item name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">GSM</Label>
                    <Input
                      value={itemFormData.gsm}
                      onChange={(e) => handleItemInputChange("gsm", e.target.value)}
                      placeholder="e.g., 120, 150, 180"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Colour Top</Label>
                    <Select value={itemFormData.colourTop} onValueChange={(value) => handleItemInputChange("colourTop", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select top colour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Colour Bottom</Label>
                    <Select value={itemFormData.colourBottom} onValueChange={(value) => handleItemInputChange("colourBottom", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select bottom colour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Length (ft)</Label>
                    <Input
                      value={itemFormData.length}
                      onChange={(e) => handleItemInputChange("length", e.target.value)}
                      placeholder="e.g., 20"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Width (ft)</Label>
                    <Input
                      value={itemFormData.width}
                      onChange={(e) => handleItemInputChange("width", e.target.value)}
                      placeholder="e.g., 30"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Quantity</Label>
                    <Input
                      value={itemFormData.quantity}
                      onChange={(e) => handleItemInputChange("quantity", e.target.value)}
                      placeholder="e.g., 10"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Unit</Label>
                    <Select value={itemFormData.unit} onValueChange={(value) => handleItemInputChange("unit", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="yards">Yards</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Pcs/Unit</Label>
                    <Input
                      value={itemFormData.pcsPerUnit}
                      onChange={(e) => handleItemInputChange("pcsPerUnit", e.target.value)}
                      placeholder="e.g., 5"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Remarks</Label>
                    <Textarea
                      value={itemFormData.remarks}
                      onChange={(e) => handleItemInputChange("remarks", e.target.value)}
                      placeholder="Enter any remarks or special instructions"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsItemDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleItemSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingItemIndex !== null ? "Update Item" : "Add Item"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
