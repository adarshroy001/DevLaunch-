
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CreateShipmentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
            <Button variant="outline" asChild>
                <Link to="/dispatch">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dispatch
                </Link>
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Shipment</CardTitle>
            <CardDescription>Fill in the details below to create a new shipment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input id="orderId" placeholder="e.g., ORD123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" placeholder="e.g., John Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Textarea id="shippingAddress" placeholder="Enter full shipping address" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier</Label>
                <Input id="carrier" placeholder="e.g., FedEx, UPS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageDetails">Package Details (Weight, Dimensions)</Label>
                <Input id="packageDetails" placeholder="e.g., 5kg, 30x20x10 cm" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Shipment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateShipmentPage;
