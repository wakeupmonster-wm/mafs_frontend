import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTermsAndCondition,
  updateTermsAndCondition,
} from "../store/t&c.slice";

export default function TermAndConditionsPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.privacypolicy);

  const [pageData, setPageData] = useState({
    title: "",
    status: "Publish",
    description: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    dispatch(fetchTermsAndCondition());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setPageData({
        title: data.title || "Terms And Condition",
        status: data.status || "Publish",
        description: data.description || "",
      });
    }
  }, [data]);

  // --- UPDATE: Save data ---
  const handleUpdate = async () => {
    if (!pageData.description) return toast.error("Description is required");

    try {
      await dispatch(updateTermsAndCondition(pageData)).unwrap();
      toast.success("Page updated successfully");
    } catch (error) {
      toast.error(error || "Failed to update page");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#F8FDFF] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1A1C1E]">
          Terms And Condition Page
        </h2>
        <p className="text-[#606060] font-medium text-base">
          Manage our MAFS privacy and policy.
        </p>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden py-3">
        <CardContent className="px-6 space-y-4">
          {/* Page Title */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Enter Page Title
            </label>
            <Input
              value={pageData.title}
              onChange={(e) =>
                setPageData({ ...pageData, title: e.target.value })
              }
              className="h-12 bg-white border-slate-200 rounded-lg focus:ring-purple-500"
            />
          </div>

          {/* Page Status */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Page Status
            </label>
            <Select
              value={pageData.status}
              onValueChange={(val) => setPageData({ ...pageData, status: val })}
            >
              <SelectTrigger className="h-12 bg-white border-slate-200 rounded-lg">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Publish">Publish</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Unpublish">Unpublish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Page Description (Rich Text) */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Page Description
            </label>
            <div className="quill-modern-container">
              <ReactQuill
                theme="snow"
                value={pageData.description}
                onChange={(val) =>
                  setPageData({ ...pageData, description: val })
                }
                modules={modules}
                placeholder="Write your policy content here..."
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={handleUpdate}
              className=" text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              Edit Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
