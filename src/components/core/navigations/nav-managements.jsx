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
import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
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
      <SidebarMenu className="space-y-1">
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
                  "group relative transition-all duration-200 hover:bg-sidebar-accent",
                  isActive && "bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500 font-medium"
                )}
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-lg p-1.5 transition-all duration-200",
                      isActive
                        ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                        : "bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 truncate">{item.title}</span>
                  
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
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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