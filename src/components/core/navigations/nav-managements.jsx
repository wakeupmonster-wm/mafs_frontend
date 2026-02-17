import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Added AnimatePresence

import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
              <SidebarMenuItem key={item.title}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      "group relative h-12 w-full transition-all duration-300 rounded-lg px-2",
                      "hover:bg-slate-100/80 active:scale-[0.98]", // Added click compression
                      isActive &&
                        "!bg-brand-aqua/10 border border-brand-aqua/50"
                    )}
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 text-sm"
                    >
                      {/* Icon with Dynamic Coloring */}
                      <div
                        className={cn(
                          "flex size-7 items-center justify-center rounded-lg transition-all duration-300",
                          hasActiveChild
                            ? "text-brand-aqua shadow-lg shadow-blue-500/40" // Added slight tilt for "pop"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-aqua group-hover:shadow-sm"
                        )}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span className="flex-1 truncate text-sm tracking-tight">
                        {item.title}
                      </span>

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
                            item.badgeVariant === "destructive" &&
                              "animate-pulse"
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
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-6 flex flex-col gap-1 border-l border-slate-200/60 pl-2">
                    {item.items?.map((subItem) => {
                      const isActive = location.pathname === subItem.url;
                      const Icon = subItem.icon;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              "group relative h-8 w-full rounded-lg px-3 transition-all duration-200",
                              "hover:bg-slate-50 hover:text-brand-aqua",
                              isActive
                                ? "!bg-brand-aqua/10 text-brand-aqua font-semibold border border-brand-aqua/50"
                                : "text-slate-500 font-medium"
                            )}
                          >
                            <Link
                              to={subItem.url}
                              className="flex items-center w-full"
                            >
                              <div
                                className={cn(
                                  "flex size-4 items-center justify-center rounded-lg transition-all duration-300",
                                  hasActiveChild
                                    ? "bg-brand-aqua/20 text-brand-aqua shadow-lg shadow-gray-300 scale-105"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-aqua group-hover:shadow-sm"
                                )}
                              >
                                <Icon className="size-5" />
                              </div>
                              <span className="text-[11px]">
                                {subItem.title}
                              </span>
                              {isActive && (
                                <motion.div
                                  layoutId="active-dot"
                                  className="size-1 rounded-full bg-brand-aqua shadow-[0_0_8px_rgba(var(--brand-aqua-rgb),0.8)]"
                                />
                              )}
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
