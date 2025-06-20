import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CalendarIcon, Truck, User, Phone ,ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { mockOrders } from "@/data/orderBookMockData";
import type { OrderBookEntry } from "@/types";

const CreateShipmentPage = () => {
  const [loadingDate, setLoadingDate] = useState<Date | undefined>();
  const [id, setId] = useState('');
  const [order, setOrder] = useState<OrderBookEntry | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [transportName, setTransportName] = useState('');
  const [transportNumber, setTransportNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [selected, setSelected] = useState("");
  const [rate, setRate] = useState(0);
  const [itemMetricVal, setItemMetricVal] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setAmount(rate * itemMetricVal);
  }, [rate, itemMetricVal])


  const findOrderById = () => {
    if (!id) {
      setOrder(null);
      return;
    }

    const foundOrder = mockOrders.find((item) => item.id === id);
    if (foundOrder) {
      // Type assertion to ensure the found order matches OrderBookEntry type
      const typedOrder: OrderBookEntry = {
        ...foundOrder,
        status: foundOrder.status as OrderBookEntry['status']
      };
      setOrder(typedOrder);
      setCustomerName(foundOrder.customerName);
      setShippingAddress(foundOrder.customerAddress);
      setTransportName(foundOrder.transportName);
      // Set total amount based on items count or calculate as needed
      setTotalAmount((foundOrder.items.length * 50).toString());
    } else {
      setOrder(null);
      setCustomerName('');
      setShippingAddress('');
      setTransportName('');
      setTotalAmount('');
    }
  };

  // Auto-search when ID changes (if needed)
  // useEffect(() => {
  //   if (id.trim()) {
  //     findOrderById();
  //   } else {
  //     setOrder(null);
  //     setCustomerName('');
  //     setShippingAddress('');
  //     setTransportName('');
  //     setTotalAmount('');
  //   }
  // }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Creating shipment with data:', {
      orderId: id,
      customerName,
      loadingDate,
      carNumber,
      driverName,
      driverNumber,
      shippingAddress,
      transportName,
      transportNumber,
      totalAmount,
      items: order?.items || []
    });
  };

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
            <CardTitle>Create New Challan</CardTitle>
            <CardDescription>Fill in the details below to create a new shipment.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <div className="flex relative">                  
                    <Input
                    id="orderId"
                    placeholder="e.g., ORD-2024-001"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className=""
                  />
                  <button className="rounded-md border absolute h-full w-10 flex justify-center items-center right-0  border-gray-200 bg-gray-100 hover:cursor-pointer" onClick={findOrderById}><ArrowRight/></button>
                  </div>
                  {id && !order && (
                    <p className="text-sm text-red-500">Order not found</p>
                  )}
                  {order && (
                    <p className="text-sm text-green-600">Order found: {order.status}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="e.g., John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
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
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carNumber">Lorry Number</Label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="carNumber"
                      placeholder="e.g., MH01AB1234"
                      className="pl-10"
                      value={carNumber}
                      onChange={(e) => setCarNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="driverName"
                      placeholder="e.g., Mike Ross"
                      className="pl-10"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverNumber">Driver Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="driverNumber"
                      type="tel"
                      placeholder="e.g., +91 1234567890"
                      className="pl-10"
                      value={driverNumber}
                      onChange={(e) => setDriverNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                <Textarea
                  id="shippingAddress"
                  placeholder="Enter full shipping address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              {/* Items List */}
              <div className="pb-4">
                <div className="flex justify-between items-center mb-4 flex-wrap">
                  <h3 className="text-base font-semibold">Order Items</h3>
                </div>

                {!order || order.items.length === 0 ? (
                  <div className="text-center w-full py-8 text-gray-500 border border-gray-200 rounded-md">
                    No items found for this order.
                  </div>
                ) : (
                  <div className="space-y-3 py-4 px-4 border border-gray-200 rounded-md">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div className="flex-1">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="col-span-2"><div className="font-medium">Description:</div> {item.itemName}-{item.gsm}-{item.colourTop}/{item.colourBottom}-<span>{`{${item.varient}}`}</span></div>
                            <div><div className="font-medium"> Ordered Qty:</div> {item.quantity}</div>
                            <div><div className="font-medium">Ordered Delivered:</div> <Input className="h-7 mt-1" type="number" min={0} /></div>
                            <div className="flex col-span-2 gap-4 pr-8 ">
                              <div><div className="font-medium">Item Metric value:</div> <Input className="h-7 mt-1" type="number" min={0} step="0.001" value={itemMetricVal.toFixed(3)} onChange={(e) => setItemMetricVal(parseFloat(e.target.value))} /></div>
                              <div><div className="font-medium">Item Metric Unit:
                                <Input value={item.unit || selected} onChange={(e) => setSelected(e.target.value)} className="h-7 mt-1 font-normal border border-gray-200  rounded-md">
                                </Input>
                              </div>
                              </div>
                            </div>
                            <div><div className="font-medium">Rate:</div> <Input className="h-7 mt-1" type="number" min={0} step="0.001" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} /></div>
                            <div><div className="font-medium">Amount:</div> <Input className="h-7 mt-1" type="number" min={0} step="0.001" value={amount} readOnly /></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportName">Transport Name</Label>
                <Input
                  id="transportName"
                  placeholder="Enter Transport Name"
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportNumber">Transport Number</Label>
                <Input
                  id="transportNumber"
                  placeholder="Enter Transport Number"
                  value={transportNumber}
                  onChange={(e) => setTransportNumber(e.target.value)}
                />
              </div>
              <div className="flex w-1/2 items-center">
                <Label htmlFor="totalAmount" className="w-1/4">Total Amount</Label>
                <Input
                  id="totalAmount"
                  placeholder="Total value"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-3/5"
                />
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto">Create Shipment</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateShipmentPage;