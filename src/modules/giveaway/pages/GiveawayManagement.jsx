import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiftIcon,
  Trophy,
  Layers,
  Truck,
  Crown,
  LayoutDashboard,
  Package,
  Award,
  Megaphone,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/common/headSubhead";
import Prizes from "./Prizes";
import Campaigns from "./Campaigns";
import BulkCampaigns from "./BulkCampaigns";
import PendingDeliveries from "./PendingDeliveries";
import CampaignWinner from "./CampaignWinner";
import PrizePage from "./prizes.page";
import CampaignsPage from "./campaigns.page";
import BulkCampaignsPage from "./bulk.campaign.page";
import CampaignWinnerPage from "./campaign.winner.page";
import PendingDeliveriesPage from "./pending.deliveries.page";
import { useSelector } from "react-redux";
import ParticipantsPage from "./participants.page";

const TABS = [
  { key: "prizes", label: "Prizes", icon: GiftIcon },
  { key: "campaigns", label: "Campaigns", icon: LayoutDashboard },
  { key: "bulk", label: "Bulk", icon: Layers },
  { key: "deliveries", label: "Deliveries", icon: Truck },
  { key: "winner", label: "Winners", icon: Crown },
  { key: "participants", label: "Participants", icon: Users },
];

export default function GiveawayManagement() {
  const { prizes } = useSelector((s) => s.prize);
  const { campaigns, partipants } = useSelector((s) => s.campaign);
  const { deliveries } = useSelector((s) => s.delivery);
  const { winner } = useSelector((s) => s.winner);

  const [tab, setTab] = useState("prizes");

  // Map the current tab to the corresponding count and label
  const getDynamicStat = () => {
    switch (tab) {
      case "prizes":
        return {
          count: prizes?.length || 0,
          label: "Total Prizes",
          icon: (
            <Trophy className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
          ),
        };
      case "campaigns":
        return {
          count: campaigns?.length || 0,
          label: "Total Campaigns",
          icon: (
            <Megaphone className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
          ),
        };
      case "bulk":
        return {
          count: campaigns?.length || 0,
          label: "Total Campaigns",
          icon: (
            <Megaphone className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
          ),
        };
      case "deliveries":
        return {
          count: deliveries?.length || 0,
          label: "Pending Deliveries",
          icon: (
            <Package className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
          ),
        };
      case "winner":
        return {
          count: winner?.length || 0,
          label: "Total Winners",
          icon: <Award className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />,
        };
      case "participants":
        return {
          count: partipants?.length || 0,
          label: "Total Participants",
          icon: <Award className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />,
        };
      default:
        return {
          count: 0,
          label: "Items",
          icon: (
            <Trophy className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
          ),
        };
    }
  };

  const currentStat = getDynamicStat();

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
            heading="Giveaway Management"
            icon={<GiftIcon className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/40"
            subheading="Manage prizes, campaigns, winners and deliveries from one centralized admin panel."
          />

          {/* Dynamic Quick Stats Summary */}
          <div className="gap-4 hidden lg:flex">
            <motion.div
              key={tab} // Changing key triggers the animation
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-aqua/20 p-2 rounded-xl border border-brand-aqua shadow-sm flex items-center gap-3 min-w-[140px]"
            >
              <div className="p-2 rounded-lg">{currentStat.icon}</div>
              <div>
                <p className="text-[12px] text-slate-600 font-bold uppercase leading-tight">
                  {currentStat.label}
                </p>
                <p className="text-[11px] font-bold text-slate-800">
                  {currentStat.count} {tab === "winner" ? "Records" : "Items"}
                </p>
              </div>
            </motion.div>
          </div>
        </header>

        {/* ================= MODERN TABS ================= */}
        <div className="relative">
          <div className="flex items-center gap-1 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-2xl w-fit border border-slate-200/60 overflow-x-auto no-scrollbar">
            {TABS.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl",
                    isActive
                      ? "text-brand-aqua"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-300/30"
                  )}
                >
                  <t.icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-brand-aqua" : "text-slate-400"
                    )}
                  />
                  {t.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white shadow-sm border border-indigo-100 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <main className="relative h-max bg-white/40 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-1 md:p-2 shadow-sm">
              {/* {tab === "prizes" && <Prizes />} */}
              {tab === "prizes" && <PrizePage />}
              {/* {tab === "campaigns" && <Campaigns />} */}
              {tab === "campaigns" && <CampaignsPage />}
              {/* {tab === "bulk" && <BulkCampaigns />} */}
              {tab === "bulk" && <BulkCampaignsPage />}
              {/* {tab === "deliveries" && <PendingDeliveries />} */}
              {tab === "deliveries" && <PendingDeliveriesPage />}
              {/* {tab === "winner" && <CampaignWinner />} */}
              {tab === "winner" && <CampaignWinnerPage />}
              {tab === "participants" && <ParticipantsPage />}
            </main>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
