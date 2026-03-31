import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Megaphone,
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
  Eye,
  Layers,
  Tag,
  Type,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";
import {
  fetchCampaigns,
  disableCampaign,
  activateCampaign,
  deleteCampaign,
  participantsCampaign,
} from "../store/campaign.slice";
import ConfirmModal from "@/components/common/ConfirmModal";

// Removed TABS array since we are stacking content vertically

export default function ViewCampaignDetailPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { campaigns, loading } = useSelector((s) => s.campaign);
  const { partipants, pagination: partPagination } = useSelector(
    (s) => s.campaign
  );

  const [confirmAction, setConfirmAction] = useState({
    isOpen: false,
    type: null, // 'ACTIVATE', 'DISABLE', 'DELETE'
  });

  // Fetch campaign data
  useEffect(() => {
    dispatch(fetchCampaigns({ page: 1, limit: 100 }));
  }, [dispatch]);

  // Fetch participants for this campaign
  useEffect(() => {
    if (campaignId) {
      dispatch(
        participantsCampaign({ campaignId, page: 1, limit: 50 })
      );
    }
  }, [dispatch, campaignId]);

  // Find current campaign from Redux
  const campaign = useMemo(() => {
    return campaigns?.find(
      (c) => c._id === campaignId || c.id === campaignId
    );
  }, [campaigns, campaignId]);

  if (loading && !campaign) return <PreLoader />;

  if (!campaign) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center min-h-[500px] p-6">
        <MegaphoneOff className="h-16 w-16 text-slate-300 mb-4" />
        <p className="text-lg font-bold text-slate-500">Campaign not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mt-4 gap-2 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  // Status logic
  const isCompleted = campaign.drawStatus === "COMPLETED";
  const displayStatus = isCompleted
    ? "COMPLETED"
    : campaign.isActive
      ? "ACTIVE"
      : "DISABLED";

  const statusStyles = {
    COMPLETED: "bg-green-50 border-green-200 text-green-700",
    ACTIVE: "bg-emerald-50 border-emerald-200 text-emerald-700",
    DISABLED: "bg-slate-100 border-slate-300 text-slate-600",
  };

  const prize = campaign.prize;
  const winner = campaign.winner;
  const hasWinner = winner && (winner.email || winner.phone);

  // Handlers
  const handleConfirmAction = async () => {
    const { type } = confirmAction;
    try {
      if (type === "DELETE") {
        await dispatch(deleteCampaign(campaignId)).unwrap();
        toast.success("Campaign deleted");
        navigate(-1);
      } else if (type === "DISABLE") {
        await dispatch(disableCampaign(campaignId)).unwrap();
        toast.success("Campaign disabled");
        dispatch(fetchCampaigns({ page: 1, limit: 100 }));
      } else if (type === "ACTIVATE") {
        await dispatch(activateCampaign(campaignId)).unwrap();
        toast.success("Campaign activated");
        dispatch(fetchCampaigns({ page: 1, limit: 100 }));
      }
    } catch (err) {
      toast.error(err || `Failed to ${type.toLowerCase()} campaign`);
    } finally {
      setConfirmAction({ isOpen: false, type: null });
    }
  };

  // ─── Info Card Component ───
  const InfoCard = ({ icon: Icon, label, value, iconColor = "text-brand-aqua" }) => (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={cn("p-2.5 rounded-xl bg-slate-50 flex-shrink-0", iconColor)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-800 mt-0.5 break-words">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  // ─── CSV Download Handler ───
  const handleDownloadCSV = () => {
    if (!partipants || partipants.length === 0) {
      toast.error("No participants to download");
      return;
    }

    const headers = [
      "S.No",
      "Username/Nickname",
      "Email",
      "Phone",
      "Gender",
      "Age",
      "Location",
      "Account Type",
      "Is Winner",
    ];

    const escapeCSV = (value) => {
      if (!value) return "—";
      // Convert to string and double quote if it contains commas, double quotes, or new lines
      const str = String(value);
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [headers.join(",")];

    partipants.forEach((p, idx) => {
      const location = p.city ? `${p.city}${p.country ? `, ${p.country}` : ""}` : "";
      const row = [
        idx + 1,
        escapeCSV(p.nickname),
        escapeCSV(p.email),
        escapeCSV(p.phone),
        escapeCSV(p.gender),
        escapeCSV(p.age),
        escapeCSV(location),
        escapeCSV(p.isPremium ? "Premium" : "Free"),
        escapeCSV(p.isWinner ? "Yes" : "No"),
      ];
      csvRows.push(row.join(","));
    });

    const csvStr = csvRows.join("\n");
    const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const safeTitle = (campaign.title || "Campaign")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `participants_${safeTitle}_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Participants downloaded successfully");
  };

  console.log("partipants data", partipants)

  return (
    <div className="relative flex flex-1 flex-col min-h-screen p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 pb-12 font-jakarta">
      {loading && (
        <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <PreLoader />
        </div>
      )}
      <motion.div
        className="max-w-6xl mx-auto w-full space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ─── HEADER ─── */}
        <header className="space-y-5">
          {/* Back Button */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="h-9 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-widest gap-2 px-4 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Campaigns
            </Button>
            <Badge
              variant="outline"
              className="h-7 border-brand-aqua/30 bg-white text-brand-aqua font-black text-[10px] uppercase tracking-widest px-3 hidden sm:flex"
            >
              ID: {campaignId?.slice(-8)?.toUpperCase()}
            </Badge>
          </div>

          {/* Campaign Hero Card */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 backdrop-blur-xl p-5 sm:p-6 rounded-[2rem] border border-brand-aqua/30 shadow-2xl shadow-brand-aqua/5 bg-white/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="bg-brand-aqua p-4 rounded-2xl shadow-xl flex-shrink-0">
                <Megaphone className="h-7 w-7 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {prize?.title || "Campaign"}
                  </h1>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
                      statusStyles[displayStatus]
                    )}
                  >
                    {displayStatus === "ACTIVE" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                    {displayStatus === "COMPLETED" && <CheckCircle className="h-3 w-3" />}
                    {displayStatus === "DISABLED" && <MegaphoneOff className="h-3 w-3" />}
                    {displayStatus}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand-aqua" />
                    Created{" "}
                    {campaign.createdAt
                      ? formatDistanceToNow(new Date(campaign.createdAt), {
                        addSuffix: true,
                      })
                      : "—"}
                  </span>
                  {prize?.type && (
                    <span className="flex items-center gap-1.5">
                      <Gift className="h-3.5 w-3.5 text-brand-aqua" />
                      {prize.type}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {!isCompleted && !campaign.isActive && (
                <Button
                  onClick={() => setConfirmAction({ isOpen: true, type: "ACTIVATE" })}
                  className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-10 px-5 font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Power className="h-3.5 w-3.5" /> Activate
                </Button>
              )}
              {!isCompleted && campaign.isActive && (
                <Button
                  onClick={() => setConfirmAction({ isOpen: true, type: "DISABLE" })}
                  className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-10 px-5 font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <PowerOff className="h-3.5 w-3.5" /> Disable
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => setConfirmAction({ isOpen: true, type: "DELETE" })}
                className={`flex-1 sm:flex-none h-10 px-5 font-black text-[10px] uppercase tracking-widest gap-2 rounded-xl transition-all ${hasWinner
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 hover:bg-slate-100 opacity-70"
                  : "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100"
                  }`}
                disabled={hasWinner}
                title={hasWinner ? "Cannot delete campaign with existing winners" : "Delete Campaign"}
              >
                <Trash className="h-3.5 w-3.5" /> {hasWinner ? "Cannot Delete" : "Delete"}
              </Button>
            </div>
          </div>
        </header>

        {/* ─── CONTENT (Stacked) ─── */}
        <div className="space-y-6">
          {/* ─── CAMPAIGN INFO SECTION ─── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-aqua" />
                Campaign Information
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <InfoCard
                  icon={Type}
                  label="Campaign Name"
                  value={campaign.title || "Untitled"}
                  iconColor="text-brand-aqua"
                />
                <InfoCard
                  icon={Calendar}
                  label="Created On"
                  value={
                    campaign.createdAt
                      ? format(new Date(campaign.createdAt), "EEEE, MMM dd, yyyy 'at' h:mm a")
                      : null
                  }
                />
                <InfoCard
                  icon={Calendar}
                  label="Campaign Date"
                  value={
                    campaign.date
                      ? format(
                        new Date(
                          campaign.date +
                          (campaign.date.includes("T") ? "" : "T12:00:00")
                        ),
                        "MMM dd, yyyy"
                      )
                      : null
                  }
                  iconColor="text-teal-500"
                />
                <InfoCard
                  icon={Clock}
                  label="Draw Status"
                  value={campaign.drawStatus}
                  iconColor="text-cyan-600"
                />
              </div>
            </div>
          </div>

          {/* ─── PRIZE INFO SECTION ─── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-brand-aqua" />
                Prize Details
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <InfoCard
                  icon={Trophy}
                  label="Prize Name"
                  value={prize?.title}
                  iconColor="text-brand-aqua"
                />
                <InfoCard
                  icon={Gift}
                  label="Prize Type"
                  value={prize?.type}
                  iconColor="text-teal-500"
                />
                {prize?.planType && (
                  <InfoCard
                    icon={Layers}
                    label="Plan Type"
                    value={prize.planType}
                    iconColor="text-cyan-600"
                  />
                )}
                {prize?.value != null && (
                  <InfoCard
                    icon={Trophy}
                    label="Value"
                    value={`$${prize.value}`}
                    iconColor="text-brand-aqua"
                  />
                )}
                {prize?.durationInDays != null && (
                  <InfoCard
                    icon={Clock}
                    label="Duration"
                    value={`${prize.durationInDays} days`}
                    iconColor="text-teal-600"
                  />
                )}
                {prize?.spinWheelLabel && (
                  <InfoCard
                    icon={Gift}
                    label="Spin Wheel Label"
                    value={prize.spinWheelLabel}
                    iconColor="text-brand-aqua"
                  />
                )}
              </div>

              {/* Supportive Items */}
              {prize?.supportiveItems?.length > 0 && (
                <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5" />
                    Supportive Items
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {prize.supportiveItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-aqua/10 text-brand-aqua text-[11px] font-bold tracking-wide border border-brand-aqua/20"
                      >
                        <Tag className="h-3 w-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── WINNER SECTION ─── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Award className="h-4 w-4 text-brand-aqua" />
                Winner
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              {hasWinner ? (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-brand-aqua/10 text-brand-aqua flex-shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-slate-800 truncate">
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
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-400 flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-400 italic">
                    No winner selected yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ─── PARTICIPANTS SECTION ─── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">
                  Participants
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Users who entered this campaign giveaway
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={handleDownloadCSV}
                  disabled={!partipants || partipants.length === 0}
                  className="h-9 bg-brand-aqua hover:bg-brand-aqua/90 text-white font-semibold shadow-md transition-all active:scale-95 gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Badge className="bg-brand-aqua/10 text-brand-aqua border-brand-aqua/20 font-black text-xs">
                  {partipants?.length || 0} entries
                </Badge>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <PreLoader />
              </div>
            ) : partipants?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50 border-b">
                    <tr>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 px-5 py-3">
                        S. NO.
                      </th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 px-5 py-3">
                        User
                      </th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 px-5 py-3">
                        Contact
                      </th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 px-5 py-3">
                        Location
                      </th>
                      <th className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 px-5 py-3">
                        Account
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {partipants.map((p, idx) => (
                      <tr
                        key={p._id || idx}
                        className={cn(
                          "border-b border-slate-50 transition-colors hover:bg-slate-50/50",
                          p.isWinner && "bg-amber-50/30 hover:bg-amber-50"
                        )}
                      >
                        <td className="px-5 py-3 text-xs font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            {p.photo?.url ? (
                              <img
                                src={p.photo.url}
                                alt={p.nickname || "User"}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500">
                                <Users className="w-4 h-4" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-800 capitalize">
                                {p.nickname || "Unknown"}
                              </span>
                              {p.gender && (
                                <span className="text-[10px] text-slate-400 capitalize">
                                  {p.gender} {p.age ? `• ${p.age}` : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex flex-col">
                            {p.email && <span className="text-xs font-medium text-slate-600">{p.email}</span>}
                            {p.phone && <span className="text-[11px] text-slate-400 font-mono">{p.phone}</span>}
                            {!p.email && !p.phone && <span className="text-xs text-slate-400">—</span>}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs font-medium text-slate-600">
                          {p.city ? `${p.city}${p.country ? `, ${p.country}` : ''}` : "—"}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            {p.isPremium ? (
                              <Badge className="bg-brand-aqua/10 text-brand-aqua hover:bg-brand-aqua/20 border-none text-[10px] py-0 px-2 uppercase tracking-wide">
                                Premium
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-500 border-slate-200 text-[10px] py-0 px-2 uppercase tracking-wide">
                                Free
                              </Badge>
                            )}
                            {p.isWinner && (
                              <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-none text-[10px] py-0 px-2 uppercase tracking-wide flex gap-1">
                                <Trophy className="w-3 h-3" /> Winner
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] opacity-40">
                <Users className="h-12 w-12 text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-500">
                  No participants yet
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Participants will appear here when users enter the
                  giveaway.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Confirm Action */}
      <ConfirmModal
        isOpen={confirmAction.isOpen}
        onClose={() => setConfirmAction({ isOpen: false, type: null })}
        onConfirm={handleConfirmAction}
        title={`${confirmAction.type === "DELETE" ? "Delete" : confirmAction.type === "DISABLE" ? "Disable" : "Activate"} Campaign`}
        message={`Are you sure you want to ${confirmAction.type?.toLowerCase()} this campaign? ${confirmAction.type === "DELETE" ? "This cannot be undone." : ""}`}
        confirmText={confirmAction.type === "DELETE" ? "Delete Permanently" : confirmAction.type === "DISABLE" ? "Disable Campaign" : "Activate Campaign"}
        type={confirmAction.type === "DELETE" ? "danger" : confirmAction.type === "DISABLE" ? "warning" : "success"}
        loading={loading}
      />
    </div>
  );
}
