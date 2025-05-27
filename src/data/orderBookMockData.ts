
import type { OrderBookEntry } from "@/types";

export const ORDER_BOOK_STATUSES = ["Processing", "Shipped", "Completed", "Delayed", "Cancelled"] as const;

export const orderBookMockOrders: OrderBookEntry[] = [
  { id: "ORD123", customer: "Construction Co. Ltd", date: "2025-05-20", status: "Processing", total: "₹24,600", items: "Heavy Duty Tarpaulin 20x30" },
  { id: "ORD124", customer: "Warehouse Solutions", date: "2025-05-20", status: "Shipped", total: "₹18,950", items: "Waterproof Canvas 15x25" },
  { id: "ORD125", customer: "Industrial Corp", date: "2025-05-20", status: "Completed", total: "₹53,275", items: "Custom Print Tarpaulin" },
  { id: "ORD126", customer: "Farm Equipment Co", date: "2025-05-19", status: "Processing", total: "₹7,825", items: "Agricultural Cover 12x18" },
  { id: "ORD127", customer: "Event Management Ltd", date: "2025-05-19", status: "Delayed", total: "₹31,520", items: "Fire Retardant Tarp 25x40" }
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

