import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";

const AddOrderForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    customerWhatsapp: "",
    salesPerson: "",
    brand: "",
    gsm: "",
    quantity: "",
    unit: "",
    colourTop: "",
    colourBottom: "",
    length: "",
    width: "",
    sqYard: "",
    rate: "",
    kg: "",
    ratePerKg: "",
    xFactory: false,
    forDelivery: false,
    transport: ""
  });

  const [itemRows, setItemRows] = useState([{
    id: 1,
    gsm: "",
    colourTop: "",
    colourBottom: ""
  }]);

  const [dimensionRows, setDimensionRows] = useState([{
    id: 1,
    length: "",
    width: "",
    quantity: "",
    unit: ""
  }]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItemRow = () => {
    setItemRows(prev => [...prev, {
      id: prev.length + 1,
      gsm: "",
      colourTop: "",
      colourBottom: ""
    }]);
  };

  const addDimensionRow = () => {
    setDimensionRows(prev => [...prev, {
      id: prev.length + 1,
      length: "",
      width: "",
      quantity: "",
      unit: ""
    }]);
  };

  const updateItemRow = (id: number, field: string, value: string) => {
    setItemRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const updateDimensionRow = (id: number, field: string, value: string) => {
    setDimensionRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { formData, itemRows, dimensionRows });
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

        {/* Items Specifications */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Items Specifications</h3>
          
            <div className="px-3 py-1 text-sm">
              <Label htmlFor="salesPerson" className="text-sm font-medium text-gray-600 text-center mx-3">Add Item</Label>
              <Select value={formData.salesPerson} onValueChange={(value) => handleInputChange("salesPerson", value)}>
                <SelectTrigger className="mt-1 mr-2 text-center">
                  <SelectValue placeholder="Add item from here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium">Premium Tarp</SelectItem>
                  <SelectItem value="Heavy">Heavy Duty</SelectItem>
                  <SelectItem value="Waterproof">Waterproof Pro</SelectItem>
                  <SelectItem value="Industrial">Industrial Grade</SelectItem>
                  <SelectItem value="Custom">Custom Brand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {itemRows.map((row, index) => (
            <div key={row.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">GSM</Label>
                <Input
                  value={row.gsm}
                  onChange={(e) => updateItemRow(row.id, "gsm", e.target.value)}
                  placeholder="e.g., 120, 150, 180"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Colour Top</Label>
                <Select value={row.colourTop} onValueChange={(value) => updateItemRow(row.id, "colourTop", value)}>
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
                <Select value={row.colourBottom} onValueChange={(value) => updateItemRow(row.id, "colourBottom", value)}>
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
          ))}
        </div>

        {/* Dimensions & Quantity */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Dimensions & Quantity</h3>
            {/* <Button 
              type="button" 
              onClick={addDimensionRow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Row
            </Button> */}
            <div className="px-3 py-1 text-sm">
              <Label htmlFor="salesPerson" className="text-sm font-medium text-gray-600 text-center mx-3">Add Item</Label>
              <Select value={formData.salesPerson} onValueChange={(value) => handleInputChange("salesPerson", value)}>
                <SelectTrigger className="mt-1 mr-2 text-center">
                  <SelectValue placeholder="Add item from here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium">Premium Tarp</SelectItem>
                  <SelectItem value="Heavy">Heavy Duty</SelectItem>
                  <SelectItem value="Waterproof">Waterproof Pro</SelectItem>
                  <SelectItem value="Industrial">Industrial Grade</SelectItem>
                  <SelectItem value="Custom">Custom Brand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {dimensionRows.map((row, index) => (
            <div key={row.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Length (ft) *</Label>
                <Input
                  value={row.length}
                  onChange={(e) => updateDimensionRow(row.id, "length", e.target.value)}
                  placeholder="e.g., 20"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Width (ft) *</Label>
                <Input
                  value={row.width}
                  onChange={(e) => updateDimensionRow(row.id, "width", e.target.value)}
                  placeholder="e.g., 30"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Quantity *</Label>
                <Input
                  value={row.quantity}
                  onChange={(e) => updateDimensionRow(row.id, "quantity", e.target.value)}
                  placeholder="e.g., 10"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Unit</Label>
                <Select value={row.unit} onValueChange={(value) => updateDimensionRow(row.id, "unit", value)}>
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
            </div>
          ))}
        </div>

        {/* Delivery */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Delivery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="xFactory"
                checked={formData.xFactory}
                onCheckedChange={(checked) => handleInputChange("xFactory", checked)}
              />
              <Label htmlFor="xFactory" className="text-sm font-medium text-gray-600">X-Factory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forDelivery"
                checked={formData.forDelivery}
                onCheckedChange={(checked) => handleInputChange("forDelivery", checked)}
              />
              <Label htmlFor="forDelivery" className="text-sm font-medium text-gray-600">FOR Delivery</Label>
            </div>
            <div>
              <Label htmlFor="transport" className="text-sm font-medium text-gray-600">Transport</Label>
              <Select value={formData.transport} onValueChange={(value) => handleInputChange("transport", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Transport name</SelectItem>
                  <SelectItem value="number">Transport number</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddOrderForm;