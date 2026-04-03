import React, { useState } from "react";
import z from "zod";
import { Mail, Save } from "lucide-react";
import { PageHeader } from "@/components/common/headSubhead";
import { zodResolver } from "@hookform/resolvers/zod";
import { RenderField } from "../components/render.field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

// 1. Validation Schema (Example for Email/General Settings)
const formSchema = z.object({
  driver: z.string().min(1, "Required"),
  host: z.string().min(2, "Host is too short"),
  port: z.string().regex(/^\d+$/, "Must be a number"),
  encryption: z.string().optional(),
  address: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  customJs: z.string().optional(),
});

export default function EmailPage() {
  const [loading, setLoading] = useState(false);
  const [emailConfig, setEmailConfig] = useState({
    driver: "SMTP",
    host: "smtp.gmail.com",
    port: "587",
    encryption: "TLS",
    address: "info@yourdomain.com",
    username: "reseller_admin",
    password: "",
  });

  const handleSave = () => {
    console.log("Saving Email Config:", emailConfig);
    // Yahan aapki Axios API call aayegi
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driver: "SMTP",
      encryption: "TLS",
      port: "587",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form Data:", data);
    // Simulate API Call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container>
      <main className="flex-1 pb-20 w-full">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
          <PageHeader
            heading="Email"
            icon={<Mail className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/30"
            subheading="Configure email delivery settings for your application."
          />

          <Button
            className="flex items-center gap-2 bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white h-9 px-4 shadow-sm"
            onClick={handleSave}
          >
            <Save size={16} /> Save Changes
          </Button>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Select Input Dropdown */}
              <RenderField
                control={form.control}
                name="driver"
                label="Email Driver"
                type="select"
                options={[
                  { label: "SMTP Server", value: "SMTP" },
                  { label: "Mailgun API", value: "Mailgun" },
                  { label: "Amazon SES", value: "SES" },
                ]}
              />

              {/* 2. Standard Text Input */}
              <RenderField
                control={form.control}
                name="host"
                label="SMTP Host"
                type="text"
                placeholder="e.g. smtp.gmail.com"
              />

              {/* 3. Number/Text Input */}
              <RenderField
                control={form.control}
                name="port"
                label="SMTP Port"
                type="text"
                placeholder="Enter SMTP Port"
              />

              {/* 4. Select Input for Encryption */}
              <RenderField
                control={form.control}
                name="encryption"
                label="Encryption"
                type="select"
                options={[
                  { label: "SSL", value: "SSL" },
                  { label: "TLS", value: "TLS" },
                ]}
              />
            </div>

            {/* Email Address */}
            <RenderField
              control={form.control}
              name="address"
              label="Email Address"
              type="text"
              placeholder="abc@domain.in"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <RenderField
                control={form.control}
                name="username"
                label="SMTP Username"
                type="text"
                placeholder="re******"
              />

              {/* 5. Password Input */}
              <RenderField
                control={form.control}
                name="password"
                label="SMTP Password"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </form>
        </Form>
      </main>
    </Container>
  );
}

// --- Internal Helper Component ---
const EmailInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="space-y-2 w-full">
    <label className="text-sm font-semibold text-gray-300 tracking-wide">
      {label}
    </label>
    <input
      type={type}
      name={name}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#161922] border border-gray-800 rounded-lg py-3 px-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-600"
    />
  </div>
);
