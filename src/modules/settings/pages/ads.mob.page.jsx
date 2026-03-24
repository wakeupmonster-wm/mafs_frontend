import React, { useState } from "react";
import { Megaphone, Save, ChevronDown, Smartphone, Apple } from "lucide-react";
import { PageHeader } from "@/components/common/headSubhead";
import { AdSection } from "../components/AdSection";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";

export default function ADSMobPage() {
  const [adsConfig, setAdsConfig] = useState({
    android: {
      appOpen: "ca-app-pub-3940...",
      appOpenStatus: "On",
      interstitial: "ca-app-pub-3940...",
      interstitialClick: "5",
      interstitialStatus: "On",
      native: "ca-app-pub-3940...",
      nativeEveryN: "25",
      nativeStatus: "On",
    },
    ios: {
      appOpen: "ca-app-pub-3940...",
      appOpenStatus: "On",
      interstitial: "ca-app-pub-3940...",
      interstitialClick: "5",
      interstitialStatus: "On",
      native: "ca-app-pub-3940...",
      nativeEveryN: "25",
      nativeStatus: "On",
    },
  });

  const form = useForm({
    defaultValues: {
      android: {
        appOpen: "ca-app-pub-3940...",
        appOpenStatus: "On",
        interstitial: "ca-app-pub-3940...",
        interstitialClick: "5",
        interstitialStatus: "On",
        native: "ca-app-pub-3940...",
        nativeEveryN: "25",
        nativeStatus: "On",
      },
      ios: {
        appOpen: "ca-app-pub-3940...",
        appOpenStatus: "On",
        interstitial: "ca-app-pub-3940...",
        interstitialClick: "5",
        interstitialStatus: "On",
        native: "ca-app-pub-3940...",
        nativeEveryN: "25",
        nativeStatus: "On",
      },
    },
  });

  const handleSave = () => {
    console.log("Saving Ads Config:", adsConfig);
    // Yahan aapki Axios API call aayegi
  };

  return (
    <main className="flex-1 p-6 pb-20 w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
        <PageHeader
          heading="Ads"
          icon={<Megaphone className="w-9 h-9 text-white animate-pulse" />}
          color="bg-brand-aqua shadow-brand-aqua/30"
          subheading="Configure advertisement settings for Android and iOS applications."
        />

        <button
          className="flex items-center gap-2 bg-brand-aqua/50 hover:bg-brand-aqua/60 text-black text-sm px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-slate-400/50"
          onClick={handleSave}
        >
          <Save size={16} /> Save
        </button>
      </header>

      <Form {...form}>
        <form className="space-y-9">
          {/* Android Section */}
          <AdSection
            title="Android Ads Settings"
            platform="Android"
            icon={<AiFillAndroid size={24} className="text-green-500" />}
            control={form.control}
          />

          {/* iOS Section */}
          <AdSection
            title="IOS Ads Settings"
            platform="IOS"
            icon={<AiFillApple size={24} className="text-gray-800" />}
            config={adsConfig.ios}
          />
        </form>
      </Form>
    </main>
  );
}
