// // import { ChevronRight } from "lucide-react";

// // import {
// //   Collapsible,
// //   CollapsibleContent,
// //   CollapsibleTrigger,
// // } from "@/components/ui/collapsible";
// // import {
// //   SidebarGroup,
// //   SidebarGroupLabel,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// //   SidebarMenuSub,
// //   SidebarMenuSubButton,
// //   SidebarMenuSubItem,
// // } from "@/components/ui/sidebar";
// // import { Link } from "react-router";

// // export function NavPlateform({ items }) {
// //   return (
// //     <SidebarGroup>
// //       <SidebarGroupLabel>Managements</SidebarGroupLabel>
// //       <SidebarMenu>
// //         {items.map((item) => (
// //           <Collapsible
// //             key={item.title}
// //             asChild
// //             defaultOpen={item.isActive}
// //             className="group/collapsible"
// //           >
// //             <SidebarMenuItem>
// //               <CollapsibleTrigger asChild>
// //                 <SidebarMenuButton tooltip={item.title}>
// //                   {item.icon && <item.icon />}
// //                   <span>{item.title}</span>
// //                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
// //                 </SidebarMenuButton>
// //               </CollapsibleTrigger>
// //               <CollapsibleContent>
// //                 <SidebarMenuSub>
// //                   {item.items?.map((subItem) => (
// //                     <SidebarMenuSubItem key={subItem.title}>
// //                       <SidebarMenuSubButton asChild>
// //                         <Link to={subItem.url}>
// //                           <span>{subItem.title}</span>
// //                         </Link>
// //                       </SidebarMenuSubButton>
// //                     </SidebarMenuSubItem>
// //                   ))}
// //                 </SidebarMenuSub>
// //               </CollapsibleContent>
// //             </SidebarMenuItem>
// //           </Collapsible>
// //         ))}
// //       </SidebarMenu>
// //     </SidebarGroup>
// //   );
// // }




// import { ChevronRight } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavPlateform({ items }) {
//   const location = useLocation();

//   // Safety check
//   if (!items || items.length === 0) {
//     return null;
//   }

//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => {
//           const Icon = item.icon;
//           const hasActiveChild = item.items?.some(
//             (subItem) => location.pathname === subItem.url
//           );

//           return (
//             <Collapsible
//               key={item.title}
//               asChild
//               defaultOpen={hasActiveChild}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {Icon && <Icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items?.map((subItem) => {
//                       const isActive = location.pathname === subItem.url;
//                       return (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild isActive={isActive}>
//                             <Link to={subItem.url}>
//                               <span>{subItem.title}</span>
//                             </Link>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       );
//                     })}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               </SidebarMenuItem>
//             </Collapsible>
//           );
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }


import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavPlateform({ items }) {
  const location = useLocation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const hasActiveChild = item.items?.some(
            (subItem) => location.pathname === subItem.url
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={hasActiveChild}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "group transition-all duration-200 hover:bg-sidebar-accent",
                      hasActiveChild && "bg-sidebar-accent/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-lg p-1.5 transition-all duration-200",
                        hasActiveChild
                          ? "bg-blue-500/20 text-blue-600"
                          : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <span className="flex-1">{item.title}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-8 border-l-2 border-muted">
                    {item.items?.map((subItem) => {
                      const isActive = location.pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              "transition-all duration-200",
                              isActive && "bg-blue-500/10 text-blue-600 font-medium border-l-2 border-blue-500 -ml-[2px]"
                            )}
                          >
                            <Link to={subItem.url}>
                              <span className="text-sm">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}