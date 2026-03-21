import React from "react";
import z from "zod";
import { PageHeader } from "@/components/common/headSubhead";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HardDrive, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { RenderField } from "../components/render.field";

const formSchema = z.object({
  as3Status: z.string().min(1, "AS3 Status is required"),
  as3Key: z.string().min(1, "AS3 Key is required"),
  as3Secret: z.string().min(1, "AS3 Secret is required"),
  as3Region: z.string().min(1, "AS3 Region is required"),
  as3Bucket: z.string().min(1, "AS3 Bucket is required"),
  as3Endpoint: z.string().min(1, "AS3 Endpoint is required"),
  as3CustomDomain: z.string().min(1, "AS3 Custom Domain is required"),
  as3RootPath: z.string().min(1, "AS3 Root Path is required"),
});

export default function StoragePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      as3Status: "On",
      as3Key: "AKIA****************",
      as3Secret: "********************************",
      as3Region: "Auto",
      as3Bucket: "hidden-for-demo",
      as3Endpoint: "hidden-for-demo",
      as3CustomDomain: "",
      as3RootPath: "hidden-for-demo",
    },
  });

  const handleSave = () => {
    console.log("Saving Storage Config:", form.getValues());
    // Yahan aapki Axios API call aayegi
  };

  return (
    <main className="flex-1 p-6 pb-20 w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
        <PageHeader
          heading="Storage"
          icon={<HardDrive className="w-9 h-9 text-white animate-pulse" />}
          color="bg-brand-aqua shadow-brand-aqua/30"
          subheading="Configure storage settings for your application."
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
          {/* S3 Status Toggle */}
          <RenderField
            control={form.control}
            name="as3Status"
            label="AS3 Status"
            type="select"
            options={[
              { label: "On", value: "On" },
              { label: "Off", value: "Off" },
            ]}
          />

          {/* AS3 Key & Secret */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RenderField
              control={form.control}
              name="as3Secret"
              label="AS3 Secret"
              type="password"
              placeholder="••••••••••••••••"
            />

            {/* Region Dropdown */}
            <RenderField
              control={form.control}
              name="as3Region"
              label="AS3 Region"
              type="select"
              options={[
                { label: "Auto", value: "Auto" },
                { label: "US East (N. Virginia)", value: "us-east-1" },
                { label: "Asia Pacific (Mumbai)", value: "ap-south-1" },
              ]}
            />
          </div>

          {/* Bucket & Endpoint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RenderField
              control={form.control}
              name="as3Bucket"
              label="AS3 Bucket"
              type="text"
              placeholder="e.g. my-app-bucket"
            />

            <RenderField
              control={form.control}
              name="as3Endpoint"
              label="AS3 Endpoint"
              type="text"
              placeholder="e.g. s3.amazonaws.com"
            />
          </div>

          {/* Optional Custom Domain */}
          <RenderField
            control={form.control}
            name="as3CustomDomain"
            label="AS3 Custom Domain (Optional)"
            type="text"
            placeholder="e.g. https://cdn.mydomain.com"
          />

          {/* Root Path */}
          <RenderField
            control={form.control}
            name="as3RootPath"
            label="AS3 Root Path (Optional)"
            type="text"
            placeholder="e.g. uploads/"
          />
        </form>
      </Form>
    </main>
  );
}
