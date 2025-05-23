
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-500",
  className,
}: StatsCardProps) => {
  return (
    <div className={cn("bg-white rounded-md shadow-sm p-4", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {Icon && (
          <div className={cn("p-2 rounded-full", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
