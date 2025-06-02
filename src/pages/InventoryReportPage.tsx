
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming Select is available
import { ArrowLeft, Printer, Filter, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const InventoryReportPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
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
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Generate Inventory Report</CardTitle>
                <CardDescription>
                  Filter and view inventory reports.
                </CardDescription>
              </div>

              <div >
                <Button className="mx-2" variant="outline" >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button onClick={handlePrint} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" /> Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="raw_material">Raw Materials</SelectItem>
                      <SelectItem value="finished_product">Finished Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Stock Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Input id="dateRange" type="date" />
                  {/* Consider using shadcn Calendar for date range picker if needed */}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Report Preview</h3>
              <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">
                <p className="text-gray-500">Report content will be displayed here based on filters...</p>
                {/* Placeholder for actual report table/data */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryReportPage;
