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
import { Container } from "@/components/common/container";

export default function PrivacyAndPolicyPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.privacypolicy);

  // Local loading state for the specific update action
  const [isSaving, setIsSaving] = useState(false);

  const [pageData, setPageData] = useState({
    title: "",
    description: "",
  });

  // 1. Saare Tags/Actions enable karne ke liye "modules" ko expand karein
  // const modules = {
  //   toolbar: [
  //     [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }], // Font family & Size
  //     ["bold", "italic", "underline", "strike"], // Basic formatting
  //     [{ color: [] }, { background: [] }], // Text & Highlight color
  //     [{ script: "sub" }, { script: "super" }], // Sub/Super script
  //     [
  //       { header: "1" },
  //       { header: "2" },
  //       { header: "3" },
  //       { paragraph: "paragraph" },
  //       { blockquote: true },
  //       "code-block",
  //     ], // Headers & Blocks
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ], // Lists & Indentation
  //     [{ direction: "rtl" }, { align: [] }], // Text Alignment & Direction
  //     ["link", "image", "video"], // Media
  //     ["clean"], // Clear formatting
  //   ],
  // };
  const modules = {
    toolbar: [
      [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // 2. Explicitly define formats (Ye ensure karta hai ki editor saare tags accept kare)
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "check",
    "direction",
    "align",
    "link",
    "image",
    "video",
  ];

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
    <Container className="px-0">
      {/* Header with Glassmorphism Effect */}
      <header className="sticky top-0 z-20 px-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full mx-auto py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
      </header>

      <main className="p-6">
        <Card className="overflow-hidden py-4 border-none p-0">
          <CardContent className="px-0 space-y-8">
            {/* Page Title Input */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Content Editor (Advanced)
                {/* Document Title */}
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
              {/* <div className="rounded-lg border border-slate-200 overflow-hidden"> */}
              <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                {/* <style>{`
                    .ql-container { min-height: 400px; font-size: 16px; }
                    .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
                    .ql-container.ql-snow { border: none; }
                  `}</style> */}
                <style>{`
                    .ql-container { min-height: 500px; font-size: 16px; background: white; }
                    .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #e2e8f0; background: #f8fafc; padding: 12px; }
                    .ql-container.ql-snow { border: none; }
                    .ql-editor { line-height: 1.6; }
                    /* Tooltip visibility fix */
                    .ql-snow .ql-tooltip { z-index: 1000; }
                    /* .ql-editor p { margin-bottom: 12px; line-height: 1.6; } */
                    .ql-align-center { text-align: center; }
                    .ql-align-right { text-align: right; }
                    .ql-align-justify { text-align: justify; }

                  `}</style>
                <ReactQuill
                  theme="snow"
                  value={pageData.description}
                  onChange={(val) =>
                    setPageData({ ...pageData, description: val })
                  }
                  modules={modules}
                  formats={formats} // Formats pass karna zaroori hai
                  placeholder="Paste your Privacy Policy here and use the toolbar to align..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </Container>
  );
}
