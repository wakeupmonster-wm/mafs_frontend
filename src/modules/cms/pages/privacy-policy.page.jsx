import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrivacyPolicy,
  updatePrivacyPolicy,
} from "../store/privacy.slice";
import { PageHeader } from "@/components/common/headSubhead";

export default function PrivacyAndPolicyPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.privacypolicy);

  // Local loading state for the specific update action
  const [isSaving, setIsSaving] = useState(false);

  const [pageData, setPageData] = useState({
    title: "",
    description: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "bullet" }, { list: "ordered" }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    dispatch(fetchPrivacyPolicy());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setPageData({
        title: data.title || "Privacy Policy",
        description: data.description || "",
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    if (!pageData.description) return toast.error("Description is required");

    setIsSaving(true);
    try {
      await dispatch(updatePrivacyPolicy(pageData)).unwrap();
      toast.success("Privacy Policy updated successfully");
    } catch (error) {
      toast.error(error || "Failed to update page");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header with Glassmorphism Effect */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-aqua/20 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-brand-aqua" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                Privacy & Policy
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Update user data protection guidelines
              </p>
            </div>
          </div> */}

          <PageHeader
            heading="Privacy & Policy"
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            color="bg-brand-aqua"
            subheading="Update user data protection guidelines."
          />

          <Button
            onClick={handleUpdate}
            disabled={isSaving}
            // className="w-full sm:w-auto bg-brand-aqua hover:bg-brand-aqua/80 text-white px-6 h-11 rounded-lg shadow-md transition-all active:scale-95"
            className="bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white gap-2 h-9 px-4 shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 mr-1" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <main className="p-4 mx-auto">
        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white py-4">
          <CardContent className="px-6 space-y-8">
            {/* Page Title Input */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Document Title
              </label>
              <Input
                placeholder="e.g. User Terms of Service"
                value={pageData.title}
                onChange={(e) =>
                  setPageData({ ...pageData, title: e.target.value })
                }
                className="h-11 bg-slate-50 border-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-[0.1px] focus-visible:ring-0 focus-visible:border-brand-aqua transition-all duration-300 text-base"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Content Editor
              </label>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <style>{`
                    .ql-container { min-height: 400px; font-size: 16px; }
                    .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
                    .ql-container.ql-snow { border: none; }
                  `}</style>
                <ReactQuill
                  theme="snow"
                  value={pageData.description}
                  onChange={(val) =>
                    setPageData({ ...pageData, description: val })
                  }
                  modules={modules}
                  placeholder="Start typing your legal content..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
