import ParticipantsDataTables from "@/components/shared/data-tables/participants.data.table";
import { Users } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { participantsCampaign } from "../store/campaign.slice";
import { isSameDay, parseISO } from "date-fns";
import { fetchWinner } from "../store/winner.slice";
import { getParticipantsColumns } from "@/components/columns/participants.columns";

export default function ParticipantsPage() {
  const dispatch = useDispatch();

  const {
    partipants,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.campaign);

  const { winner } = useSelector((s) => s.winner);

  const [date, setDate] = useState(null); // New Date State
  // States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [campId, setCampId] = useState(null);

  useEffect(() => {
    dispatch(fetchWinner());
  }, [dispatch]);

  // 2. Derive Campaign ID from Date
  useEffect(() => {
    if (winner?.length > 0) {
      if (date) {
        // Find campaign matching selected date
        const matchedCampaign = winner.find((camp) =>
          isSameDay(parseISO(camp.date), date)
        );
        setCampId(matchedCampaign ? matchedCampaign._id : "");
      } else {
        // DEFAULT LOGIC: Sort by date descending and pick the latest one
        const completedCampaigns = winner
          .filter((camp) => camp.drawStatus === "COMPLETED")
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (completedCampaigns.length > 0) {
          const latestCompleted = completedCampaigns[0];
          setCampId(latestCompleted._id);

          setDate(parseISO(latestCompleted.date));
        } else {
          setCampId(""); // Fallback if no completed campaigns exist
        }
      }
    }
  }, [date, winner]);

  // 3. Fetch Participants (Debounced)
  useEffect(() => {
    // OPTIONAL: Prevent calling API if a date is selected but no campaign ID is found
    if (date && !campId) return;

    const delayDebounceFn = setTimeout(() => {
      dispatch(
        participantsCampaign({
          campaignId: campId,
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
        })
      );
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    campId,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    date,
  ]);

  const columns = useMemo(() => getParticipantsColumns(), []);

  {
    date && !campId && !loading && (
      <p className="text-sm text-red-500 font-medium animate-pulse">
        No campaign found for the selected date.
      </p>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Users className="h-6 w-6 text-white animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Campaign Participants</h1>
            <p className="text-sm text-gray-500">
              Track all campaign participants
            </p>
          </div>
        </div>
      </div>

      {/* 2. New Info Section (Place it here) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {date ? "Filtered Results:" : "Latest Completed Campaign:"}
          </span>
          {campId && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shadow-sm">
                {winner?.find((c) => c._id === campId)?.prize?.title ||
                  "Loading..."}
              </span>
              {/* Optional: Add a small date badge too */}
              {date && (
                <span className="text-[10px] text-slate-400 font-medium">
                  (
                  {new Date(
                    winner?.find((c) => c._id === campId)?.date
                  ).toLocaleDateString()}
                  )
                </span>
              )}
            </div>
          )}
        </div>

        {/* No Campaign Alert */}
        {date && !campId && !loading && (
          <div className="bg-red-50 border border-red-100 p-2 rounded-lg">
            <p className="text-xs text-red-500 font-medium italic">
              No campaign matches the selected date. Showing empty results.
            </p>
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <ParticipantsDataTables
          columns={columns}
          data={partipants || []}
          rowCount={reduxPagination?.total ?? 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by prize title, phone, email..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              setStatusFilter(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            date, // Pass date
            setDate: (val) => {
              // Pass setter
              setDate(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
      </div>
    </div>
  );
}
