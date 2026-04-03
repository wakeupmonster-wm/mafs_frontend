import { IconRefresh, IconAlertCircle } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function ErrorState({ error, fetchVisitorData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full mx-auto"
    >
      <Card className="rounded-[35px] border border-slate-300/60 shadow-xl shadow-slate-200/50 bg-white overflow-hidden relative">
        {/* Subtle Background Pattern */}
        {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-rose-500 to-red-400" /> */}

        <CardContent className="h-[350px] flex flex-col items-center justify-center p-8 text-center">
          {/* Error Icon with Soft Glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50 scale-150" />
            <div className="relative flex items-center justify-center w-20 h-20 rounded-[28px] bg-red-50 border border-red-100 text-red-500 shadow-sm">
              <IconAlertCircle size={40} stroke={1.5} />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2 mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Oops! Something went wrong
            </h3>
            <p className="text-sm font-medium text-slate-500 max-w-[250px] leading-relaxed">
              {error || "We couldn't load the dashboard data at this moment."}
            </p>
          </div>

          {/* Premium Styled Retry Button */}
          <Button
            onClick={fetchVisitorData}
            className="group relative flex items-center gap-3 px-8 py-6 border border-slate-200 bg-white hover:bg-brand-aqua text-brand-aqua hover:text-white rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <IconRefresh
              size={18}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            Try Again
          </Button>
        </CardContent>

        {/* Decorative Bottom Wave (Faded version of your main cards) */}
        <div className="absolute bottom-0 left-0 w-full opacity-[0.06] bg-brand-aqua pointer-events-none">
          <svg viewBox="0 0 400 100" fill="none">
            <path
              d="M0 80 C 100 70 150 90 250 50 C 320 30 350 20 400 0 L 400 100 L 0 100 Z"
              fill="currentColor"
              //   color="#46C7CD"
            />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
}
