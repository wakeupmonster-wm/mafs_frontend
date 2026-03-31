import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Calendar,
  Gift,
  Trophy,
  Award,
  Users,
  Clock,
  CheckCircle,
  MegaphoneOff,
  Power,
  PowerOff,
  Edit,
  Trash,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

export default function CampaignDetailPanel({
  campaign,
  onClose,
  onEdit,
  onDelete,
  onDisable,
  onActivate,
}) {
  if (!campaign) return null;

  const isCompleted = campaign.drawStatus === "COMPLETED";
  const canDisable = !isCompleted && campaign.isActive;
  const canActivate = !isCompleted && !campaign.isActive;

  const displayStatus = isCompleted
    ? "COMPLETED"
    : campaign.isActive
      ? "ACTIVE"
      : "DISABLED";

  const statusConfig = {
    COMPLETED: {
      className: "bg-green-50 border-green-200 text-green-700",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
    },
    ACTIVE: {
      className: "bg-emerald-50 border-emerald-200 text-emerald-700",
      icon: (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
      ),
    },
    DISABLED: {
      className: "bg-slate-100 border-slate-300 text-slate-600",
      icon: <MegaphoneOff className="h-3.5 w-3.5" />,
    },
  };

  const currentStatus = statusConfig[displayStatus] || statusConfig.DISABLED;
  const winner = campaign.winner;
  const hasWinner = winner && (winner.email || winner.phone);
  const prize = campaign.prize;

  const InfoRow = ({ icon: Icon, label, value, iconColor = "text-slate-400" }) => (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className={cn("p-2 rounded-lg bg-slate-50 flex-shrink-0", iconColor)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-brand-aqua p-5 sm:p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  Campaign Details
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold tracking-wider uppercase",
                  currentStatus.className
                )}
              >
                {currentStatus.icon}
                {displayStatus}
              </span>
              {campaign.createdAt && (
                <span className="text-xs text-white/70">
                  Created {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 sm:p-6 space-y-6">
              {/* Campaign Info */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Campaign Information
                </h3>
                <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-4">
                  <InfoRow
                    icon={Calendar}
                    label="Created On"
                    value={
                      campaign.createdAt
                        ? format(new Date(campaign.createdAt), "EEEE, MMM dd, yyyy 'at' h:mm a")
                        : null
                    }
                    iconColor="text-brand-aqua"
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Campaign Date"
                    value={
                      campaign.date
                        ? format(
                          new Date(campaign.date + (campaign.date.includes("T") ? "" : "T12:00:00")),
                          "MMM dd, yyyy"
                        )
                        : null
                    }
                    iconColor="text-blue-500"
                  />
                  <InfoRow
                    icon={Clock}
                    label="Draw Status"
                    value={campaign.drawStatus}
                    iconColor="text-amber-500"
                  />
                </div>
              </div>

              {/* Prize Info */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Prize Details
                </h3>
                <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-4">
                  <InfoRow
                    icon={Trophy}
                    label="Prize Name"
                    value={prize?.title}
                    iconColor="text-amber-500"
                  />
                  <InfoRow
                    icon={Gift}
                    label="Prize Type"
                    value={prize?.type}
                    iconColor="text-purple-500"
                  />
                  {prize?.planType && (
                    <InfoRow
                      icon={Clock}
                      label="Plan Type"
                      value={prize.planType}
                      iconColor="text-indigo-500"
                    />
                  )}
                  {prize?.value && (
                    <InfoRow
                      icon={Trophy}
                      label="Value"
                      value={`$${prize.value}`}
                      iconColor="text-green-500"
                    />
                  )}
                  {prize?.spinWheelLabel && (
                    <InfoRow
                      icon={Gift}
                      label="Spin Wheel Label"
                      value={prize.spinWheelLabel}
                      iconColor="text-pink-500"
                    />
                  )}
                </div>
              </div>

              {/* Winner Info */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Winner
                </h3>
                <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-4">
                  {hasWinner ? (
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {winner.email || winner.phone}
                        </p>
                        {winner.nickname && (
                          <p className="text-xs text-slate-500">
                            @{winner.nickname}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <p className="text-sm text-slate-400 italic">
                        No winner selected yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex-shrink-0 p-4 sm:p-5 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex-1 h-10 gap-2 font-semibold text-xs rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  onClose();
                  onEdit(campaign);
                }}
              >
                <Edit className="h-3.5 w-3.5" /> Edit
              </Button>

              {canActivate && (
                <Button
                  variant="outline"
                  className="flex-1 h-10 gap-2 font-semibold text-xs rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => {
                    onClose();
                    onActivate(campaign._id || campaign.id);
                  }}
                >
                  <Power className="h-3.5 w-3.5" /> Activate
                </Button>
              )}

              {canDisable && (
                <Button
                  variant="outline"
                  className="flex-1 h-10 gap-2 font-semibold text-xs rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50"
                  onClick={() => {
                    onClose();
                    onDisable(campaign._id || campaign.id);
                  }}
                >
                  <PowerOff className="h-3.5 w-3.5" /> Disable
                </Button>
              )}

              <Button
                variant="outline"
                className="flex-1 h-10 gap-2 font-semibold text-xs rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => {
                  onClose();
                  onDelete(campaign._id || campaign.id, campaign.createdAt);
                }}
              >
                <Trash className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
