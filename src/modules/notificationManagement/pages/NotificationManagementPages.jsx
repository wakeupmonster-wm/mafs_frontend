import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Bell } from "lucide-react";

import {
  broadcastNotification,
  sendNotificationToPremiumUsers,
  createPremiumExpiryCampaign,
  notificationHistory,
  clearNotificationStatus,
} from "../store/notification-management.slice";

export default function NotificationManagementPages() {
  const dispatch = useDispatch();
  const { loading, error, successMessage, history } = useSelector(
    (s) => s.notificationManagement
  );

  const [activeTab, setActiveTab] = useState("broadcast");
 const [emailCampaign, setEmailCampaign] = useState({
  campaignName: "",
  subject: "",
  body: "",
  target: "all",
});

const submitEmailCampaign = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("access_Token");

    const res = await fetch(
      "http://localhost:3001/api/v1/admin/notification-management/broadcastemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaignName: emailCampaign.campaignName,
          subject: emailCampaign.subject,
          body: emailCampaign.body,
          target: emailCampaign.target, // all | free | premium
        }),
      }
    );

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to send email");
    }

    alert("Email campaign queued successfully ✅");

    setEmailCampaign({
      campaignName: "",
      subject: "",
      body: "",
      target: "all",
    });
  } catch (err) {
    alert(err.message || "Something went wrong");
  }
};

  useEffect(() => {
    if (activeTab === "history") {
      dispatch(notificationHistory());
    }
  }, [activeTab]);

  // STATES
  const [broadcast, setBroadcast] = useState({
    campaignName: "",
    title: "",
    message: "",
    target: "all_users",
    cta: "",
  });

  const [premium, setPremium] = useState({
    campaignName: "",
    title: "",
    message: "",
    cta: "",
    sendNow: true,
    scheduleAt: "",
  });

  const [expiry, setExpiry] = useState({
    campaignName: "",
    title: "",
    message: "",
    cta: "",
    daysBeforeExpiry: "",
    auto: true,
  });

  // SUBMITS
  const submitBroadcast = (e) => {
    e.preventDefault();
    dispatch(broadcastNotification(broadcast)).then(() =>
      setTimeout(() => dispatch(clearNotificationStatus()), 2500)
    );
  };

  const submitPremium = (e) => {
    e.preventDefault();
    dispatch(sendNotificationToPremiumUsers(premium)).then(() =>
      setTimeout(() => dispatch(clearNotificationStatus()), 2500)
    );
  };

  const submitExpiry = (e) => {
    e.preventDefault();
    dispatch(
      createPremiumExpiryCampaign({
        ...expiry,
        daysBeforeExpiry: Number(expiry.daysBeforeExpiry),
      })
    ).then(() =>
      setTimeout(() => dispatch(clearNotificationStatus()), 2500)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-gray-900 rounded-xl">
              <Bell className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Notification Management</h1>
              {/* <p className="text-sm text-gray-500">Admin panel</p> */}
            </div>
          </div>
          {/* <Badge>Admin</Badge> */}
        </div>

        {/* TABS */}
        <div className="flex gap-2 flex-wrap">
          {["broadcast", "premium", "expiry", "history","email"].map((t) => (
            <Button
              key={t}
              size="sm"
              variant={activeTab === t ? "default" : "outline"}
              onClick={() => setActiveTab(t)}
            >
              {t.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* BROADCAST */}
        {activeTab === "broadcast" && (
          <Card>
            <form onSubmit={submitBroadcast} className="p-6 grid gap-4">
              <Input placeholder="Campaign Name" value={broadcast.campaignName}
                onChange={(e)=>setBroadcast({...broadcast,campaignName:e.target.value})}/>
              <Input placeholder="Title" value={broadcast.title}
                onChange={(e)=>setBroadcast({...broadcast,title:e.target.value})}/>
              <Textarea rows={4} placeholder="Message" value={broadcast.message}
                onChange={(e)=>setBroadcast({...broadcast,message:e.target.value})}/>
              <Select value={broadcast.target}
                onValueChange={(v)=>setBroadcast({...broadcast,target:v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_users">All Users</SelectItem>
                  <SelectItem value="free_users">Free Users</SelectItem>
                  <SelectItem value="premium_users">Premium Users</SelectItem>
                </SelectContent>
              </Select>
              <Button disabled={loading}>
                {loading ? "Sending..." : "Send Broadcast"}
              </Button>
            </form>
          </Card>
        )}
{activeTab === "email" && (
  <Card>
    <form onSubmit={submitEmailCampaign} className="p-6 grid gap-4">

      {/* Campaign Name */}
      <Input
        placeholder="Campaign Name (e.g. Premium Renewal Reminder)"
        required
        value={emailCampaign.campaignName}
        onChange={(e) =>
          setEmailCampaign({
            ...emailCampaign,
            campaignName: e.target.value,
          })
        }
      />

      {/* Subject */}
      <Input
        placeholder="Email Subject"
        required
        value={emailCampaign.subject}
        onChange={(e) =>
          setEmailCampaign({
            ...emailCampaign,
            subject: e.target.value,
          })
        }
      />

      {/* Body */}
      <Textarea
        rows={8}
        placeholder="Email body (HTML or plain text)"
        required
        value={emailCampaign.body}
        onChange={(e) =>
          setEmailCampaign({
            ...emailCampaign,
            body: e.target.value,
          })
        }
      />

      {/* Target */}
      <Select
        value={emailCampaign.target}
        onValueChange={(v) =>
          setEmailCampaign({
            ...emailCampaign,
            target: v,
          })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="free">Free Users</SelectItem>
          <SelectItem value="premium">Premium Users</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? "Queuing..." : "Send Email Campaign"}
      </Button>
    </form>
  </Card>
)}


        {/* PREMIUM USERS */}
        {activeTab === "premium" && (
          <Card>
            <form onSubmit={submitPremium} className="p-6 grid gap-4">
              <Input placeholder="Campaign Name" value={premium.campaignName}
                onChange={(e)=>setPremium({...premium,campaignName:e.target.value})}/>
              <Input placeholder="Title" value={premium.title}
                onChange={(e)=>setPremium({...premium,title:e.target.value})}/>
              <Textarea rows={4} placeholder="Message" value={premium.message}
                onChange={(e)=>setPremium({...premium,message:e.target.value})}/>
              <Input placeholder="CTA" value={premium.cta}
                onChange={(e)=>setPremium({...premium,cta:e.target.value})}/>
              <Button disabled={loading}>
                {loading ? "Processing..." : "Send to Premium Users"}
              </Button>
            </form>
          </Card>
        )}

        {/* PREMIUM EXPIRY */}
        {activeTab === "expiry" && (
          <Card>
            <form onSubmit={submitExpiry} className="p-6 grid gap-4">
              <Input placeholder="Campaign Name" value={expiry.campaignName}
                onChange={(e)=>setExpiry({...expiry,campaignName:e.target.value})}/>
              <Input placeholder="Title" value={expiry.title}
                onChange={(e)=>setExpiry({...expiry,title:e.target.value})}/>
              <Textarea rows={4} placeholder="Message" value={expiry.message}
                onChange={(e)=>setExpiry({...expiry,message:e.target.value})}/>
              <Input type="number" placeholder="Days before expiry"
                value={expiry.daysBeforeExpiry}
                onChange={(e)=>setExpiry({...expiry,daysBeforeExpiry:e.target.value})}/>
              <Button disabled={loading}>
                {loading ? "Creating..." : "Create Expiry Campaign"}
              </Button>
            </form>
          </Card>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (
          <Card>
            <div className="p-6 space-y-4">
              {loading && <Loader2 className="animate-spin mx-auto" />}
              {!loading && history.length === 0 && (
                <p className="text-center text-gray-500 text-sm">
                  No notification history
                </p>
              )}
              {history.map((n) => (
                <div key={n._id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{n.title}</h4>
                      <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                    <Badge>{n.target}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex gap-4">
                    <span>{n.campaignName}</span>
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {(error || successMessage) && (
          <div className="text-sm">
            {error && <p className="text-red-600">{error}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
