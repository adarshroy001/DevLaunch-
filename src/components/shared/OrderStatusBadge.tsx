
import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      // OrderBook statuses
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delayed":
        return "bg-amber-100 text-amber-800";
      
      // Orders page statuses
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Dispatched":
        return "bg-blue-100 text-blue-800";

      // Common statuses
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
