// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { TextAnimate } from "../ui/text-animate";

// /**
//  * PageHeader component with Magic UI TextAnimate
//  * Features staggered entry for heading and subheading.
//  */
// const PageHeader = React.forwardRef(
//   (
//     { className, color, heading, subheading, align = "left", icon, ...props },
//     ref
//   ) => {
//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "flex flex-col gap-1.5",
//           align === "center" && "items-center text-center",
//           align === "right" && "items-end text-right",
//           className
//         )}
//         {...props}
//       >
//         {/* Container for Icon + Heading */}
//         <div className="flex items-center gap-3">
//           {icon && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, x: -10 }}
//               animate={{ opacity: 1, scale: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className={cn(
//                 "flex p-2 size-10 items-center justify-center rounded-xl shadow-xl",
//                 color
//               )}
//             >
//               {icon}
//             </motion.div>
//           )}

//           <TextAnimate
//             animation="slideLeft"
//             by="character"
//             duration={0.9}
//             delay={0.3}
//             className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl"
//           >
//             {heading}
//           </TextAnimate>
//         </div>

//         {/* Subheading with a slight fade-in delay to match TextAnimate */}
//         {subheading && (
//           //   <motion.p
//           //     initial={{ opacity: 0, y: 5 }}
//           //     animate={{ opacity: 1, y: 0 }}
//           //     transition={{ delay: 0.3, duration: 0.9 }}
//           //     className="text-sm font-medium text-muted-foreground max-w-[750px]"
//           //   >
//           //     {subheading}
//           //   </motion.p>

//           <TextAnimate
//             //   animation="blurIn"
//             //   as="h1"
//             animation="slideLeft"
//             by="character"
//             duration={0.9}
//             delay={0.3}
//             className="text-sm font-medium text-muted-foreground max-w-max"
//           >
//             {subheading}
//           </TextAnimate>
//         )}
//       </div>
//     );
//   }
// );

// PageHeader.displayName = "PageHeader";

// export { PageHeader };

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PageHeader = React.forwardRef(
  (
    { className, color, heading, subheading, align = "left", icon, ...props },
    ref
  ) => {
    // Minimalist animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1, // Smooth sequence
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 }, // Subtle slide up
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1], // Custom "expo" ease for premium feel
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "flex flex-col gap-1",
          align === "center" && "items-center text-center",
          align === "right" && "items-end text-right",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Minimalist Icon Animation */}
          {icon && (
            <motion.div
              variants={itemVariants}
              className={cn(
                "flex p-2 size-10 items-center justify-center rounded-xl shadow-xl",
                color || "bg-white"
              )}
            >
              {icon}
            </motion.div>
          )}

          {/* Heading: Fade and Slide */}
          <motion.h1
            variants={itemVariants}
            className="text-xl font-semibold text-slate-900 tracking-tight sm:text-2xl"
          >
            {heading}
          </motion.h1>
        </div>

        {/* Subheading: Softer transition */}
        {subheading && (
          <motion.p
            variants={itemVariants}
            className="text-[13px] leading-relaxed text-slate-500 max-w-[600px] font-medium"
          >
            {subheading}
          </motion.p>
        )}

        {/* Minimalist Accent Line (Optional) */}
        {/* <motion.div
          variants={itemVariants}
          className="h-[1px] w-12 bg-indigo-500/30 mt-1 rounded-full"
        /> */}
      </motion.div>
    );
  }
);

PageHeader.displayName = "PageHeader";

export { PageHeader };
