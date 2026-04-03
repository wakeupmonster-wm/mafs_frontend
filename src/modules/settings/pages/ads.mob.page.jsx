import React, { useState } from "react";
import {
  Megaphone,
  Save,
  ChevronDown,
  Smartphone,
  Apple,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/common/headSubhead";
import { AdSection } from "../components/AdSection";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

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
    <Container>
      <main className="flex-1 pb-20 w-full">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
          <PageHeader
            heading="Ads"
            icon={<Megaphone className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/30"
            subheading="Configure advertisement settings for Android and iOS applications."
          />

          <Button
            className="flex items-center gap-2 bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white h-9 px-4 shadow-sm"
            onClick={handleSave}
          >
            {/* {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : ( */}
            <Save size={16} />
            {/* )} */}
            Save Changes
          </Button>
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
    </Container>
  );
}
