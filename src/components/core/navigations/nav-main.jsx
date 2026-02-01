// import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

// import { Button } from "@/components/ui/button";
// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { Link } from "react-router";

// export function NavMain({ items }) {
//   return (
//     <SidebarGroup className="gap-2">
//       <SidebarGroupContent className="flex flex-col gap-2">
//         <SidebarMenu>
//           {/* <SidebarMenuItem className="flex items-center gap-2">
//             <SidebarMenuButton
//               tooltip="Quick Create"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
//             >
//               <IconCirclePlusFilled />
//               <span>Quick Create</span>
//             </SidebarMenuButton>
//             <Button
//               size="icon"
//               className="size-8 group-data-[collapsible=icon]:opacity-0"
//               variant="outline"
//             >
//               <IconMail />
//               <span className="sr-only">Inbox</span>
//             </Button>
//           </SidebarMenuItem> */}
//         </SidebarMenu>
//       </SidebarGroupContent>

//       {/* ============================================================= */}

//       {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}

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
import { cn } from "@/lib/utils";

export function NavMain({ items }) {
  const location = useLocation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
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
                  <span className="flex-1">{item.title}</span>
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