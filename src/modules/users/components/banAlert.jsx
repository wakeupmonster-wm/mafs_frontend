import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconAlertTriangle } from "@tabler/icons-react";
import React from "react";

const BanAlert = ({ account }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-red-200 bg-red-50/50 p-4 shadow-sm">
      {/* Decorative Background Icon */}
      <IconAlertTriangle
        className="absolute -right-4 -top-4 h-24 w-24 text-red-100/50 rotate-12"
        strokeWidth={1}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Icon & Title Group */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <IconAlertTriangle className="h-6 w-6" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-red-900">Restricted Account</h3>
            <Badge
              variant="destructive"
              className="h-5 px-1.5 text-[10px] uppercase tracking-wider"
            >
              Banned
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-6 text-sm text-red-800/80">
            <p className="flex items-center gap-1.5">
              <span className="font-semibold text-red-900">Reason:</span>
              {account.banDetails?.reason || "Policy Violation"}
            </p>
            <p className="flex items-center gap-1.5">
              <span className="font-semibold text-red-900">Date:</span>
              {new Date(account.banDetails?.bannedAt).toLocaleDateString()}
            </p>
            {account.banDetails?.bannedBy && (
              <p className="flex items-center gap-1.5">
                <span className="font-semibold text-red-900">Admin ID:</span>
                <span className="font-mono text-xs underline decoration-red-200 uppercase">
                  {account.banDetails.bannedBy.slice(-6)}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="shrink-0 pt-2 sm:pt-0">
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 bg-white text-red-700 hover:bg-red-100 hover:text-red-800 shadow-sm"
            onClick={() => {
              /* Trigger Unban Modal */
            }}
          >
            Review & Unban
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BanAlert;
