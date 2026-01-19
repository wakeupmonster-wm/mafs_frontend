import { useState } from "react";
import Prizes from "./Prizes";
import Campaigns from "./Campaigns";
import { cn } from "@/lib/utils";

export default function GiveawayManagement() {
  const [tab, setTab] = useState("prizes");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          🎁 Giveaway Management
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage prizes, campaigns and giveaways from one place
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {["prizes", "campaigns"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition",
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-primary"
            )}
          >
            {t === "prizes" ? "Prizes" : "Campaigns"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {tab === "prizes" && <Prizes />}
        {tab === "campaigns" && <Campaigns />}
      </div>
    </div>
  );
}