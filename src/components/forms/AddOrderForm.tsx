import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, X, Edit, Trash2 } from "lucide-react";

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
    brand: "",
    xFactory: false,
    forDelivery: false,
    transport: false,
    transportName: "",
    transportContact: ""
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
    remarks: ""
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { formData, items });
    onClose();
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
        </div>
      </div>

      {/*Create Item Dialog */}
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
              onClick={onSubmit}
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