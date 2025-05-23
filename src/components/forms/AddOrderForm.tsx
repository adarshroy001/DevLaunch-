
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";

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
    ratePerKg: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    // Here you would typically submit to your backend
    onClose();
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Tarpaulin Order</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerWhatsapp">WhatsApp Number</Label>
              <Input
                id="customerWhatsapp"
                value={formData.customerWhatsapp}
                onChange={(e) => handleInputChange("customerWhatsapp", e.target.value)}
                placeholder="+91 9999999999"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="customerAddress">Customer Address</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange("customerAddress", e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Sales Information */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Sales Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salesPerson">Sales Person</Label>
              <Select value={formData.salesPerson} onValueChange={(value) => handleInputChange("salesPerson", value)}>
                <SelectTrigger>
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
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium Tarp</SelectItem>
                  <SelectItem value="heavy-duty">Heavy Duty</SelectItem>
                  <SelectItem value="waterproof">Waterproof Pro</SelectItem>
                  <SelectItem value="industrial">Industrial Grade</SelectItem>
                  <SelectItem value="custom">Custom Brand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="gsm">GSM *</Label>
              <Input
                id="gsm"
                value={formData.gsm}
                onChange={(e) => handleInputChange("gsm", e.target.value)}
                placeholder="e.g., 120, 150, 180"
                required
              />
            </div>
            <div>
              <Label htmlFor="colourTop">Colour Top</Label>
              <Select value={formData.colourTop} onValueChange={(value) => handleInputChange("colourTop", value)}>
                <SelectTrigger>
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
              <Label htmlFor="colourBottom">Colour Bottom</Label>
              <Select value={formData.colourBottom} onValueChange={(value) => handleInputChange("colourBottom", value)}>
                <SelectTrigger>
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
        </div>

        {/* Dimensions & Quantity */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Dimensions & Quantity</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="length">Length (ft) *</Label>
              <Input
                id="length"
                value={formData.length}
                onChange={(e) => handleInputChange("length", e.target.value)}
                placeholder="e.g., 20"
                required
              />
            </div>
            <div>
              <Label htmlFor="width">Width (ft) *</Label>
              <Input
                id="width"
                value={formData.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                placeholder="e.g., 30"
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="e.g., 10"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                <SelectTrigger>
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
        </div>

        {/* Pricing Information */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Pricing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="sqYard">Sq. Yard</Label>
              <Input
                id="sqYard"
                value={formData.sqYard}
                onChange={(e) => handleInputChange("sqYard", e.target.value)}
                placeholder="Auto calculated"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="rate">Rate (₹/Sq.Yard)</Label>
              <Input
                id="rate"
                value={formData.rate}
                onChange={(e) => handleInputChange("rate", e.target.value)}
                placeholder="e.g., 45"
              />
            </div>
            <div>
              <Label htmlFor="kg">Weight (Kg)</Label>
              <Input
                id="kg"
                value={formData.kg}
                onChange={(e) => handleInputChange("kg", e.target.value)}
                placeholder="Auto calculated"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="ratePerKg">Rate (₹/Kg)</Label>
              <Input
                id="ratePerKg"
                value={formData.ratePerKg}
                onChange={(e) => handleInputChange("ratePerKg", e.target.value)}
                placeholder="e.g., 150"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Order
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddOrderForm;
