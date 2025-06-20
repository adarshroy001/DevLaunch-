import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, X, Edit, Trash2, CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "path";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const AddOrderForm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (orderData: any) => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    customerWhatsapp: "",
    salesPerson: "",
    xFactory: false,
    forDelivery: false,
    transport: false,
    transportName: "",
    transportContact: "",
    dueDate: '',
    mainRemark: "",
    items: []
  });

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
    remarks: "",
    weight: '',
    variant: '', // Fixed typo from 'varient'
    category: 'Tarpaulin'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeliveryChange = (selectedField: string, checked: boolean | "indeterminate") => {
    const isChecked = checked === true;

    if (isChecked) {
      // If checking a box, uncheck all others
      setFormData(prev => ({
        ...prev,
        xFactory: selectedField === "xFactory",
        forDelivery: selectedField === "forDelivery",
        transport: selectedField === "transport"
      }));
    } else {
      // If unchecking, just uncheck the selected field
      handleInputChange(selectedField, false);
    }
  };

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
      remarks: "",
      weight: '',
      variant: '', // Fixed typo
      category: 'Tarpaulin'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the complete order data
    const orderData = {
      ...formData,
      items: items
    };

    console.log("Order submitted:", orderData);

    try {
      await onSubmit(orderData);
      onClose();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleMainRemarkChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      mainRemark: value
    }));
  };

  return (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Add New Tarpaulin Order</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 px-1">
        {/* Customer Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="customerName" className="text-sm font-medium text-gray-600">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Enter customer name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerWhatsapp" className="text-sm font-medium text-gray-600">WhatsApp Number</Label>
              <Input
                id="customerWhatsapp"
                value={formData.customerWhatsapp}
                onChange={(e) => handleInputChange("customerWhatsapp", e.target.value)}
                placeholder="+91 9999999999"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="customerAddress" className="text-sm font-medium text-gray-600">Customer Address</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange("customerAddress", e.target.value)}
                placeholder="Enter complete address"
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Sales Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="salesPerson" className="text-sm font-medium text-gray-600">Sales Person</Label>
              <Select value={formData.salesPerson} onValueChange={(value) => handleInputChange("salesPerson", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select sales person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                  <SelectItem value="priya">Priya Sharma</SelectItem>
                  <SelectItem value="amit">Amit Patel</SelectItem>
                  <SelectItem value="sunita">Sunita Singh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Items</h3>
            <Button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm"
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
                      <div><span className="font-medium">Variant:</span> {item.variant}</div>
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

        {/* Delivery */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Delivery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="xFactory"
                checked={formData.xFactory}
                onCheckedChange={(checked) => handleDeliveryChange("xFactory", checked)}
              />
              <Label htmlFor="xFactory" className="text-sm font-medium text-gray-600">X-Factory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forDelivery"
                checked={formData.forDelivery}
                onCheckedChange={(checked) => handleDeliveryChange("forDelivery", checked)}
              />
              <Label htmlFor="forDelivery" className="text-sm font-medium text-gray-600">FOR Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transport"
                checked={formData.transport}
                onCheckedChange={(checked) => handleDeliveryChange("transport", checked)}
              />
              <Label htmlFor="transport" className="text-sm font-medium text-gray-600">Transport</Label>
            </div>
          </div>
        </div>

        {/* Transport Details */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Transport Details</h3>
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <Label htmlFor="transportName" className="text-sm font-medium text-gray-600">Transport Name</Label>
              <Input
                id="transportName"
                value={formData.transportName}
                onChange={(e) => handleInputChange("transportName", e.target.value)}
                placeholder="Enter transport name"
                className="mt-1"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="transportContact" className="text-sm font-medium text-gray-600">Transport Contact Number</Label>
              <Input
                id="transportContact"
                value={formData.transportContact}
                onChange={(e) => handleInputChange("transportContact", e.target.value)}
                placeholder="+91 9999999999"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex w-1/2 items-center my-4">
            <Label className="text-sm font-medium text-gray-600 w-36">Order Due Date</Label>
            <Input
              value={formData.dueDate}
              type="date"
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="w-fit"
            />
          </div>
        </div>
        {/* Remarks */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <Label className="text-sm font-medium text-gray-600">Remarks</Label>
          <Textarea
            value={formData.mainRemark}
            onChange={(e) => handleMainRemarkChange(e.target.value)}
            placeholder="Enter any remarks or special instructions"
            rows={3}
            className="mt-1"
          />
        </div>
      </div>

      {/* Create Item Dialog */}
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
                    {/* Variant and Product Category */}
                    <div className="flex justify-between">
                      <div className="w-2/5">
                        <Label>Variant</Label>
                        <Select value={itemFormData.variant} onValueChange={(value) => handleItemInputChange("variant", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Variant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="virgin">Virgin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-2/5">
                        <Label>Product Category</Label>
                        <Select value={itemFormData.category} onValueChange={(value) => handleItemInputChange("category", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Product Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tarpaulin">Tarpaulin</SelectItem>
                            <SelectItem value="net">Shade net</SelectItem>
                            <SelectItem value="bag">Jumbo Bag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                          id="width"
                          placeholder="e.g., 10"
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
                    {/* Variant and Product Category */}
                    <div className="flex justify-between">
                      <div className="w-2/5">
                        <Label>Variant</Label>
                        <Select value={itemFormData.variant} onValueChange={(value) => handleItemInputChange("variant", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Variant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="virgin">Virgin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-2/5">
                        <Label>Product Category</Label>
                        <Select value={itemFormData.category} onValueChange={(value) => handleItemInputChange("category", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Product Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tarpaulin">Tarpaulin</SelectItem>
                            <SelectItem value="net">Shade net</SelectItem>
                            <SelectItem value="bag">Jumbo Bag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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

      {/* Form Footer */}
      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Order
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddOrderForm;