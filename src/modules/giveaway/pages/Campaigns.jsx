import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  fetchPrizes,
  createCampaign,
  disableCampaign,
  activateCampaign,
  deleteCampaign,
  clearGiveawayStatus,
  updateCampaign,
} from "../store/giveaway.slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ActionDropdown from "../components/ActionDropdown";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  CalendarDays,
  Gift,
  Plus,
  Megaphone,
  Loader2,
  PlayCircle,
  XCircle,
  ListPlus,
  Trophy,
  Inbox,
  Search,
  Filter,
  Edit2,
  Award,
  X,
} from "lucide-react";
import { toast } from "sonner";

function getCampaignStatus(campaign) {
  // Check if campaign has winner using winnerUserId field
  if (campaign.winnerUserId) {
    return "COMPLETED";
  }

  if (campaign.failureReason === "Disabled by admin") {
    return "DISABLED";
  }

  if (campaign.isActive) {
    return "ACTIVE";
  }

  return "DISABLED";
}

export default function Campaigns() {
  const dispatch = useDispatch();
  const { campaigns, prizes, loading, error, successMessage } = useSelector(
    (s) => s.giveaway
  );

  const [form, setForm] = useState({
    date: "",
    prizeId: "",
    supportiveItems: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Initial data fetch
  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(fetchPrizes());
  }, [dispatch]);

  // Handle success and error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearGiveawayStatus());
      // Refetch campaigns after success
      dispatch(fetchCampaigns());
    }

    if (error) {
      toast.error(typeof error === "string" ? error : error.message);
      dispatch(clearGiveawayStatus());
    }
  }, [successMessage, error, dispatch]);

  const validateForm = useCallback(() => {
    const trimmedDate = form.date.trim();
    const trimmedPrizeId = form.prizeId.trim();
    // const trimmedItems = form.supportiveItems.trim();

    if (!trimmedDate) {
      toast.error("Campaign date is required");
      return false;
    }

    const selectedDate = new Date(trimmedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!editMode && selectedDate < today) {
      toast.error("Campaign date cannot be in the past");
      return false;
    }

    const maxFutureDate = new Date(today);
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);

    if (selectedDate > maxFutureDate) {
      toast.error("Campaign date cannot be more than 2 years in the future");
      return false;
    }

    const existingCampaign = campaigns.find((c) => {
      if (editMode && c._id === editingCampaignId) {
        return false;
      }
      const campaignDate = new Date(c.date);
      campaignDate.setHours(0, 0, 0, 0);
      return campaignDate.getTime() === selectedDate.getTime();
    });

    if (existingCampaign) {
      toast.error("A campaign already exists for this date");
      return false;
    }

    if (!trimmedPrizeId) {
      toast.error("Please select a prize");
      return false;
    }

    const selectedPrize = prizes.find((p) => p._id === trimmedPrizeId);

    if (!selectedPrize) {
      toast.error("Selected prize not found");
      return false;
    }

    if (!selectedPrize.isActive) {
      toast.error("Selected prize is inactive");
      return false;
    }

    // if (!trimmedItems) {
    //   toast.error("Supportive items are required");
    //   return false;
    // }

    // const itemsArray = trimmedItems
    //   .split(",")
    //   .map((item) => item.trim())
    //   .filter(Boolean);

    // if (itemsArray.length === 0) {
    //   toast.error("Supportive items cannot be empty");
    //   return false;
    // }

    // if (itemsArray.length < 2) {
    //   toast.error("At least 2 supportive items are required");
    //   return false;
    // }

    // if (itemsArray.length > 50) {
    //   toast.error("Maximum 50 supportive items allowed");
    //   return false;
    // }

    // for (let i = 0; i < itemsArray.length; i++) {
    //   if (itemsArray[i].length === 0) {
    //     toast.error("Supportive items cannot be empty");
    //     return false;
    //   }

    //   if (itemsArray[i].length > 100) {
    //     toast.error("Each supportive item must not exceed 100 characters");
    //     return false;
    //   }
    // }

    // const uniqueItems = new Set(itemsArray.map((item) => item.toLowerCase()));
    // if (uniqueItems.size !== itemsArray.length) {
    //   toast.error("Duplicate supportive items are not allowed");
    //   return false;
    // }

    return true;
  }, [form, campaigns, prizes, editMode, editingCampaignId]);

  const submit = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    const itemsArray = form.supportiveItems
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (editMode) {
      // Use updateCampaign for editing
      dispatch(
        updateCampaign({
          id: editingCampaignId,
          payload: {
            date: form.date,
            prizeId: form.prizeId,
            supportiveItems: itemsArray,
          },
        })
      );
      // eslint-disable-next-line react-hooks/immutability
      resetForm();
    } else {
      dispatch(
        createCampaign({
          date: form.date,
          prizeId: form.prizeId,
          supportiveItems: itemsArray,
        })
      );
      resetForm();
    }
  }, [form, validateForm, dispatch, editMode, editingCampaignId]);

  const resetForm = useCallback(() => {
    setForm({
      date: "",
      prizeId: "",
      supportiveItems: "",
    });
    setEditMode(false);
    setEditingCampaignId(null);
  }, []);

  const handleEdit = useCallback((campaign) => {
    const prizeId =
      typeof campaign.prizeId === "object"
        ? campaign.prizeId._id
        : campaign.prizeId;

    setForm({
      date: new Date(campaign.date).toISOString().split("T")[0],
      prizeId: prizeId,
      supportiveItems: campaign.supportiveItems
        ? campaign.supportiveItems.join(", ")
        : "",
    });
    setEditMode(true);
    setEditingCampaignId(campaign._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case "ACTIVE":
        return <PlayCircle className="h-3.5 w-3.5" />;
      case "COMPLETED":
        return <Award className="h-3.5 w-3.5" />;
      default:
        return <XCircle className="h-3.5 w-3.5" />;
    }
  }, []);

  const getStatusStyles = useCallback((status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  }, []);

  const getActionsList = useCallback(
    (campaignId, status) => {
      const actions = [];

      // Cannot edit or delete completed campaigns
      if (status !== "COMPLETED") {
        actions.push({
          label: "Edit",
          onClick: () => {
            const campaign = campaigns.find((c) => c._id === campaignId);
            if (campaign) handleEdit(campaign);
          },
        });
      }

      if (status === "ACTIVE") {
        actions.push({
          label: "Disable",
          onClick: () => dispatch(disableCampaign(campaignId)),
        });
      }

      if (status === "DISABLED") {
        actions.push({
          label: "Activate",
          onClick: () => dispatch(activateCampaign(campaignId)),
        });
      }

      if (status !== "COMPLETED") {
        actions.push({
          label: "Delete",
          destructive: true,
          onClick: () => {
            const campaign = campaigns.find((c) => c._id === campaignId);
            if (
              window.confirm(
                `Are you sure you want to delete the campaign for ${new Date(
                  campaign.date
                ).toDateString()}? This action cannot be undone.`
              )
            ) {
              dispatch(deleteCampaign(campaignId));
            }
          },
        });
      }

      return actions;
    },
    [campaigns, dispatch, handleEdit]
  );

  // Filter and search logic
  const filteredCampaigns = useMemo(() => {
    let filtered = [...campaigns];

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((campaign) => {
        const status = getCampaignStatus(campaign);
        return status === statusFilter;
      });
    }

    // Apply search by prize name
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((campaign) => {
        const prize = prizes.find(
          (p) => p._id === (campaign.prizeId?._id || campaign.prizeId)
        );
        return prize?.title?.toLowerCase().includes(query);
      });
    }

    return filtered;
  }, [campaigns, statusFilter, searchQuery, prizes]);

  const activeCampaignsCount = useMemo(
    () => campaigns.filter((c) => getCampaignStatus(c) === "ACTIVE").length,
    [campaigns]
  );

  const completedCampaignsCount = useMemo(
    () => campaigns.filter((c) => getCampaignStatus(c) === "COMPLETED").length,
    [campaigns]
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-sm text-gray-500">
              Manage your giveaway campaigns
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Plus className="h-4 w-4 text-black" />
                {editMode ? "Edit Campaign" : "Create New Campaign"}
              </CardTitle>
              {editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetForm}
                  className="gap-2"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Campaign Date
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                  min={
                    editMode
                      ? undefined
                      : new Date().toISOString().split("T")[0]
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Trophy className="h-3.5 w-3.5" />
                  Select Prize
                </label>
                <Select
                  value={form.prizeId}
                  onValueChange={(v) => setForm({ ...form, prizeId: v })}
                >
                  <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
                    <SelectValue placeholder="Choose a prize" />
                  </SelectTrigger>
                  <SelectContent>
                    {prizes.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500">
                        No prizes available
                      </div>
                    ) : (
                      prizes
                        .filter((p) => p.isActive)
                        .map((p) => (
                          <SelectItem key={p._id} value={p._id}>
                            <span className="flex items-center gap-2">
                              <Gift className="h-3.5 w-3.5 text-amber-500" />
                              {p.title}
                            </span>
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              {/* 
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <ListPlus className="h-3.5 w-3.5" />
                  Supportive Items (Min 2)
                </label>
                <Input
                  placeholder="e.g. Item1, Item2, Item3"
                  value={form.supportiveItems}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      supportiveItems: e.target.value,
                    })
                  }
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                />
              </div> */}

              <div className="flex items-end">
                <Button
                  onClick={submit}
                  disabled={loading}
                  className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md transition-all hover:shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editMode ? (
                    <>
                      <Edit2 className="h-4 w-4" />
                      Update Campaign
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Create Campaign
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                  <Megaphone className="h-4 w-4 text-black" />
                  All Campaigns
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-black text-white">
                    {campaigns.length} Total
                  </Badge>
                  {activeCampaignsCount > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {activeCampaignsCount} Active
                    </Badge>
                  )}
                  {completedCampaignsCount > 0 && (
                    <Badge className="bg-blue-100 text-blue-700">
                      {completedCampaignsCount} Completed
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by prize name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 border-gray-200 bg-white pl-9 focus:border-amber-300 focus:ring-amber-200"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9 w-[180px] border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="DISABLED">Disabled</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading && campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
                <p className="mt-3 text-sm font-medium">Loading campaigns...</p>
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Inbox className="h-8 w-8" />
                </div>
                <p className="mt-4 font-medium text-gray-600">
                  {campaigns.length === 0
                    ? "No campaigns yet"
                    : "No campaigns found"}
                </p>
                <p className="mt-1 text-sm">
                  {campaigns.length === 0
                    ? "Create your first campaign above"
                    : "Try adjusting your search or filters"}
                </p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3.5 text-left">Date</th>
                        <th className="px-5 py-3.5 text-left">Prize</th>
                        <th className="px-5 py-3.5 text-left">Status</th>
                        <th className="px-5 py-3.5 text-left">Winner</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredCampaigns.map((c) => {
                        const prize = prizes.find(
                          (p) => p._id === (c.prizeId?._id || c.prizeId)
                        );
                        const status = getCampaignStatus(c);
                        const actions = getActionsList(c._id, status);

                        return (
                          <tr
                            key={c._id}
                            className="transition-colors hover:bg-gray-50/50"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-700">
                                  {new Date(c.date).toDateString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-black" />
                                <span className="font-medium text-gray-800">
                                  {prize?.title || "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                                  status
                                )}`}
                              >
                                {getStatusIcon(status)}
                                {status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {c.winnerUserId ? (
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm font-medium text-gray-700">
                                    {typeof c.winnerUserId === "object"
                                      ? c.winnerUserId.email ||
                                        c.winnerUserId.phone ||
                                        "Winner"
                                      : "Winner Found"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">
                                  No winner yet
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <ActionDropdown actions={actions} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-gray-100 md:hidden">
                  {filteredCampaigns.map((c) => {
                    const prize = prizes.find(
                      (p) => p._id === (c.prizeId?._id || c.prizeId)
                    );
                    const status = getCampaignStatus(c);
                    const actions = getActionsList(c._id, status);

                    return (
                      <div key={c._id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-black" />
                              <span className="font-semibold text-gray-800">
                                {prize?.title || "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {new Date(c.date).toDateString()}
                            </div>
                            {c.winnerUserId && (
                              <div className="flex items-center gap-2 text-sm">
                                <Award className="h-3.5 w-3.5 text-blue-600" />
                                <span className="font-medium text-gray-700">
                                  {typeof c.winnerUserId === "object"
                                    ? c.winnerUserId.email ||
                                      c.winnerUserId.phone ||
                                      "Winner"
                                    : "Winner Found"}
                                </span>
                              </div>
                            )}
                          </div>
                          <ActionDropdown actions={actions} />
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                              status
                            )}`}
                          >
                            {getStatusIcon(status)}
                            {status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
