import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

export default function EntitlementPage() {
  const dispatch = useDispatch();
  // const {
  //   data,
  //   pagination: reduxPagination,
  //   loading,
  // } = useSelector((s) => s.entitlement);

  // Table States
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

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
            heading="Manual Entitlements & Trials"
            icon={<CreditCard className="w-9 h-9 text-white" />}
            color="bg-brand-aqua shadow-xl shadow-cyan-100"
            subheading="Manually grant or revoke premium access and free trials to specific users."
          />

          <Button className="bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-11 px-4 shadow-sm shadow-neutral-400">
            <Plus className="w-4 h-4" /> Grant New Access
          </Button>
        </header>
      </motion.div>
    </div>
  );
}
