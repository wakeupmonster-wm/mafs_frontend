import React, { useEffect, useState } from "react";
import z from "zod";
import { Save, ShieldCheck } from "lucide-react"; // Icons ke liye
import { PageHeader } from "@/components/common/headSubhead";
import LogoUpload from "../components/LogoUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RenderField } from "../components/render.field";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGeneralSettingsStatus,
  fetchGeneralSettings,
  updateGeneralSettingsAction,
} from "../store/general.slice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  siteName: z.string().min(1, "App name is required"),
  timezone: z.string().min(1, "Timezone is required"),
  termsUrl: z.string().url("Invalid URL").optional(),
  privacyUrl: z.string().url("Invalid URL").optional(),
  playStore: z.string().url("Invalid URL").optional(),
  appStore: z.string().url("Invalid URL").optional(),
});

export default function GeneralPage() {
  const dispatch = useDispatch();
  const {
    list: settings,
    successMessage,
    error,
    loading,
  } = useSelector((state) => state.generalSettings);
  const [selectedFile, setSelectedFile] = useState(null); // Logo file ke liye

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      timezone: "Asia/Sydney",
      termsUrl: "",
      privacyUrl: "",
      playStore: "",
      appStore: "",
    },
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(fetchGeneralSettings());
      dispatch(clearGeneralSettingsStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(clearGeneralSettingsStatus());
    }
  }, [successMessage, error, dispatch]);

  // 2. Data aane par Form reset karein
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      form.reset({
        siteName: settings?.value?.appName || "",
        timezone: settings?.value?.timezone || "Asia/Sydney",
        termsUrl: settings?.value?.termsUrl || "",
        privacyUrl: settings?.value?.privacyUrl || "",
        playStore: settings?.value?.playStoreUrl || "",
        appStore: settings?.value?.appStoreUrl || "",
      });
    }
  }, [settings, form]);

  // Unified submit handler
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("appName", values.siteName);
    formData.append("timezone", values.timezone);
    formData.append("termsUrl", values.termsUrl || "");
    formData.append("privacyUrl", values.privacyUrl || "");
    formData.append("playStoreUrl", values.playStore || "");
    formData.append("appStoreUrl", values.appStore || "");

    // Logic for logo
    formData.append("logoUrl", settings?.value?.logo || "");
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    // Now dispatch actually works!
    dispatch(updateGeneralSettingsAction(formData));
  };

  // 1. Fetch data on Mount
  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen text-gray-300 font-sans">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 pb-20 w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
          <PageHeader
            heading="General"
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            color="bg-brand-aqua"
            subheading="Update your site's branding, social links, and legal policies."
          />

          <Button
            className="flex items-center gap-2 bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white h-9 px-4 shadow-sm"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </Button>
        </header>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <RenderField
              control={form.control}
              name="siteName"
              label="App Name"
              type="text"
              placeholder="••••••••••••••••"
            />

            {/* Logo Section */}
            <LogoUpload
              currentLogo={settings?.value?.logo}
              onFileSelect={(file) => setSelectedFile(file)}
            />

            {/* <RenderField
              control={form.control}
              name="timezone"
              label="Timezone"
              type="select"
              options={[
                { label: "Asia/Bangkok", value: "Asia/Bangkok" },
                { label: "Asia/Kolkata", value: "Asia/Kolkata" },
                { label: "Asia/Sydney", value: "Asia/Sydney" },
              ]}
            /> */}

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
