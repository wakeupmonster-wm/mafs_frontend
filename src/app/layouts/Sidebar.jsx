import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/modules/authentication/store/auth.slice";
import {
  Home,
  Users,
  Heart,
  Building2,
  CreditCard,
  FileText,
  Shield,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Heart, label: "Matches", path: "/admin/matches" },
  { icon: Building2, label: "Businesses", path: "/admin/businesses" },
  { icon: CreditCard, label: "Billing", path: "/admin/billing" },
  { icon: FileText, label: "Reports", path: "/admin/reports" },
  { icon: Shield, label: "Moderation", path: "/admin/moderation" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />
            <span className="text-xl font-bold text-gray-900">MAFS Admin</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-pink-50 text-pink-600 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-pink-600" : "text-gray-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
