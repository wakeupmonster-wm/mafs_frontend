import {
  User,
  Image,
  Sun,
  Search,
  Activity,
  CircleDollarSign,
  Settings,
  Zap,
} from "lucide-react";

export const TabData = [
  { value: "profile", label: "Profile", icon: User },
  { value: "gallery", label: "Gallery", icon: Image },
  { value: "attributes", label: "Attributes", icon: Sun },
  // { value: "attribute", label: "Attribute", icon: Sun },
  { value: "discovery", label: "Discovery", icon: Search },
  { value: "activity", label: "Activity", icon: Activity },
  { value: "financials", label: "Financials", icon: CircleDollarSign },
  // { value: "subscription", label: "Subscription", icon: Zap },
  { value: "settings", label: "Settings", icon: Settings },
];
