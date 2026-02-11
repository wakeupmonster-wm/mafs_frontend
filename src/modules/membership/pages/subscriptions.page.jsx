import React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { CreditCard } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
      <motion.div
        className="max-w-7xl mx-auto w-full space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <PageHeader
            heading="Subscription Management"
            icon={<CreditCard className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-indigo-200"
            subheading="Monitor active plans, renewals, and revenue streams."
          />
        </header>
      </motion.div>
    </div>
  );
}
