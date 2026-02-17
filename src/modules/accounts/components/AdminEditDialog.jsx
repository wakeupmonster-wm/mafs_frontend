import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAdminAccount } from "../store/account.slice";
import { toast } from "sonner";
import { Camera, Loader2, UserCircle } from "lucide-react";
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
  });

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleUpdate = async () => {
    if (!formData.nickname.trim()) return toast.error("Nickname is required");

    setLoading(true);
    const data = new FormData();
    data.append("nickname", formData.nickname);
    data.append("about", formData.about);

    if (selectedFile) {
      data.append("avatar", selectedFile);
    }

    try {
      await dispatch(updateAdminAccount(data)).unwrap();
      toast.success("Profile updated successfully!");
      setOpen(false); // Close the dialog
    } catch (err) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold gradient-text inline-block">
            Edit Admin Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Avatar Upload */}
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="h-24 w-24 border-2 shadow-2xl group-hover:opacity-70 transition-opacity border-brand-aqua">
              <AvatarImage src={preview || currentData?.avatar?.url} />
              <AvatarFallback className="bg-secondary text-muted-foreground">
                <UserCircle className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40 rounded-full">
              <Camera className="text-foreground w-6 h-6" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            Click photo to change
          </p>

          {/* Form Fields */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Nickname
              </Label>
              <Input
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
                className={"border-brand-aqua/50"}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Bio
              </Label>
              <Textarea
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                rows={3}
                className={"border-brand-aqua/50"}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full font-semibold bg-brand-aqua/20 hover:bg-brand-aqua/80 border border-brand-aqua text-slate-700"
          >
            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
