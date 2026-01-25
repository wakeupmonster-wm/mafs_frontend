import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Loader2, Trash2, ShieldAlert, UserX, Snowflake,
} from "lucide-react";
import {
  fetchChatMessagesForReview,
  fetchChatActionHistory,
  performChatAction,
  toggleSelectMessage,
  clearSelection,
  clearChatMgmtStatus,
  selectAllMessages,
} from "../store/chat-management.slice";

export default function ChatReviewDetail({ matchId }) {
  const dispatch = useDispatch();
  const { selected, history, selectedMessageIds, loading, error, successMessage } = useSelector(
    (s) => s.chatManagement || {}
  );

  const [action, setAction] = useState("delete_message");
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState("");

  const participants = selected?.participants || [];
  const messages = selected?.messages || [];

  useEffect(() => {
    if (matchId) {
      dispatch(fetchChatMessagesForReview({ matchId }));
      dispatch(fetchChatActionHistory(matchId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, matchId]);

  useEffect(() => {
    if (successMessage) {
      // refresh data after action
      dispatch(fetchChatMessagesForReview({ matchId }));
      dispatch(fetchChatActionHistory(matchId));
      dispatch(clearSelection());
      setTimeout(() => dispatch(clearChatMgmtStatus()), 2000);
    }
  }, [successMessage, dispatch, matchId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      matchId,
      action,
      reason,
    };
    if (action === "delete_message") {
      payload.messageIds = selectedMessageIds;
    }
    if (action === "warn_user" || action === "block_user") {
      payload.userId = userId;
    }
    dispatch(performChatAction(payload));
  };

  const messageSelected = useMemo(() => {
    const set = new Set(selectedMessageIds);
    return (id) => set.has(id);
  }, [selectedMessageIds]);

  if (loading && !selected) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500">Loading chat...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center border-0 shadow-sm">
            <p className="text-gray-500">Chat not found</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="bg-transparent">
            <a href="/admin/management/chat">
              <ArrowLeft className="w-4 h-4" />
            </a>
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Chat Review</h1>
            <p className="text-sm text-gray-500">Match: {selected.matchId || matchId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-600">Messages ({messages.length})</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => dispatch(selectAllMessages())}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => dispatch(clearSelection())}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto bg-white">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-start gap-3 p-2 border border-gray-100 rounded-lg">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={messageSelected(m.id)}
                      onChange={() => dispatch(toggleSelectMessage(m.id))}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{m.sender}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                        {m.flagged && (
                          <Badge variant="destructive">Flagged</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-800 whitespace-pre-wrap mt-1">{m.text || (m.media?.length ? "[media]" : "")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">Action History</div>
              <div className="p-4 space-y-2">
                {(history || []).length === 0 && (
                  <p className="text-sm text-gray-500">No actions yet</p>
                )}
                {history?.map((h, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-lg">
                    <div className="text-sm text-gray-800">{h.resolution}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(h.resolvedAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-4">
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">Take Action</div>
                <form onSubmit={onSubmit} className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Action</label>
                    <Select value={action} onValueChange={setAction}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delete_message">
                          <div className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete Message(s)
                          </div>
                        </SelectItem>
                        <SelectItem value="warn_user">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4" /> Warn User
                          </div>
                        </SelectItem>
                        <SelectItem value="block_user">
                          <div className="flex items-center gap-2">
                            <UserX className="w-4 h-4" /> Block User
                          </div>
                        </SelectItem>
                        <SelectItem value="freeze_chat">
                          <div className="flex items-center gap-2">
                            <Snowflake className="w-4 h-4" /> Freeze Chat
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(action === "warn_user" || action === "block_user") && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">User</label>
                      <Select value={userId} onValueChange={setUserId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {participants.map((u) => (
                            <SelectItem key={u} value={u}>{u}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Reason</label>
                    <Textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter reason"
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      "Apply Action"
                    )}
                  </Button>

                  {successMessage && (
                    <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded">
                      {successMessage}
                    </div>
                  )}
                </form>
              </Card>

              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">Participants</div>
                <div className="p-4 space-y-2">
                  {participants.map((u) => (
                    <div key={u} className="text-sm text-gray-800">{u}</div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
