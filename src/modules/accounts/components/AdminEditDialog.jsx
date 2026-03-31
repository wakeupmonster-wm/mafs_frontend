import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAdminAccount } from "../store/account.slice";
import { toast } from "sonner";
import { Camera, Loader2, Save, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AdminEditDialog({ children, currentData }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    nickname: currentData?.nickname || "",
    about: currentData?.about || "",
    phone: currentData?.phone || "",
  });

  // Handle File Selection with Client-Side Validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Client-side validation for immediate feedback
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return toast.error(
          "Invalid file type. Please upload JPEG, PNG, or WebP.",
        );
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!formData.nickname.trim()) return toast.error("Nickname is required");
    if (!formData.about.trim()) return toast.error("Bio is required");
    if (!formData.phone.trim()) return toast.error("Phone is required");

    setLoading(true);
    const data = new FormData();
    data.append("nickname", formData.nickname);
    data.append("about", formData.about);
    data.append("phone", formData.phone);

    if (selectedFile) {
      data.append("avatar", selectedFile);
    }

    try {
      await dispatch(updateAdminAccount(data)).unwrap();
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (err) {
      // This will now catch the "Invalid file type" message from your backend
      console.log("error: ", err);
      toast.error(err || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-max sm:max-w-2xl md:max-w-3xl overflow-hidden p-0 rounded-[2rem] bg-white border-0 shadow-2xl font-jakarta">
        <div className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center text-slate-800 tracking-tight">
              Edit Admin Profile
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <div
                className="relative group cursor-pointer mb-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar className="relative h-44 w-44 ring-4 ring-brand-aqua/10 group-hover:ring-brand-aqua/40 transition-all shadow-xl bg-slate-50">
                  <AvatarImage
                    src={preview || currentData?.avatar?.url}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-50 to-brand-aqua/10 text-brand-aqua">
                    <UserCircle className="w-12 h-12 opacity-50" />
                  </AvatarFallback>
                </Avatar>

                {/* Camera overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/40 rounded-full transition-all duration-300">
                  <Camera
                    className="text-white w-8 h-8 drop-shadow-lg"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Edit Badge floating */}
                <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                  <div className="bg-brand-aqua/10 p-1.5 rounded-full text-brand-aqua">
                    <Camera className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                />
              </div>

              <div className="text-center mt-2 space-y-0.5">
                <p className="text-[10px] text-brand-aqua uppercase font-black tracking-widest">
                  Upload New Photo
                </p>
                <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                  JPG, PNG or WebP under 5MB
                </p>
              </div>
            </div>

            <div className="space-y-5 w-full">
              <div className="space-y-2 group">
                <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest group-focus-within:text-brand-aqua transition-colors ml-1">
                  Display Name
                </Label>
                <Input
                  value={formData.nickname}
                  onChange={(e) =>
                    setFormData({ ...formData, nickname: e.target.value })
                  }
                  // className="h-12 bg-slate-50/50 focus-visible:ring-4 focus-visible:ring-brand-aqua/10 focus-visible:border-brand-aqua rounded-xl transition-all duration-300 font-semibold"
                  className="h-12 border-slate-300 placeholder:text-slate-400 bg-slate-50/30 pr-12 rounded-2xl text-base focus-visible:ring-4 focus-visible:ring-brand-aqua/10 focus-visible:border-brand-aqua transition-[background-color,border-color] duration-300"
                  placeholder="Enter your nickname"
                />
              </div>

              <div className="space-y-2 group">
                <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest group-focus-within:text-brand-aqua transition-colors ml-1">
                  Phone Number
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 border-slate-300 placeholder:text-slate-400 bg-slate-50/30 pr-12 rounded-2xl text-base focus-visible:ring-4 focus-visible:ring-brand-aqua/10 focus-visible:border-brand-aqua transition-[background-color,border-color] duration-300"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* <div className="space-y-2 group">
                <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest group-focus-within:text-brand-aqua transition-colors ml-1">
                  Bio / About
                </Label>
                <Textarea
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                  rows={4}
                  className="resize-none border-slate-200 bg-slate-50/30 pr-12 rounded-2xl text-base focus-visible:ring-4 focus-visible:ring-brand-aqua/10 focus-visible:border-brand-aqua transition-[background-color,border-color] duration-300"
                  placeholder="Write something about yourself..."
                />
              </div> */}
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full h-14 bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-base text-slate-500 hover:text-white shadow-sm rounded-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin w-5 h-5 text-brand-aqua" />
                  Saving updates...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5" strokeWidth={2.5} />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
