import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from "framer-motion"; // Added AnimatePresence
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
import { cn } from "@/lib/utils";

export function NavPlateform({ items }) {
  const location = useLocation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
                      "group relative h-12 w-full transition-all duration-300 rounded-lg px-2",
                      "hover:bg-slate-100/80 active:scale-[0.98]", // Added click compression
                      hasActiveChild &&
                        "!bg-brand-aqua/10 text-brand-aqua border border-brand-aqua/50"
                    )}
                  >
                    {/* Icon with Dynamic Coloring */}
                    <div
                      className={cn(
                        "flex size-7 items-center justify-center rounded-lg transition-all duration-300",
                        hasActiveChild
                          ? "bg-brand-aqua/20 text-brand-aqua shadow-lg shadow-gray-300 scale-105"
                          : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-aqua group-hover:shadow-sm"
                      )}
                    >
                      <Icon className="size-5" />
                    </div>

                    <span className="flex-1 truncate text-sm tracking-tight">
                      {item.title}
                    </span>

                    {/* Dynamic Badge */}
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant || "secondary"}
                        className={cn(
                          "h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full",
                          item.badgeVariant === "destructive" && "animate-pulse"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}

                    <ChevronRight className="ml-1 size-4 opacity-60 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-6 mt-1 flex flex-col gap-1 border-l border-slate-200/60 pl-2">
                    {item.items?.map((subItem) => {
                      const isActive = location.pathname === subItem.url;
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
                              className="flex items-center justify-between w-full"
                            >
                              <span className="text-xs">{subItem.title}</span>
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
