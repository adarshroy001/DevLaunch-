
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CalendarIcon, Truck, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CreateShipmentPage = () => {
  const [loadingDate, setLoadingDate] = useState<Date | undefined>();

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loadingDate">Loading Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !loadingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {loadingDate ? format(loadingDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={loadingDate}
                      onSelect={setLoadingDate}
                      initialFocus
                      // Ensure calendar is interactive as per shadcn-datepicker context
                      className={cn("p-3 pointer-events-auto")} 
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="carNumber">Car Number</Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="carNumber" placeholder="e.g., MH01AB1234" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="driverName" placeholder="e.g., Mike Ross" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverNumber">Driver Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="driverNumber" type="tel" placeholder="e.g., +91 1234567890" className="pl-10" />
                </div>
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

            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation (Optional)</Label>
              <Input id="transportation" placeholder="e.g., Self pickup, Third-party logistics" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipmentRemarks">Remarks (Optional)</Label>
              <Textarea id="shipmentRemarks" placeholder="Enter any additional notes for the shipment" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">Create Shipment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateShipmentPage;
