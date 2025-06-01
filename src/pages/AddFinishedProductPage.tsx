
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AddFinishedProductPage = () => {
  //handling inputs
  const [itemFormData, setItemFormData] = useState({
      ProductName: "",
      gsm: "",
      colourTop: "",
      colourBottom: "",
      width: "",
      quantity: "",
      weight: "",
      remarks: ""
    });
  const handleItemInputChange = (field: string, value: string) => {
    setItemFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
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
            <CardTitle>Add Finished Product</CardTitle>
            <CardDescription>
              Add new finished products like rolls or bundles to the inventory.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      <Input id="rollName" placeholder="e.g., Heavy Duty Tarpaulin Blue" />
                    </div>
                    <div>
                      <Label >GSM</Label>
                      <Input placeholder="e.g., 120, 150, 180" className="mt-1" />
                    </div>
                    <div>
                      <Label >Colour Top</Label>
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
                    <div>
                      <Label htmlFor="rollWidth">Width (e.g., In)</Label>
                      <Input id="rollWidth" type="number" placeholder="e.g., 2" min={0} />
                    </div>
                    <div>
                      <Label htmlFor="rollQuantity">Quantity of Rolls</Label>
                      <Input id="rollQuantity" type="number" placeholder="e.g., 10" min={0} />
                    </div>
                    <div>
                      <Label htmlFor="rollRemarks">Remarks (Optional)</Label>
                      <Textarea id="rollRemarks" placeholder="Enter any additional notes for rolls" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add Rolls</Button>
                  </CardFooter>
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
                      <Input id="bundleName" placeholder="e.g., Standard Tarpaulin Pack" />
                    </div>
                    <div>
                      <Label htmlFor="bundleSize">Size (e.g., 10x12 ft)</Label>
                      <Input id="bundleSize" placeholder="e.g., 10x12 ft" />
                    </div>
                    <div>
                      <Label htmlFor="bundleQuantity">Quantity of Bundles</Label>
                      <Input id="bundleQuantity" type="number" placeholder="e.g., 50" />
                    </div>
                    <div>
                      <Label htmlFor="itemsPerBundle">Items per Bundle</Label>
                      <Input id="itemsPerBundle" type="number" placeholder="e.g., 5" />
                    </div>
                    <div>
                      <Label htmlFor="bundleRemarks">Remarks (Optional)</Label>
                      <Textarea id="bundleRemarks" placeholder="Enter any additional notes for bundles" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add Bundles</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddFinishedProductPage;
