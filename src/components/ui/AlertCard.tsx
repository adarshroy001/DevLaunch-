
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "warning" | "error" | "info";

interface AlertCardProps {
  type: AlertType;
  message: string;
  className?: string;
}

const AlertCard = ({ type, message, className }: AlertCardProps) => {
  const getAlertStyles = () => {
    switch (type) {
      case "error":
        return "text-red-700 bg-red-50";
      case "warning":
        return "text-amber-700 bg-amber-50";
      case "info":
        return "text-blue-700 bg-blue-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "info":
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className={cn("flex items-start space-x-2 p-3 rounded-md", getAlertStyles(), className)}>
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AlertCard;
