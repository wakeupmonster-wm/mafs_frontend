// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { bulkCreateCampaign, fetchPrizes } from "../store/giveaway.slice";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";

// export default function BulkCampaigns() {
//   const dispatch = useDispatch();
//   const { prizes, loading } = useSelector((s) => s.giveaway);

//   const [form, setForm] = useState({
//     startDate: "",
//     endDate: "",
//     prizeId: "",
//     supportiveItems: "",
//   });

//   useEffect(() => {
//     dispatch(fetchPrizes());
//   }, [dispatch]);

//   const submit = () => {
//     if (!form.startDate || !form.endDate || !form.prizeId) {
//       alert("Start date, End date & Prize are required");
//       return;
//     }

//     dispatch(
//       bulkCreateCampaign({
//         ranges: [
//           {
//             startDate: form.startDate,
//             endDate: form.endDate,
//             prizeId: form.prizeId,
//             supportiveItems: form.supportiveItems
//               .split(",")
//               .map((i) => i.trim())
//               .filter(Boolean),
//           },
//         ],
//         isActive: true,
//       })
//     );

//     setForm({
//       startDate: "",
//       endDate: "",
//       prizeId: "",
//       supportiveItems: "",
//     });
//   };

//   return (
//     <Card className="p-6 space-y-4 max-w-3xl">
//       <div>
//         <h2 className="text-lg font-semibold">Bulk Create Campaigns</h2>
//         <p className="text-sm text-muted-foreground">
//           Create campaigns for a date range using one prize
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Input
//           type="date"
//           value={form.startDate}
//           onChange={(e) =>
//             setForm({ ...form, startDate: e.target.value })
//           }
//         />

//         <Input
//           type="date"
//           value={form.endDate}
//           onChange={(e) =>
//             setForm({ ...form, endDate: e.target.value })
//           }
//         />

//         <Select
//           value={form.prizeId}
//           onValueChange={(v) =>
//             setForm({ ...form, prizeId: v })
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Prize" />
//           </SelectTrigger>

//           <SelectContent>
//             {prizes.map((p) => (
//               <SelectItem key={p._id} value={p._id}>
//                 {p.title}{" "}
//                 {!p.isActive && (
//                   <Badge
//                     variant="destructive"
//                     className="ml-2"
//                   >
//                     Inactive
//                   </Badge>
//                 )}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Input
//           placeholder="Supportive items (comma separated)"
//           value={form.supportiveItems}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               supportiveItems: e.target.value,
//             })
//           }
//         />
//       </div>

//       <Button onClick={submit} disabled={loading}>
//         {loading ? "Processing..." : "Create Campaigns"}
//       </Button>
//     </Card>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkCreateCampaign, fetchPrizes, clearGiveawayStatus } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Loader2, Calendar } from "lucide-react";

export default function BulkCampaigns() {
  const dispatch = useDispatch();
  const { prizes, loading, bulkCampaignLoading, error, successMessage } = useSelector(
    (s) => s.giveaway
  );

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    prizeId: "",
    supportiveItems: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [ setAutoHideMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      setAutoHideMessage(true);
      const timer = setTimeout(() => {
        dispatch(clearGiveawayStatus());
        setAutoHideMessage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!form.startDate.trim()) {
      errors.startDate = "Start date is required";
    }

    if (!form.endDate.trim()) {
      errors.endDate = "End date is required";
    }

    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (start > end) {
        errors.dateRange = "End date must be after start date";
      }
    }

    if (!form.prizeId.trim()) {
      errors.prizeId = "Prize selection is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const supportiveItemsArray = form.supportiveItems
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    dispatch(
      bulkCreateCampaign({
        ranges: [
          {
            startDate: form.startDate,
            endDate: form.endDate,
            prizeId: form.prizeId,
            supportiveItems: supportiveItemsArray,
          },
        ],
        isActive: true,
      })
    );

    if (!error) {
      setForm({
        startDate: "",
        endDate: "",
        prizeId: "",
        supportiveItems: "",
      });
      setValidationErrors({});
    }
  };

  const handlePrizeChange = (value) => {
    setForm({ ...form, prizeId: value });
    if (validationErrors.prizeId) {
      setValidationErrors({ ...validationErrors, prizeId: "" });
    }
  };

  const handleStartDateChange = (value) => {
    setForm({ ...form, startDate: value });
    if (validationErrors.startDate || validationErrors.dateRange) {
      setValidationErrors({
        ...validationErrors,
        startDate: "",
        dateRange: "",
      });
    }
  };

  const handleEndDateChange = (value) => {
    setForm({ ...form, endDate: value });
    if (validationErrors.endDate || validationErrors.dateRange) {
      setValidationErrors({
        ...validationErrors,
        endDate: "",
        dateRange: "",
      });
    }
  };

  const activePrizes = prizes.filter((p) => p.isActive);
  const inactivePrizes = prizes.filter((p) => !p.isActive);

  return (
    <Card className="p-6 space-y-4 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Bulk Create Campaigns
        </h2>
        <p className="text-sm text-muted-foreground">
          Create campaigns for a date range using one prize
        </p>
      </div>

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {validationErrors.dateRange && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2 text-orange-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{validationErrors.dateRange}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            disabled={loading || bulkCampaignLoading}
            className={validationErrors.startDate ? "border-red-500" : ""}
          />
          {validationErrors.startDate && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            disabled={loading || bulkCampaignLoading}
            className={validationErrors.endDate ? "border-red-500" : ""}
          />
          {validationErrors.endDate && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Prize <span className="text-red-500">*</span>
          </label>
          {loading ? (
            <div className="flex items-center justify-center h-10 bg-gray-100 rounded-md">
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            </div>
          ) : (
            <Select
              value={form.prizeId}
              onValueChange={handlePrizeChange}
              disabled={bulkCampaignLoading}
            >
              <SelectTrigger className={validationErrors.prizeId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select Prize" />
              </SelectTrigger>

              <SelectContent>
                {activePrizes.length > 0 && (
                  <>
                    {activePrizes.map((p) => (
                      <SelectItem key={p._id} value={p._id}>
                        <div className="flex items-center gap-2">
                          {p.title}
                          <Badge variant="success" className="ml-2">
                            Active
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </>
                )}

                {inactivePrizes.length > 0 && (
                  <>
                    {inactivePrizes.map((p) => (
                      <SelectItem key={p._id} value={p._id} disabled>
                        <div className="flex items-center gap-2">
                          {p.title}
                          <Badge variant="destructive" className="ml-2">
                            Inactive
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </>
                )}

                {prizes.length === 0 && (
                  <div className="p-2 text-center text-gray-500 text-sm">
                    No prizes available
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
          {validationErrors.prizeId && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.prizeId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supportive Items <span className="text-gray-400">(Optional)</span>
          </label>
          <Input
            placeholder="Item 1, Item 2, Item 3"
            value={form.supportiveItems}
            onChange={(e) =>
              setForm({
                ...form,
                supportiveItems: e.target.value,
              })
            }
            disabled={bulkCampaignLoading}
          />
          <p className="text-gray-500 text-xs mt-1">
            Separate items with commas
          </p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || bulkCampaignLoading}
        className="w-full"
      >
        {bulkCampaignLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Campaigns...
          </>
        ) : (
          "Create Campaigns"
        )}
      </Button>

      {prizes.length === 0 && !loading && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          No prizes found. Please create a prize first.
        </div>
      )}
    </Card>
  );
}
