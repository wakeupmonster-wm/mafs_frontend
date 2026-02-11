import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  Trophy,
  Clock,
  Award,
  Calendar,
  Gift,
  User,
  Filter,
} from "lucide-react";

export default function CampaignWinner() {
  const dispatch = useDispatch();
  const { campaigns, winner, loading, error } = useSelector((s) => s.giveaway);

  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCampaigns()).catch(() =>
      setErrorMessage("Failed to load campaigns")
    );
  }, [dispatch]);

  useEffect(() => {
    if (!campaigns?.length) return;

    const completed = campaigns.filter(
      (c) => c.drawStatus === "COMPLETED" && c.winnerUserId
    );

    completed.forEach((c) => {
      dispatch(fetchWinner(c._id));
    });
  }, [campaigns, dispatch]);

  const filteredWinners = useMemo(() => {
    if (!winner) return [];

    if (filter === "COMPLETED") {
      return winner.filter((w) => w.drawStatus === "COMPLETED");
    }

    if (filter === "PENDING") {
      return campaigns
        ?.filter((c) => c.drawStatus === "PENDING")
        .map((c) => ({
          campaignId: c._id,
          date: c.date,
          prize: c.prizeId,
          winner: null,
          drawAt: null,
          drawStatus: "PENDING",
        }));
    }

    return winner;
  }, [filter, winner, campaigns]);

  const completedCount = useMemo(
    () => winner?.filter((w) => w.drawStatus === "COMPLETED").length || 0,
    [winner]
  );

  const pendingCount = useMemo(
    () => campaigns?.filter((c) => c.drawStatus === "PENDING").length || 0,
    [campaigns]
  );

  const renderStatus = (status) => {
    if (status === "COMPLETED") {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 px-2.5 py-1 transition-all duration-200 hover:scale-105">
          <Trophy className="w-3 h-3" />
          Completed
        </Badge>
      );
    }

    return (
      <Badge className="bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1.5 px-2.5 py-1 transition-all duration-200 hover:scale-105">
        <Clock className="w-3 h-3 animate-pulse" />
        Pending
      </Badge>
    );
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Card className=" overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-xl transition-shadow">
          {/* Header */}
          <div className="border-b border-gray-100  p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-md animate-in zoom-in-50 duration-500">
                  <Award className="h-5 w-5 text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Campaign Winners
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Track all giveaway results
                  </p>
                </div>
              </div>

              {/* Stats Badges */}
              <div
                className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-500"
                style={{ animationDelay: "100ms" }}
              >
                <Badge
                  variant="secondary"
                  className="bg-gray-900 text-white border border-gray-800"
                >
                  {filteredWinners.length} Total
                </Badge>
                {completedCount > 0 && (
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {completedCount} Completed
                  </Badge>
                )}
                {pendingCount > 0 && (
                  <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                    {pendingCount} Pending
                  </Badge>
                )}
              </div>
            </div>

            {/* Filters */}
            <div
              className="mt-4 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: "150ms" }}
            >
              <Filter className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {["ALL", "COMPLETED", "PENDING"].map((f, idx) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "default" : "outline"}
                    onClick={() => setFilter(f)}
                    className={`transition-all duration-200 hover:scale-105 ${
                      filter === f
                        ? "bg-gray-900 hover:bg-gray-800 shadow-md"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {f === "ALL" && <Trophy className="w-3 h-3 mr-1.5" />}
                    {f === "COMPLETED" && <Award className="w-3 h-3 mr-1.5" />}
                    {f === "PENDING" && <Clock className="w-3 h-3 mr-1.5" />}
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-0">
            {(error || errorMessage) && (
              <div className="m-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                <span className="font-medium">{error || errorMessage}</span>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in-50 duration-700">
                <div className="relative">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-900" />
                  <div className="absolute inset-0 w-10 h-10 border-2 border-gray-200 rounded-full animate-ping" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
                  Loading campaign winners...
                </p>
              </div>
            ) : filteredWinners.length ? (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3.5 text-left">Campaign Date</th>
                        <th className="px-5 py-3.5 text-left">Prize</th>
                        <th className="px-5 py-3.5 text-left">Winner</th>
                        <th className="px-5 py-3.5 text-left">Draw Date</th>
                        <th className="px-5 py-3.5 text-left">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {filteredWinners.map((w, index) => (
                        <tr
                          key={w.campaignId}
                          className="transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm animate-in fade-in slide-in-from-bottom-1"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 group">
                              <Calendar className="h-4 w-4 text-gray-400 transition-all duration-200 group-hover:text-gray-600 group-hover:scale-110" />
                              <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                                {w.date ? new Date(w.date).toDateString() : "—"}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 group">
                              <Gift className="h-4 w-4 text-gray-900 transition-all duration-200 group-hover:scale-110" />
                              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                                {w.prize?.title || "—"}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            {w.winner ? (
                              <div className="flex items-center gap-2 group">
                                <User className="h-4 w-4 text-blue-600 transition-all duration-200 group-hover:scale-110" />
                                <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                                  {w.winner.phone || w.winner.email}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400 italic">
                                No winner yet
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm text-gray-600">
                              {w.drawAt
                                ? new Date(w.drawAt).toLocaleString()
                                : "—"}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            {renderStatus(w.drawStatus)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-gray-100 md:hidden">
                  {filteredWinners.map((w, index) => (
                    <div
                      key={w.campaignId}
                      className="p-4 transition-all duration-200 hover:bg-gray-50/80 animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="space-y-3">
                        {/* Prize */}
                        <div className="flex items-center gap-2 group">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-all duration-200 group-hover:bg-gray-200 group-hover:scale-110">
                            <Gift className="h-4 w-4 text-gray-900" />
                          </div>
                          <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                            {w.prize?.title || "—"}
                          </span>
                        </div>

                        {/* Campaign Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>
                            Campaign:{" "}
                            {w.date ? new Date(w.date).toDateString() : "—"}
                          </span>
                        </div>

                        {/* Winner */}
                        {w.winner && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-3.5 w-3.5 text-blue-600" />
                            <span className="font-medium text-gray-700">
                              {w.winner.phone || w.winner.email}
                            </span>
                          </div>
                        )}

                        {/* Draw Date */}
                        {w.drawAt && (
                          <div className="text-xs text-gray-500">
                            Draw Date: {new Date(w.drawAt).toLocaleString()}
                          </div>
                        )}

                        {/* Status */}
                        <div className="flex items-center gap-2 pt-2">
                          {renderStatus(w.drawStatus)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400 animate-in fade-in zoom-in-50 duration-700">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 animate-bounce">
                  <Trophy className="h-8 w-8" />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-600">
                  No data for selected filter
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Try selecting a different filter option
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
