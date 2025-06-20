// Updated OrderBookEntry type to match your mock data structure
export interface OrderBookEntry {
  id: string;
  
  // Status and Dates
  status: "Pending" | "In Production" | "Completed" | "Cancelled" | "Processing";
  date: string;
  createdAt: string;
  updatedAt: string;
  
  // Customer Information (flattened structure)
  customerName: string;
  customerAddress: string;
  customerWhatsapp: string;
  
  // Sales Information
  salesPerson: string;
  
  // Brand
  mainRemark: string;
  
  // Delivery Options
  xFactory: boolean;
  forDelivery: boolean;
  transport: boolean;
  
  // Transport Details
  transportName: string;
  transportContact: string;
  
  // Items
  items: OrderItem[];
  
  // Optional total field (if you need it)
  total?: number;
}

export interface OrderItem {
  id: string;
  itemName: string;
  gsm: string;
  colourTop: string;
  colourBottom: string;
  length: string;
  width: string;
  quantity: string;
  unit: string;
  pcsPerUnit: string;
  varient: string;
  remarks: string;
}