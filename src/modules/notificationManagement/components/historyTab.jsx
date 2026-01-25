import React from "react";
import {
  Loader2,
  Mail,
  Send,
  Gem,
  AlertTriangle,
  Clock,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const CampaignIcon = ({ type }) => {
  switch (type?.toLowerCase()) {
    case "email":
      return <Mail className="w-4 h-4 text-blue-500" />;
    case "premium":
      return <Gem className="w-4 h-4 text-purple-500" />;
    case "expiry":
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    default:
      return <Send className="w-4 h-4 text-green-500" />;
  }
};

export const HistoryTab = ({ history, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Fetching audit logs...</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed rounded-xl m-6">
        <p className="text-muted-foreground">No campaign history found.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] w-full p-6">
      <div className="space-y-4">
        {history.map((log) => (
          <div
            key={log._id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl hover:border-primary/50 hover:bg-primary/[0.02] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                <CampaignIcon
                  type={log.type || (log.subject ? "email" : "push")}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm">
                    {log.campaignName || "Unnamed Campaign"}
                  </h4>
                  <Badge
                    variant="secondary"
                    className="text-[10px] uppercase font-bold tracking-wider"
                  >
                    {log.target || "All Users"}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {log.title || log.subject}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                  {log.message || log.body?.replace(/<[^>]*>?/gm, "")}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                <Clock className="w-3 h-3" />
                {new Date(log.createdAt).toLocaleDateString()} at{" "}
                {new Date(log.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-3 h-3" />
                <span>Admin: {log.createdBy?.nickname || "System"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
