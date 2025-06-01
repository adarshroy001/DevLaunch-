
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea import
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddRawMaterialPage = () => {
  const [gstRate, setGstRate] = useState(0);
  const [Price, setPrice] = useState(0);
  // Convert gstRate to a number and calculate total
  const totalPerUnit = Price +  Price*gstRate/100 ;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
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
            <CardTitle>Add New Raw Material</CardTitle>
            <CardDescription>
              Fill in the details for the new raw material.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="materialName">Material Name</Label>
              <Input id="materialName" placeholder="e.g., PVC Granules" />
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" placeholder="e.g., Acme Supplies" />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="e.g., 100" min="0" />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="e.g., kg, meters, pcs" />
            </div>
            <div>
              <Label htmlFor="price">Price per Unit</Label>
              <Input id="price" type="number" min="0" placeholder="e.g., 50.00" value={Price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div>
              <Label htmlFor="GST">GST Rate</Label>
              <Input id="gstRate" type="number" min="0" placeholder="e.g., 18 for 18%" value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} />
            </div>
            <div>
              <Label htmlFor="totalAmount">Total amount per unit</Label>
              <Input id="totalAmount" type="number" min="0" value={totalPerUnit} readOnly />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea id="remarks" placeholder="Enter any additional notes or remarks" />
            </div>
            <Button className="w-full">Add Raw Material</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddRawMaterialPage;
