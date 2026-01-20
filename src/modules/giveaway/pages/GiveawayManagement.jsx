// import { useState } from "react";
// import Prizes from "./Prizes";
// import Campaigns from "./Campaigns";
// import { cn } from "@/lib/utils";

// export default function GiveawayManagement() {
//   const [tab, setTab] = useState("prizes");

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold">
//           🎁 Giveaway Management
//         </h1>
//         <p className="text-muted-foreground text-sm">
//           Manage prizes, campaigns and giveaways from one place
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 border-b">
//         {["prizes", "campaigns"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={cn(
//               "px-4 py-2 text-sm font-medium border-b-2 transition",
//               tab === t
//                 ? "border-primary text-primary"
//                 : "border-transparent text-muted-foreground hover:text-primary"
//             )}
//           >
//             {t === "prizes" ? "Prizes" : "Campaigns"}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div>
//         {tab === "prizes" && <Prizes />}
//         {tab === "campaigns" && <Campaigns />}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { cn } from "@/lib/utils";

/* Existing pages */
import Prizes from "./Prizes";
import Campaigns from "./Campaigns";

/* New pages (jo humne banayi hain) */
import BulkCampaigns from "./BulkCampaigns";
import PendingDeliveries from "./PendingDeliveries";
import CampaignWinner from "./CampaignWinner";

const TABS = [
  { key: "prizes", label: "Prizes" },
  { key: "campaigns", label: "Campaigns" },
  { key: "bulk", label: "Bulk Campaigns" },
  { key: "deliveries", label: "Pending Deliveries" },
  { key: "winner", label: "Winner" },
];

export default function GiveawayManagement() {
  const [tab, setTab] = useState("prizes");

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          🎁 Giveaway Management
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Manage prizes, campaigns, winners and deliveries from one centralized
          admin panel.
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 border-b min-w-max">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-all",
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="pt-2">
        {tab === "prizes" && <Prizes />}

        {tab === "campaigns" && <Campaigns />}

        {tab === "bulk" && <BulkCampaigns />}

        {tab === "deliveries" && <PendingDeliveries />}

        {tab === "winner" && <CampaignWinner />}
      </div>
    </div>
  );
}
