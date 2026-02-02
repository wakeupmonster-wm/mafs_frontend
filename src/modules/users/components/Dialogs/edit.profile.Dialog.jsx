import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconEdit, IconLoader2 } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/user.slice";

// export const EditProfileDialog = ({ userData }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="sm">
//           <IconEdit size={16} className="mr-2" /> Edit Bio
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Edit Profile Details</DialogTitle>
//         </DialogHeader>
//         <div className="grid grid-cols-2 gap-4 py-4">
//           <Input
//             placeholder="Nickname"
//             defaultValue={userData.profile.nickname}
//           />
//           <Input placeholder="Gender" defaultValue={userData.profile.gender} />
//           <Input placeholder="Age" defaultValue={userData.profile.age} />

//           <Input
//             placeholder="Job Title"
//             defaultValue={userData.profile.jobTitle}
//           />
//           <div className="col-span-2">
//             <Textarea
//               placeholder="About/Bio"
//               defaultValue={userData.profile.about}
//               rows={4}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button onClick={() => toast.success("Details Updated")}>
//             Save Changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

export const EditProfileDialog = ({ userData }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize state with existing data
  const [formData, setFormData] = useState({
    nickname: userData?.profile?.nickname || "",
    gender: userData?.profile?.gender || "",
    // age: userData?.profile?.age || "",
    jobTitle: userData?.profile?.jobTitle || "",
    company: userData?.profile?.company || "",
    about: userData?.profile?.about || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    // Clean the data: Convert age to number, handle empty strings
    const cleanedData = {
      ...formData,
      // age: formData.age === "" ? undefined : Number(formData.age),
    };

    try {
      const user = await dispatch(
        updateUserProfile({
          userId: userData._id,
          profile: cleanedData,
        })
      ).unwrap();

      console.log("user: ", user);

      toast.success(`${user?.profile.nickname}, profile updated successfully!`);
      setIsOpen(false); // Close dialog only on success
    } catch (err) {
      // If 'err' is an array (from Joi), show the first error
      const message = Array.isArray(err) ? err[0] : err;
      toast.error(message || "Failed to update");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <IconEdit size={16} className="mr-2" /> Edit Bio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Input
            name="nickname"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
          <Input
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
          />
          {/* <Input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          /> */}
          <Input
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <Input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
          <div className="col-span-2">
            <Textarea
              name="about"
              placeholder="About/Bio"
              value={formData.about}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? (
              <IconLoader2 className="animate-spin mr-2" size={18} />
            ) : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
