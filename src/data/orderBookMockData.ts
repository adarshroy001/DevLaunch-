
import type { OrderBookEntry } from "@/types";

export const ORDER_BOOK_STATUSES = ["Processing", "Shipped", "Completed", "Delayed", "Cancelled","In Production"] as const;

// export const orderBookMockOrders: OrderBookEntry[] = [
//   { id: "ORD123", customer: "Construction Co. Ltd", date: "2025-05-20", status: "Processing", total: "₹24,600", items: "Heavy Duty Tarpaulin 20x30" },
//   { id: "ORD124", customer: "Warehouse Solutions", date: "2025-05-20", status: "Shipped", total: "₹18,950", items: "Waterproof Canvas 15x25" },
//   { id: "ORD125", customer: "Industrial Corp", date: "2025-05-20", status: "Completed", total: "₹53,275", items: "Custom Print Tarpaulin" },
//   { id: "ORD126", customer: "Farm Equipment Co", date: "2025-05-19", status: "Processing", total: "₹7,825", items: "Agricultural Cover 12x18" },
//   { id: "ORD127", customer: "Event Management Ltd", date: "2025-05-19", status: "Delayed", total: "₹31,520", items: "Fire Retardant Tarp 25x40" }
// ];

// Mock data for Tarpaulin Order Form
export const mockOrders = [
  {
    id: "ORD-2024-001",
    // Order Status and Dates
    status: "In Production",
    date: "2024-01-15",
    createdAt: "2024-01-15T09:30:00.000Z",
    updatedAt: "2024-01-16T14:20:00.000Z",

    // Customer Information
    customerName: "Rajesh Construction Co.",
    customerAddress: "Plot No. 45, Industrial Area, Phase 2, Sector 18, Gurgaon, Haryana - 122015",
    customerWhatsapp: "+91 9876543210",

    // Sales Information
    salesPerson: "rajesh",

    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",

    // Delivery Options (only one should be true)
    xFactory: false,
    forDelivery: true,
    transport: false,

    // Transport Details
    transportName: "Swift Logistics",
    transportContact: "+91 9988776655",

    // Items array
    items: [
      {
        id: "ITM-001-01",
        itemName: "Heavy Duty Tarpaulin",
        gsm: "180",
        colourTop: "blue",
        colourBottom: "white",
        length: "20",
        width: "30",
        quantity: "5",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Extra reinforcement on edges required"
      },
      {
        id: "ITM-001-02",
        itemName: "Waterproof Cover",
        gsm: "150",
        colourTop: "green",
        colourBottom: "black",
        length: "15",
        width: "25",
        quantity: "10",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "UV resistant coating needed"
      }
    ]
  },

  {
    id: "ORD-2024-002",
    status: "Completed",
    date: "2024-01-12",
    createdAt: "2024-01-12T11:15:00.000Z",
    updatedAt: "2024-01-18T16:45:00.000Z",

    customerName: "Sharma Trading Company",
    customerAddress: "12/3, Main Market, Karol Bagh, New Delhi - 110005",
    customerWhatsapp: "+91 8765432109",
    salesPerson: "priya",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: true,
    forDelivery: false,
    transport: false,
    transportName: "",
    transportContact: "",
    items: [
      {
        id: "ITM-002-01",
        itemName: "Agricultural Tarpaulin",
        gsm: "120",
        colourTop: "green",
        colourBottom: "green",
        length: "25",
        width: "40",
        quantity: "8",
        unit: "pieces",
        pcsPerUnit: "2",
        varient: 'Regular',
        remarks: "Crop protection grade material"
      }
    ]
  },

  {
    id: "ORD-2024-003",
    status: "Processing",
    date: "2024-01-20",
    createdAt: "2024-01-20T08:45:00.000Z",
    updatedAt: "2024-01-20T08:45:00.000Z",

    customerName: "Metro Infrastructure Pvt Ltd",
    customerAddress: "Tower B, 4th Floor, Business Park, Noida Extension, Uttar Pradesh - 201301",
    customerWhatsapp: "+91 7654321098",
    salesPerson: "amit",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: false,
    forDelivery: false,
    transport: true,
    transportName: "Express Cargo Services",
    transportContact: "+91 9123456789",
    items: [
      {
        id: "ITM-003-01",
        itemName: "Construction Tarpaulin",
        gsm: "200",
        colourTop: "orange",
        colourBottom: "black",
        length: "30",
        width: "50",
        quantity: "15",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Fire retardant coating essential"
      },
      {
        id: "ITM-003-02",
        itemName: "Scaffold Cover",
        gsm: "160",
        colourTop: "yellow",
        colourBottom: "white",
        length: "12",
        width: "18",
        quantity: "20",
        unit: "pieces",
        pcsPerUnit: "3",
        varient: 'Regular',
        remarks: "Easy installation eyelets required"
      },
      {
        id: "ITM-003-03",
        itemName: "Debris Netting",
        gsm: "140",
        colourTop: "red",
        colourBottom: "red",
        length: "8",
        width: "12",
        quantity: "25",
        unit: "rolls",
        pcsPerUnit: "5",
        varient: 'Regular',
        remarks: "High visibility safety grade"
      }
    ]
  },

  {
    id: "ORD-2024-004",
    status: "Pending",
    date: "2024-01-22",
    createdAt: "2024-01-22T13:20:00.000Z",
    updatedAt: "2024-01-22T13:20:00.000Z",

    customerName: "Agricultural Supplies Hub",
    customerAddress: "Village Khairpur, Tehsil Samalkha, District Panipat, Haryana - 132101",
    customerWhatsapp: "+91 6543210987",
    salesPerson: "sunita",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: false,
    forDelivery: true,
    transport: false,
    transportName: "Rural Connect Transport",
    transportContact: "+91 8876543210",
    items: [
      {
        id: "ITM-004-01",
        itemName: "Greenhouse Cover",
        gsm: "120",
        colourTop: "white",
        colourBottom: "white",
        length: "35",
        width: "60",
        quantity: "3",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "UV stabilized, 90% light transmission"
      }
    ]
  },

  {
    id: "ORD-2024-005",
    status: "In Production",
    date: "2024-01-18",
    createdAt: "2024-01-18T10:00:00.000Z",
    updatedAt: "2024-01-19T12:30:00.000Z",

    customerName: "City Event Organizers",
    customerAddress: "Event Plaza, 2nd Floor, Connaught Place, New Delhi - 110001",
    customerWhatsapp: "+91 5432109876",
    salesPerson: "rajesh",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: true,
    forDelivery: false,
    transport: false,
    transportName: "",
    transportContact: "",
    items: [
      {
        id: "ITM-005-01",
        itemName: "Event Canopy",
        gsm: "150",
        colourTop: "blue",
        colourBottom: "blue",
        length: "20",
        width: "30",
        quantity: "12",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Flame retardant, attractive finish"
      },
      {
        id: "ITM-005-02",
        itemName: "Stage Backdrop",
        gsm: "180",
        colourTop: "black",
        colourBottom: "black",
        length: "15",
        width: "20",
        quantity: "6",
        unit: "pieces",
        pcsPerUnit: "2",
        varient: 'Regular',
        remarks: "Wrinkle resistant, professional grade"
      }
    ]
  },

  {
    id: "ORD-2024-006",
    status: "Cancelled",
    date: "2024-01-10",
    createdAt: "2024-01-10T15:30:00.000Z",
    updatedAt: "2024-01-14T09:15:00.000Z",

    customerName: "Warehouse Solutions Inc",
    customerAddress: "Logistics Hub, Plot 78, Industrial Estate, Faridabad, Haryana - 121003",
    customerWhatsapp: "+91 4321098765",
    salesPerson: "priya",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: false,
    forDelivery: false,
    transport: true,
    transportName: "Heavy Haul Logistics",
    transportContact: "+91 7789123456",
    items: [
      {
        id: "ITM-006-01",
        itemName: "Warehouse Cover",
        gsm: "200",
        colourTop: "white",
        colourBottom: "silver",
        length: "45",
        width: "80",
        quantity: "2",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Insulated, condensation resistant"
      },
      {
        id: "ITM-006-02",
        itemName: "Pallet Cover",
        gsm: "140",
        colourTop: "blue",
        colourBottom: "blue",
        length: "10",
        width: "12",
        quantity: "50",
        unit: "pieces",
        pcsPerUnit: "10",
        varient: 'Regular',
        remarks: "Shrink-wrap compatible edges"
      }
    ]
  },

  {
    id: "ORD-2024-007",
    status: "Completed",
    date: "2024-01-08",
    createdAt: "2024-01-08T12:00:00.000Z",
    updatedAt: "2024-01-15T17:20:00.000Z",

    customerName: "Marine Dock Services",
    customerAddress: "Berth No. 12, Port Area, JNPT, Navi Mumbai, Maharashtra - 400707",
    customerWhatsapp: "+91 3210987654",
    salesPerson: "amit",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: false,
    forDelivery: true,
    transport: false,
    transportName: "Coastal Transport Co",
    transportContact: "+91 9567890123",
    items: [
      {
        id: "ITM-007-01",
        itemName: "Marine Grade Tarpaulin",
        gsm: "220",
        colourTop: "green",
        colourBottom: "white",
        length: "28",
        width: "45",
        quantity: "7",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Salt water resistant, marine grade grommets"
      }
    ]
  },

  {
    id: "ORD-2024-008",
    status: "Processing",
    date: "2024-01-25",
    createdAt: "2024-01-25T14:45:00.000Z",
    updatedAt: "2024-01-25T14:45:00.000Z",

    customerName: "Tent House Enterprises",
    customerAddress: "Shop No. 23, Wedding Street, Lajpat Nagar, New Delhi - 110024",
    customerWhatsapp: "+91 2109876543",
    salesPerson: "sunita",
    //Main Remark
    mainRemark: "Hello this is the remark you have to take care of ",
    xFactory: true,
    forDelivery: false,
    transport: false,
    transportName: "",
    transportContact: "",
    items: [
      {
        id: "ITM-008-01",
        itemName: "Wedding Tent Cover",
        gsm: "160",
        colourTop: "red",
        colourBottom: "yellow",
        length: "40",
        width: "60",
        quantity: "4",
        unit: "pieces",
        pcsPerUnit: "1",
        varient: 'Regular',
        remarks: "Decorative border, premium finish"
      },
      {
        id: "ITM-008-02",
        itemName: "Side Wall Panel",
        gsm: "140",
        colourTop: "white",
        colourBottom: "white",
        length: "8",
        width: "12",
        quantity: "30",
        unit: "pieces",
        pcsPerUnit: "5",
        varient: 'Regular',
        remarks: "Transparent window sections"
      }
    ]
  }
];


// For Orders.tsx page, if needed, its statuses can also be defined here
export const ORDERS_PAGE_STATUSES = ["Pending", "Dispatched", "Completed", "Cancelled"] as const;

export const ALL_ORDER_STATUSES = [
  ...ORDER_BOOK_STATUSES,
  "Pending", // from Orders.tsx
  "Dispatched" // from Orders.tsx
] as const;
// Remove duplicates if any, though for this selection it might be fine
// A more robust way would be: Array.from(new Set([...ORDER_BOOK_STATUSES, "Pending", "Dispatched"]))

