import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  DollarSign,
  RefreshCcw,
  History,
  Zap,
  Database,
  CheckCircle2,
  Calendar,
  Copy,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  clearSelectedUser,
  fetchUserDetails,
} from "../store/subcription.slices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/images/dummyImg.jpg";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { IoLogoApple } from "react-icons/io5";
import { AiFillAndroid } from "react-icons/ai";
import { PreLoader } from "@/app/loader/preloader";

export default function ViewSubscriptionsPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading } = useSelector((state) => state.subscription);

  const { transactions, events, summary, user } = userData || {};

  // Progress Logic
  const progress = useMemo(() => {
    if (!userData?.startedAt || !userData?.expiresAt) return 0;
    const total = new Date(userData.expiresAt) - new Date(userData.startedAt);
    const current = new Date() - new Date(userData.startedAt);
    return Math.min(100, Math.max(0, (current / total) * 100));
  }, [userData]);

  const copyEmail = () => {
    navigator.clipboard.writeText(user?.email);
    toast.success("Email copied", { id: "email-copy" });
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(user?.phone);
    toast.success("Phone copied", { id: "phone-copy" });
  };

  const PlatformIcon =
    userData?.platform === "ios" ? IoLogoApple : AiFillAndroid;

  useEffect(() => {
    if (userId) dispatch(fetchUserDetails(userId));
    return () => dispatch(clearSelectedUser());
  }, [dispatch, userId]);

  // ✅ CRITICAL: You must RETURN the component
  if (loading) {
    return <PreLoader />;
  }

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div className="flex-1 flex-col items-start space-y-3">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-slate-100 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Analytics
          </Button>

          {/* TOP NAVIGATION & STATUS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                  <AvatarImage
                    src={user?.avatar?.url || dummyImg}
                    alt={user?.nickname}
                  />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-bold">
                    {user?.nickname}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "absolute bottom-0 right-1 p-1 rounded-full border-2 border-white shadow-lg",
                    userData?.status === "ACTIVE"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  )}
                >
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div> */}

              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-xl ">
                      <AvatarImage
                        src={user?.avatar?.url || dummyImg}
                        alt={user?.nickname}
                      />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-bold">
                        {user?.nickname}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "absolute bottom-0 right-1 p-1 rounded-full border-2 border-white shadow-lg",
                        userData?.status === "ACTIVE"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      )}
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-md border-none bg-transparent shadow-none p-0">
                  <img
                    src={user?.avatar?.url || dummyImg}
                    alt={user?.nickname}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </DialogContent>
              </Dialog>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-black text-slate-900 capitalize tracking-tight">
                    {user?.nickname || "Unknown User"}
                  </h1>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 font-bold shadow-sm ring-1 ring-inset",
                      userData?.platform === "ios"
                        ? "bg-slate-900 text-white ring-slate-800" // iOS: Dark premium look
                        : "bg-emerald-50 text-emerald-700 ring-emerald-100" // Android: Play Store green feel
                    )}
                  >
                    <PlatformIcon
                      className={cn(
                        "w-3.5 h-3.5",
                        userData?.platform === "ios"
                          ? "text-white"
                          : "text-emerald-600"
                      )}
                    />
                    {userData?.platform === "ios" ? "IOS" : "Android"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer truncate group w-max">
                    <Mail className="w-3.5 h-3.5" /> {user?.email}
                    <Copy
                      onClick={copyEmail}
                      title="Copy Email"
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand-aqua"
                    />
                  </span>

                  <span className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer truncate group w-max">
                    <Phone className="w-3.5 h-3.5" />
                    {user?.phone}
                    <Copy
                      onClick={copyPhone}
                      title="Copy Phone"
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand-aqua"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-gradient-to-br from-amber-200/20 via-amber-400/10 to-amber-50 px-6 py-3 rounded-xl border border-slate-100 shadow-md">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">
                  Environment
                </p>
                <Badge
                  className={cn(
                    "font-black uppercase text-xs tracking-tighter",
                    userData?.environment === "sandbox"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : "bg-indigo-600 text-white"
                  )}
                >
                  {userData?.environment}
                </Badge>
              </div>

              <div className="bg-gradient-to-br from-emerald-200/20 via-emerald-400/10 to-emerald-50 px-6 py-3 rounded-xl border border-slate-100 text-center shadow-md">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Current Status
                </p>
                <p
                  className={cn(
                    "text-sm font-black",
                    userData?.status === "ACTIVE"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  )}
                >
                  {userData?.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINANCIAL & USAGE KPI GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Lifetime Value"
            value={`$${(summary?.totalPaid - summary?.totalRefunded).toFixed(
              2
            )}`}
            icon={DollarSign}
            color="emerald"
            description="Net revenue generated"
          />
          <KPICard
            title="Total Transactions"
            value={summary?.totalTransactions}
            icon={History}
            color="amber"
            description="Since first started"
          />
          <KPICard
            title="Days Active"
            value={summary?.daysSinceStart}
            icon={Zap}
            color="rose"
            description="Since first started"
          />
          <KPICard
            title="Auto Renew"
            value={userData?.autoRenew ? "Enabled" : "Disabled"}
            icon={RefreshCcw}
            color={userData?.autoRenew ? "blue" : "slate"}
            description="Cycle status"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN: IDENTITY & PLAN */}
          <div className="space-y-4">
            <Card className="rounded-xl border hover:border-gray-300 shadow-lg shadow-slate-200">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <ShieldCheck
                    className="w-5 h-5 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                  Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoRow
                  label="Email Address"
                  value={user?.email}
                  icon={Mail}
                />
                <InfoRow
                  label="Phone Number"
                  value={user?.phone}
                  icon={Phone}
                />
                <InfoRow
                  label="Platform Source"
                  value={userData?.platform}
                  icon={Globe}
                  badge
                />
                <Separator />
                <InfoRow label="User ID" value={user?.userId} mono />
              </CardContent>
            </Card>

            {/* 3. LEFT CONTENT: Plan & Progress */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="rounded-xl border hover:border-gray-300 shadow-lg shadow-slate-200 gap-4">
                <CardHeader>
                  <CardTitle className="text-base font-black flex items-center gap-2">
                    <Calendar
                      className="w-5 h-5 text-brand-aqua"
                      strokeWidth={2.5}
                    />{" "}
                    Subscription Cycle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="relative pt-2">
                      <div className="flex justify-between items-end mb-2">
                        <div className="text-xl font-black">
                          {Math.round(progress)}%
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 text-right uppercase">
                          Progress to Renewal
                        </div>
                      </div>
                      <Progress
                        value={progress}
                        className="h-2 rounded-full bg-slate-200"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <div className="p-3 text-center bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Started
                        </p>
                        <p className="text-xs font-semibold">
                          {userData?.startedAt
                            ? format(
                                new Date(userData.startedAt),
                                "MMM dd, yyyy"
                              )
                            : "-"}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 text-center rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Expires
                        </p>
                        <p className="text-xs font-semibold">
                          {userData?.expiresAt
                            ? format(
                                new Date(userData.expiresAt),
                                "MMM dd, yyyy"
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <Separator className="opacity-50" />

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Offer Type</span>
                        <span className="font-bold text-slate-700">
                          {userData?.offerType || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Family Sharing</span>
                        <span className="font-bold text-slate-700">
                          {userData?.isInFamilySharing ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Plan Type</span>
                        <span className="font-bold text-slate-700">
                          {userData?.planType || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Product Id</span>
                        <span className="font-bold text-slate-700">
                          {userData?.productId || "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RIGHT COLUMN: TRANSACTIONAL AUDIT */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl border hover:border-gray-300 shadow-lg shadow-slate-200 gap-4">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <History
                    className="w-5 h-5 text-brand-aqua"
                    strokeWidth={2.5}
                  />{" "}
                  Transactional History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Txn ID</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.map((txn) => (
                      <TableRow key={txn._id} className="text-xs">
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[10px] tracking-tight"
                          >
                            {txn.eventType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-emerald-600">
                          ${txn.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-mono text-slate-400">
                          {txn.transactionId}
                        </TableCell>
                        <TableCell className="text-right">
                          {format(new Date(txn.occurredAt), "MMM dd, HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="rounded-xl border hover:border-gray-300 shadow-lg shadow-slate-200 gap-4">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Database
                      className="w-5 h-5 text-brand-aqua"
                      strokeWidth={2.5}
                    />
                    Webhook Lifecycle
                  </CardTitle>
                  <Badge className="bg-brand-aqua/10 text-brand-aqua border-brand-aqua">
                    System Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Original Txn Id</TableHead>
                      <TableHead>Txn ID</TableHead>
                      <TableHead>Product ID</TableHead>
                      <TableHead>User ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events?.map((txn) => (
                      <TableRow key={txn._id} className="text-xs">
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[10px] tracking-tight"
                          >
                            {txn.eventType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-emerald-600">
                          ${txn?.rawPayload?.originalTransactionId}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[12px] font-mono tracking-tight text-gray-600"
                          >
                            {txn?.rawPayload?.transactionId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[12px] font-mono tracking-tight text-gray-600"
                          >
                            {txn?.rawPayload?.productId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-[12px] font-mono tracking-tight text-gray-600"
                          >
                            {txn?.rawPayload?.userId}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* HELPER COMPONENTS */
const KPICard = ({ title, value, icon: Icon, color, description }) => {
  const colorMap = {
    blue: "from-blue-500/20 to-blue-600/5 text-blue-600 border-blue-100 bg-blue-200",
    emerald:
      "from-emerald-500/20 to-emerald-600/5 text-emerald-600 border-emerald-100 bg-emerald-200",
    amber:
      "from-amber-500/20 to-amber-600/5 text-amber-600 border-amber-100 bg-amber-200",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-600 border-rose-100 bg-rose-200",
    purple:
      "from-purple-500/20 to-purple-600/5 text-purple-600 border-purple-100 bg-purple-200",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-300 hover:shadow-blue-200",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-200",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-300 hover:shadow-amber-200",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-300 hover:shadow-rose-200",
    purple:
      "from-purple-300/20 to-purple-500/10 to-transparent text-purple-600 border-purple-200 hover:border-purple-300 hover:shadow-purple-200",
  };

  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-md py-4 bg-gradient-to-br",
        bgMap[color]
      )}
    >
      <CardContent className="p-4 flex items-center gap-4">
        {/* <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600`}> */}
        <div
          className={cn(
            "p-3 rounded-2xl bg-gradient-to-br border shadow-sm",
            colorMap[color]
          )}
        >
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoRow = ({ label, value, icon: Icon, badge, mono, capitalize }) => (
  <div className="flex items-center gap-3">
    {Icon && (
      <div className="p-2 bg-slate-200/60 rounded-lg border border-slate-100">
        <Icon className="w-3.5 h-3.5 text-brand-aqua" strokeWidth={2.5} />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">
        {label}
      </p>
      {badge ? (
        <Badge variant="secondary" className={`capitalize text-[11px] h-5`}>
          {value}
        </Badge>
      ) : (
        <p
          className={`text-sm font-medium text-slate-700 truncate ${
            mono ? "font-mono text-xs" : ""
          } ${capitalize ? "capitalize" : ""}`}
        >
          {value || "N/A"}
        </p>
      )}
    </div>
  </div>
);
