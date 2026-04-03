import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ReceiptText, Save } from "lucide-react"; // Added icons
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTermsAndCondition,
  updateTermsAndCondition,
} from "../store/t&c.slice";
import { PageHeader } from "@/components/common/headSubhead";
import { Container } from "@/components/common/container";

export default function TermAndConditionsPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.termsAndcondition);
  const [isUpdating, setIsUpdating] = useState(false);

  const [pageData, setPageData] = useState({
    title: "",
    description: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { list: "ordered" }],
      ["link", "clean"],
    ],
  };

  useEffect(() => {
    dispatch(fetchTermsAndCondition());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setPageData({
        title: data.title || "Terms And Condition",
        description: data.description || "",
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    if (!pageData.description) return toast.error("Description is required");

    setIsUpdating(true);
    try {
      await dispatch(updateTermsAndCondition(pageData)).unwrap();
      toast.success("Content updated successfully");
    } catch (error) {
      toast.error(error || "Failed to update page");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Container className="px-0">
      {/* Header Section - Sticky for better UX */}
      <header className="sticky top-0 z-20 px-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full mx-auto py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <PageHeader
            heading="Terms & Conditions"
            icon={<ReceiptText className="w-6 h-6 text-white" />}
            color="bg-brand-aqua"
            subheading="Manage legal policies and user agreements."
          />

          <Button
            onClick={handleUpdate}
            disabled={isUpdating || loading}
            className="bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white gap-2 h-9 px-4 shadow-sm"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 mr-1" />
            )}
            Save Changes
          </Button>
        </div>
      </header>

      <main className="p-6">
        <Card className="overflow-hidden py-4 border-none p-0">
          <CardContent className="px-0 space-y-8">
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
                className="h-11 bg-slate-50 border-slate-200 placeholder:text-slate-400 focus:ring-[0.1px] focus-visible:ring-0 focus-visible:border-brand-aqua transition-all duration-300 text-base"
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
    </Container>
  );
}
