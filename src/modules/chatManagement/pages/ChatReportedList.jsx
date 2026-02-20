import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, MessageSquareWarning, Eye } from "lucide-react";
import { fetchReportedChats } from "../store/chat-management.slice";

export default function ChatReportedList() {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((s) => s.chatManagement || {});

  useEffect(() => {
    dispatch(fetchReportedChats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 rounded-xl">
              <MessageSquareWarning className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Reported Chats
              </h1>
              <p className="text-sm text-gray-500">
                Moderate reported chat conversations
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-700 border-red-200"
          >
            {queue?.length ?? 0} Pending
          </Badge>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Reasons
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Last Reported
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                        <span className="text-gray-500">
                          Loading reported chats...
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && (queue?.length || 0) === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No reported chats found
                    </td>
                  </tr>
                )}

                {queue?.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{c._id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                        {c.reportCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.reasons?.map((r, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {c.lastReportedAt
                            ? new Date(c.lastReportedAt).toLocaleString()
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/admin/management/chat/${c._id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading && (
              <div className="p-8 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                <p className="text-gray-500 mt-2">Loading reported chats...</p>
              </div>
            )}

            {!loading && (queue?.length || 0) === 0 && (
              <div className="p-8 text-center text-gray-500">
                No reported chats found
              </div>
            )}

            {queue?.map((c) => (
              <div key={c._id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{c._id}</p>
                    <p className="text-xs text-gray-500">
                      {c.reportCount} reports
                    </p>
                  </div>
                  <a
                    href={`/admin/management/chat/${c._id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Review
                  </a>
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.reasons?.map((r, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
