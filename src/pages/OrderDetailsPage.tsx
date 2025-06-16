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
import {  ORDER_BOOK_STATUSES, mockOrders } from "@/data/orderBookMockData";
import type { OrderBookEntry } from "@/types";
import { ArrowLeft, Edit, Plus, Printer, Save, Trash2, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    width: "",
    quantity: "",
    weight: "",
    pcsPerUnit: '',
    length: "",
    remarks: ""
  });
  // Update items section starts here 


useEffect(() => {
  const foundOrder = mockOrders.find(o => o.id === orderId);
  if (foundOrder) {
    // Type assertion to tell TypeScript this matches OrderBookEntry
    setOrder(foundOrder as OrderBookEntry);
    
    setCurrentStatus(foundOrder.status);
    // Fix: items is an array, not a string
    setItems(foundOrder.items || []);
    
    // If you need currentItems as a string, you might want to do something like:
    // setCurrentItems(JSON.stringify(foundOrder.items));
  } else {
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
      // setOrder(prev => prev ? { ...prev, status: currentStatus } : null);
      toast({ title: "Status Updated", description: `Order ${order.id} status changed to ${currentStatus}.` });
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
      width: "",
      quantity: "",
      weight: "",
      pcsPerUnit: '',
      length: "",
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
              <div >
                <Button className="mx-2" variant="outline" >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button className="mx-2" variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Order
                </Button>
              </div>
            </div>
            <CardDescription>Customer: {order.customerName} | Date: {order.date}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Status</Label>
              <div className="mt-1">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <Label>Total Items</Label>
                <p className="mx-2">{order.items.length}</p>
              </div>
              <div>
                <td className="pr-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/order/${order.id}/lists`} className="text-blue-600 hover:text-blue-900">
                    View all Items
                  </Link>
                </td>
              </div>
            </div>
            <div className="flex gap-2">
              <Label className="p-0 mt-1">Remark</Label>
              <p className="p-0 m-0">{order.mainRemark}</p>
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
            {/* Update Items */}
            <div className="pr-12 pl-6 pb-4">
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
                          <div><span className="font-medium">Width:</span> {item.width}in</div>
                          <div><span className="font-medium">Qty:</span> {item.quantity}</div>
                          <div><span className="font-medium">Top Color:</span> {item.colourTop}</div>
                          <div><span className="font-medium">Bottom Color:</span> {item.colourBottom}</div>
                          <div><span className="font-medium">Weight:</span> {item.weight}Kg</div>
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
            {/*Add Item Dialog */}
            <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItemIndex !== null ? "Edit Finished Product" : "Add Finished Product"}
                  </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                  <Tabs defaultValue="rolls" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="rolls">Add Rolls</TabsTrigger>
                      <TabsTrigger value="bundles">Add Bundles</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rolls">
                      <Card>
                        <CardHeader>
                          <CardTitle>Add Rolls</CardTitle>
                          <CardDescription>Enter details for the tarpaulin rolls.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="rollName">Product Name/Type</Label>
                            <Input
                              id="rollName"
                              placeholder="e.g., Heavy Duty Tarpaulin Blue"
                              value={itemFormData.itemName}
                              onChange={(e) => handleItemInputChange("itemName", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>GSM</Label>
                            <Input
                              placeholder="e.g., 120, 150, 180"
                              className="mt-1"
                              value={itemFormData.gsm}
                              onChange={(e) => handleItemInputChange("gsm", e.target.value)}
                            />
                          </div>
                          {/* colours */}
                          <div className="flex justify-between">
                            <div className="w-2/5">
                              <Label>Colour Top</Label>
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

                            <div className="w-2/5">
                              <Label>Colour Bottom</Label>
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
                          </div>
                          {/* Width and weight */}
                          <div className="flex justify-between">
                            <div className="w-2/5">
                              <Label htmlFor="rollWidth">Width (In)</Label>
                              <Input
                                id="rollWidth"
                                type="number"
                                placeholder="e.g., 2"
                                min={0}
                                value={itemFormData.width}
                                onChange={(e) => handleItemInputChange("width", e.target.value)}
                              />
                            </div>
                            <div className="w-2/5">
                              <Label htmlFor="rollWeight">Weight (Kg)</Label>
                              <Input
                                id="rollWeight"
                                type="number"
                                placeholder="e.g., 7"
                                min={0}
                                value={itemFormData.weight}
                                onChange={(e) => handleItemInputChange("weight", e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="rollQuantity">Quantity of Rolls</Label>
                            <Input
                              id="rollQuantity"
                              type="number"
                              placeholder="e.g., 10"
                              min={0}
                              value={itemFormData.quantity}
                              onChange={(e) => handleItemInputChange("quantity", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="rollRemarks">Remarks (Optional)</Label>
                            <Textarea
                              id="rollRemarks"
                              placeholder="Enter any additional notes for rolls"
                              value={itemFormData.remarks}
                              onChange={(e) => handleItemInputChange("remarks", e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="bundles">
                      <Card>
                        <CardHeader>
                          <CardTitle>Add Bundles</CardTitle>
                          <CardDescription>Enter details for the tarpaulin bundles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="bundleName">Product Name/Type</Label>
                            <Input
                              id="bundleName"
                              placeholder="e.g., Standard Tarpaulin Pack"
                              value={itemFormData.itemName}
                              onChange={(e) => handleItemInputChange("itemName", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>GSM</Label>
                            <Input
                              placeholder="e.g., 120, 150, 180"
                              className="mt-1"
                              value={itemFormData.gsm}
                              onChange={(e) => handleItemInputChange("gsm", e.target.value)}
                            />
                          </div>
                          {/* colour */}
                          <div className="flex justify-between">
                            <div className="w-2/5">
                              <Label>Colour Top</Label>
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

                            <div className="w-2/5">
                              <Label>Colour Bottom</Label>
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
                          </div>

                          {/* dimensions of bundle */}
                          <div className="flex justify-between">
                            <div>
                              <Label htmlFor="length">Length (ft)</Label>
                              <Input
                                id="length"
                                placeholder="e.g., 10 ft"
                                value={itemFormData.length}
                                onChange={(e) => handleItemInputChange("length", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="width">Width (ft)</Label>
                              <Input
                                id="bundleSize"
                                placeholder="e.g., 10x12 ft"
                                value={itemFormData.width}
                                onChange={(e) => handleItemInputChange("width", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="weight">Weight (Kg)</Label>
                              <Input
                                id="weight"
                                placeholder="e.g., 10 Kg"
                                value={itemFormData.weight}
                                onChange={(e) => handleItemInputChange("weight", e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="bundleQuantity">Quantity of Bundles</Label>
                            <Input
                              id="bundleQuantity"
                              type="number"
                              placeholder="e.g., 50"
                              min={0}
                              value={itemFormData.quantity}
                              onChange={(e) => handleItemInputChange("quantity", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="itemsPerBundle">Pieces per Bundle</Label>
                            <Input
                              id="itemsPerBundle"
                              type="number"
                              placeholder="e.g., 5"
                              min={0}
                              value={itemFormData.pcsPerUnit}
                              onChange={(e) => handleItemInputChange("pcsPerUnit", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bundleRemarks">Remarks (Optional)</Label>
                            <Textarea
                              id="bundleRemarks"
                              placeholder="Enter any additional notes for bundles"
                              value={itemFormData.remarks}
                              onChange={(e) => handleItemInputChange("remarks", e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
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
            <div className="flex gap-2 justify-center mb-6 mt-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Discard Changes
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;