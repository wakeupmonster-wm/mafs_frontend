import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Standard Textarea
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconArrowLeft, IconDeviceFloppy, IconEye } from "@tabler/icons-react";
import { toast } from "sonner";
import { createFAQ, updateFAQ } from "../store/faq.slice";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";

const FAQEditView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");

  useEffect(() => {
    if (location.state?.faq) {
      const { faq } = location.state;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(faq.question);
      setContent(faq.answer);
      setCategory(faq.category);
      console.log("faq: ", faq);
    }
  }, [location.state]);

  console.log("id: ", id);

  const handleSave = async () => {
    if (!title || !content) return toast.error("Please fill all fields");

    const payload = {
      question: title,
      answer: content,
      category: category,
    };

    try {
      if (id) {
        await dispatch(updateFAQ({ id, payload })).unwrap();
        toast.success("FAQ Updated!");
      } else {
        await dispatch(createFAQ(payload)).unwrap();
        toast.success("FAQ Created successfully!");
      }
      navigate("..");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="p-4 space-y-6 bg-[#F8FDFF] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* --- Actions Header --- */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("..")}
          className="gap-2"
        >
          <IconArrowLeft size={18} /> Back to List
        </Button>
        <Button
          onClick={handleSave}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <IconDeviceFloppy size={18} /> {id ? "Update FAQ" : "Save FAQ"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* --- Simple Form Card --- */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
              Manage FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="dating">Dating</SelectItem>
                  <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="troubleshooting">
                    Troubleshooting
                  </SelectItem>
                  <SelectItem value="security_privacy">
                    Security Privacy
                  </SelectItem>
                  <SelectItem value="safety_reporting">
                    Safety Reporting
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">
                Question
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g, What is Match At First Swipe?"
                className="font-semibold text-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">
                Answer
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide a clear, simple answer..."
                className="min-h-[200px] leading-relaxed resize-none border-slate-200"
              />
            </div>
          </CardContent>
        </Card>

   
      </div>
    </div>
  );
};

export default FAQEditView;
