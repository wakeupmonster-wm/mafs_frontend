import React from "react";
import z from "zod";
import { Save, ShieldCheck } from "lucide-react"; // Icons ke liye
import { PageHeader } from "@/components/common/headSubhead";
import LogoUpload from "../components/LogoUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RenderField } from "../components/render.field";

const formSchema = z.object({
  siteName: z.string().min(1, "App name is required"),
  tagline: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  termsUrl: z.string().url("Invalid URL").optional(),
  privacyUrl: z.string().url("Invalid URL").optional(),
  playStore: z.string().url("Invalid URL").optional(),
  appStore: z.string().url("Invalid URL").optional(),
});

export default function GeneralPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "Keen As Mustard",
      tagline: "the free streaming music player",
      timezone: "Asia/Bangkok",
      termsUrl: "https://www.keenasmustard.com.au/terms-conditions",
      privacyUrl: "https://www.keenasmustard.com.au/privacy-policy",
      playStore:
        "https://play.google.com/store/apps/details?id=com.keenasmustard.com.au",
      appStore: "https://apps.apple.com/au/app/keen-as-mustard/id6751287866",
    },
  });

  const handleSave = () => {
    console.log("Saving General Config:", form.getValues());
    // Yahan aapki Axios API call aayegi
  };

  return (
    <div className="flex min-h-screen text-gray-300 font-sans">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 pb-20 w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
          <PageHeader
            heading="General"
            icon={<ShieldCheck className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/30"
            subheading="Update your site's branding, social links, and legal policies."
          />

          <button
            className="flex items-center gap-2 bg-brand-aqua/50 hover:bg-brand-aqua/60 text-black text-sm px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-slate-400/50"
            onClick={handleSave}
          >
            <Save size={16} /> Save
          </button>
        </header>

        <Form {...form}>
          <form className="space-y-5">
            <RenderField
              control={form.control}
              name="siteName"
              label="App Name"
              type="text"
              placeholder="••••••••••••••••"
            />

            {/* Logo Section */}
            <LogoUpload />

            <RenderField
              control={form.control}
              name="timezone"
              label="Timezone"
              type="select"
              options={[
                { label: "Asia/Bangkok", value: "Asia/Bangkok" },
                { label: "Asia/Kolkata", value: "Asia/Kolkata" },
                { label: "Asia/Sydney", value: "Asia/Sydney" },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RenderField
                control={form.control}
                name="termsUrl"
                label="Terms of Use"
                type="text"
                placeholder="••••••••••••••••"
              />

              <RenderField
                control={form.control}
                name="privacyUrl"
                label="Privacy Policy"
                type="text"
                placeholder="••••••••••••••••"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RenderField
                control={form.control}
                name="playStore"
                label="Play Store URL"
                type="text"
                placeholder="••••••••••••••••"
              />

              <RenderField
                control={form.control}
                name="appStore"
                label="App Store URL"
                type="text"
                placeholder="••••••••••••••••"
              />
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
