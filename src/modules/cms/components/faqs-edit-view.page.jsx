import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFAQ, updateFAQ } from "../store/faq.slice";
import { Label } from "@/components/ui/label";

const FAQDialog = ({ isOpen, onClose, initialData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
  });

  // Sync form state when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question || "",
        answer: initialData.answer || "",
        category: initialData.category || "general",
      });
    } else {
      setFormData({ question: "", answer: "", category: "general" });
    }
  }, [initialData, isOpen]);

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      if (initialData?._id || initialData?.id) {
        const id = initialData._id || initialData.id;
        await dispatch(updateFAQ({ id, payload: formData })).unwrap();
        toast.success("FAQ Updated!");
      } else {
        await dispatch(createFAQ(formData)).unwrap();
        toast.success("FAQ Created successfully!");
      }
      onClose();
    } catch (error) {
      toast.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {initialData ? "Edit FAQ" : "Add New FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-muted-foreground">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue
                  placeholder="Select Category"
                  className="!capitalize"
                />
              </SelectTrigger>
              <SelectContent>
                {[
                  "general",
                  "account",
                  "dating",
                  "subscriptions",
                  "troubleshooting",
                  "billing",
                  "technical",
                  "security_privacy",
                  "safety_reporting",
                  "other",
                ].map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-muted-foreground">
              Question
            </Label>
            <Input
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="e.g., How do I reset my password?"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-muted-foreground">
              Answer
            </Label>
            <Textarea
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              placeholder="Write a clear, helpful answer…"
              className="bg-secondary/50 min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Saving..." : initialData ? "Update FAQ" : "Create FAQ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FAQDialog;
