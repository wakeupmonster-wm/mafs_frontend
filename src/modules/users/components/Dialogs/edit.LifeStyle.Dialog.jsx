import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconEdit } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const EditLifeStyleDialoag = ({ userData }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <IconEdit size={16} className="mr-2" /> Edit Lifestyle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modify Lifestyle & Interests</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Input
            placeholder="Smoking"
            defaultValue={userData.attributes.smoking}
          />
          <Input
            placeholder="Drinking"
            defaultValue={userData.attributes.drinking}
          />
          <Input
            placeholder="Education"
            defaultValue={userData.attributes.education}
          />
          <div className="col-span-2">
            <Input
              placeholder="Interests (Comma separated)"
              defaultValue={userData.attributes.interests.join(", ")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => toast.success("Lifestyle Updated")}>
            Update Lifestyle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
