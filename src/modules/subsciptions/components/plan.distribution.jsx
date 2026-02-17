import React from "react";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PlanDistribution = ({ stats }) => {
  // const progress = useMemo(() => {
  //   if (!userData?.startedAt || !userData?.expiresAt) return 0;
  //   const total = new Date(userData.expiresAt) - new Date(userData.startedAt);
  //   const current = new Date() - new Date(userData.startedAt);
  //   return Math.min(100, Math.max(0, (current / total) * 100));
  // }, [userData]);

  return (
    <div className="bg-white p-5 rounded-2xl border border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md">
      <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} /> By Plan
        Type
      </h4>
      <div className="space-y-3">
        {Object.entries(stats?.byPlan || {}).map(([plan, count]) => {
          return (
            <div key={plan} className="group">
              <div className="flex justify-between text-xs mb-1 uppercase font-semibold text-gray-500">
                <span>{plan}</span>
                <span>{count}</span>
              </div>
              <div className="relative h-3 w-full bg-slate-400/30 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / stats?.total) * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className={cn(
                    "relative h-full rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-gradient-to-r from-brand-aqua/80 to-brand-aqua/40"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanDistribution;
