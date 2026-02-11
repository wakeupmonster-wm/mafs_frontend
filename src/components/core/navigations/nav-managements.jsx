// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { Link } from "react-router";

// export function NavManagements({ items }) {
//   return (
//     <SidebarGroup className="gap-2">
//       <SidebarGroupLabel>User Management</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Link to={item.url} key={item.title}>
//             <SidebarMenuItem>
//               <SidebarMenuButton tooltip={item.title}>
//                 {item.icon && <item.icon />}
//                 <span>{item.title}</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </Link>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Added AnimatePresence

import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function NavManagements({ items }) {
  const location = useLocation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className={cn(
                  "group relative h-12 w-full transition-all duration-300 rounded-lg px-2",
                  "hover:bg-slate-100/80 active:scale-[0.98]", // Added click compression
                  isActive && "!bg-brand-aqua/10 border border-brand-aqua/50"
                )}
              >
                <Link to={item.url} className="flex items-center gap-3 text-sm">
                  <div
                    className={cn(
                      "flex size-[22px] items-center justify-center rounded-sm transition-all duration-300",
                      isActive
                        ? "text-brand-aqua shadow-lg shadow-blue-500/40" // Added slight tilt for "pop"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-aqua group-hover:shadow-sm"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span className="flex-1 truncate">{item.title}</span>

                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="size-1 rounded-full bg-brand-aqua shadow-[0_0_8px_rgba(var(--brand-aqua-rgb),0.8)]"
                    />
                  )}

                  {/* Badge for notifications */}
                  {item.badge && (
                    <Badge
                      variant={item.badgeVariant || "secondary"}
                      className={cn(
                        "h-5 min-w-5 px-1.5 text-[10px] font-semibold",
                        item.badgeVariant === "destructive" && "animate-pulse"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}

                  <ChevronRight
                    className={cn(
                      "size-4 transition-all duration-200",
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
