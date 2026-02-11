import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextAnimate } from "../ui/text-animate";

/**
 * PageHeader component with Magic UI TextAnimate
 * Features staggered entry for heading and subheading.
 */
const PageHeader = React.forwardRef(
  (
    { className, color, heading, subheading, align = "left", icon, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1.5",
          align === "center" && "items-center text-center",
          align === "right" && "items-end text-right",
          className
        )}
        {...props}
      >
        {/* Container for Icon + Heading */}
        <div className="flex items-center gap-3">
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "flex p-2 size-10 items-center justify-center rounded-xl shadow-xl",
                color
              )}
            >
              {icon}
            </motion.div>
          )}

          <TextAnimate
            animation="slideLeft"
            by="character"
            duration={0.9}
            delay={0.3}
            className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl"
          >
            {heading}
          </TextAnimate>
        </div>

        {/* Subheading with a slight fade-in delay to match TextAnimate */}
        {subheading && (
          //   <motion.p
          //     initial={{ opacity: 0, y: 5 }}
          //     animate={{ opacity: 1, y: 0 }}
          //     transition={{ delay: 0.3, duration: 0.9 }}
          //     className="text-sm font-medium text-muted-foreground max-w-[750px]"
          //   >
          //     {subheading}
          //   </motion.p>

          <TextAnimate
            //   animation="blurIn"
            //   as="h1"
            animation="slideLeft"
            by="character"
            duration={0.9}
            delay={0.3}
            className="text-sm font-medium text-muted-foreground max-w-max"
          >
            {subheading}
          </TextAnimate>
        )}
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";

export { PageHeader };
