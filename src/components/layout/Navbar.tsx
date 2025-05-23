
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Order Book", path: "/orders" },
  { name: "Inventory", path: "/inventory" },
  { name: "Dispatch", path: "/dispatch" },
  { name: "Reports", path: "/reports" },
  { name: "Admin", path: "/admin" }
];

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-6 overflow-x-auto py-4 no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600",
                location.pathname === link.path
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
