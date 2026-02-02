import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconTrash,
  IconEye,
  IconPhotoOff,
  IconCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { deleteUserPhoto } from "../../store/user.slice";
import { cn } from "@/lib/utils";

// export const GallleryTab = ({ photos, userId }) => {
//   const dispatch = useDispatch();
//   const [isPhotoDeleteOpen, setIsPhotoDeleteOpen] = useState(false);
//   const [selectedPhotoId, setSelectedPhotoId] = useState(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const handleOpenPreview = (url) => {
//     setPreviewUrl(url);
//     setIsPreviewOpen(true);
//   };

//   const onConfirmDelete = async () => {
//     try {
//       await dispatch(
//         deleteUserPhoto({ userId, publicId: selectedPhotoId })
//       ).unwrap();
//       toast.success("Photo removed successfully");
//     } catch (err) {
//       toast.error(err || "Failed to delete");
//     } finally {
//       setIsPhotoDeleteOpen(false);
//     }
//   };

//   return (
//     <>
//       <TabsContent value="gallery" className="mt-6">
//         <Card className="border-none shadow-none bg-transparent">
//           <CardHeader className="px-0">
//             <CardTitle>User Uploads ({photos?.length || 0})</CardTitle>
//           </CardHeader>
//           <CardContent className="px-0">
//             {/* Framer Motion Grid Container */}
//             <motion.div
//               layout
//               className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
//             >
//               <AnimatePresence mode="popLayout">
//                 {photos?.map((photo, index) => (
//                   <motion.div
//                     key={photo.publicId || photo.url}
//                     layout // This makes photos slide smoothly
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.5,
//                       transition: { duration: 0.2 },
//                     }}
//                     className="group relative aspect-[3/4] rounded-xl overflow-hidden border bg-muted shadow-sm cursor-pointer"
//                   >
//                     {/* Primary Badge */}
//                     {index === 0 && (
//                       <Badge className="absolute top-2 left-2 z-10 bg-yellow-400 text-black border-none text-[10px] px-2 py-0">
//                         PRIMARY
//                       </Badge>
//                     )}

//                     <img
//                       src={photo.url}
//                       className="h-full w-full object-cover"
//                       onClick={() => handleOpenPreview(photo.url)} // Preview on Click
//                     />

//                     {/* Action Overlay */}
//                     <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-black/40 backdrop-blur-[2px]">
//                       {/* Buttons Container with slight upward slide on hover */}
//                       <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
//                         {/* Preview Button */}
//                         <Button
//                           variant="secondary"
//                           size="icon"
//                           className="h-10 w-10 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/40"
//                           onClick={() => handleOpenPreview(photo.url)}
//                         >
//                           <IconEye size={18} />
//                         </Button>

//                         {/* Set as Primary / Refresh Button */}
//                         {/* <Button
//                           variant="secondary"
//                           size="icon"
//                           className="h-10 w-10 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/40"
//                           onClick={() => {
//                             // Add Set Primary Logic
//                           }}
//                         >
//                           <IconRefresh size={18} />
//                         </Button> */}

//                         {/* Delete Button */}
//                         <Button
//                           variant="destructive"
//                           size="icon"
//                           className="h-10 w-10 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedPhotoId(photo.publicId);
//                             setIsPhotoDeleteOpen(true);
//                           }}
//                         >
//                           <IconTrash size={18} />
//                         </Button>
//                       </div>

//                       {/* Label with Fade-in Effect */}
//                       <div className="absolute bottom-4 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">
//                         <span className="px-3 py-1 rounded-full bg-black/60 text-[10px] text-white font-bold uppercase tracking-widest border border-white/10 backdrop-blur-xl">
//                           {index === 0
//                             ? "★ Profile Cover"
//                             : `Media Item ${index + 1}`}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           </CardContent>
//         </Card>
//       </TabsContent>

//       {/* --- PHOTO PREVIEW MODAL --- */}
//       <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
//         <DialogContent className="max-w-max max-h-[95vh] p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-center outline-none">
//           {/* 1. Accessibility requirement: Title hidden for sighted users */}
//           <DialogHeader>
//             <DialogTitle className="sr-only">Photo Preview</DialogTitle>
//           </DialogHeader>

//           {/* 2. The Image with Framer Motion */}
//           <motion.img
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             src={previewUrl}
//             alt="User upload preview"
//             className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain border-4 border-white/10"
//           />

//           {/* Optional: Add a caption below the image in the dialog */}
//           <p className="text-white/70 text-sm font-medium bg-black/50 px-4 py-1 rounded-full backdrop-blur-md">
//             Reviewing High Resolution Media
//           </p>
//         </DialogContent>
//       </Dialog>

//       {/* --- DELETE CONFIRMATION --- */}
//       <ConfirmModal
//         isOpen={isPhotoDeleteOpen}
//         onClose={() => setIsPhotoDeleteOpen(false)}
//         onConfirm={onConfirmDelete}
//         title="Delete Photo?"
//         message="This will remove the photo from the user's profile forever."
//       />
//     </>
//   );
// };

export const GallleryTab = ({ photos = [], userId }) => {
  const dispatch = useDispatch();
  const [selectedPhotos, setSelectedPhotos] = useState([]); // For bulk actions
  const [isPhotoDeleteOpen, setIsPhotoDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const toggleSelect = (publicId) => {
    setSelectedPhotos((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const onConfirmDelete = async () => {
    try {
      // Logic for bulk or single delete
      const idsToDelete =
        selectedPhotos.length > 0 ? selectedPhotos : [selectedPhotos[0]];

      for (const publicId of idsToDelete) {
        await dispatch(deleteUserPhoto({ userId, publicId })).unwrap();
      }

      toast.success(`${idsToDelete.length} photo(s) removed`);
      setSelectedPhotos([]);
    } catch (err) {
      toast.error(err || "Failed to delete");
    } finally {
      setIsPhotoDeleteOpen(false);
    }
  };

  return (
    <>
      <TabsContent value="gallery" className="mt-6 space-y-4">
        {/* GALLERY HEADER & BULK ACTIONS */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">User Gallery</h3>
            <p className="text-xs text-slate-500">
              {photos.length} Total Uploads
            </p>
          </div>

          <AnimatePresence>
            {selectedPhotos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs font-bold text-indigo-600 mr-2">
                  {selectedPhotos.length} selected
                </span>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 px-3"
                  onClick={() => setIsPhotoDeleteOpen(true)}
                >
                  <IconTrash size={14} className="mr-1" /> Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8"
                  onClick={() => setSelectedPhotos([])}
                >
                  Cancel
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PHOTO GRID */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
            <IconPhotoOff size={48} stroke={1} />
            <p className="mt-2 font-medium">No media uploaded yet</p>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {photos.map((photo, index) => {
                const isSelected = selectedPhotos.includes(photo.publicId);
                return (
                  <motion.div
                    key={photo.publicId || photo.url}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "group relative break-inside-avoid rounded-2xl overflow-hidden border-2 transition-all duration-300",
                      isSelected
                        ? "border-indigo-600 ring-4 ring-indigo-50"
                        : "border-transparent hover:border-slate-300 shadow-sm"
                    )}
                  >
                    {/* SELECTION CHECKMARK */}
                    <button
                      onClick={() => toggleSelect(photo.publicId)}
                      className={cn(
                        "absolute top-3 right-3 z-30 h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all",
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white/20 backdrop-blur-md border-white/50 text-transparent group-hover:text-white/50"
                      )}
                    >
                      <IconCheck size={14} stroke={3} />
                    </button>

                    {/* IMAGE CONTENT */}
                    <div className="relative overflow-hidden bg-slate-100">
                      {index === 0 && (
                        <Badge className="absolute top-3 left-3 z-20 bg-amber-400 text-amber-950 hover:bg-amber-400 border-none text-[10px] font-black uppercase">
                          Cover
                        </Badge>
                      )}

                      <img
                        src={photo.url}
                        alt="User Upload"
                        className={cn(
                          "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105",
                          isSelected && "opacity-80"
                        )}
                        onClick={() => {
                          if (selectedPhotos.length > 0)
                            toggleSelect(photo.publicId);
                          else {
                            setPreviewUrl(photo.url);
                            setIsPreviewOpen(true);
                          }
                        }}
                      />

                      {/* HOVER OVERLAY - Only shows if not in selection mode */}
                      {selectedPhotos.length === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white"
                              onClick={() => {
                                setPreviewUrl(photo.url);
                                setIsPreviewOpen(true);
                              }}
                            >
                              <IconEye size={18} />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-9 w-9 rounded-full"
                              onClick={() => {
                                setSelectedPhotos([photo.publicId]);
                                setIsPhotoDeleteOpen(true);
                              }}
                            >
                              <IconTrash size={18} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </TabsContent>

      {/* --- PHOTO PREVIEW MODAL --- */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-black/95 overflow-hidden flex items-center justify-center">
          <DialogHeader className="sr-only">
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <img
            src={previewUrl}
            className="max-w-full max-h-[90vh] object-contain"
            alt="High Res Preview"
          />
        </DialogContent>
      </Dialog>

      <ConfirmModal
        isOpen={isPhotoDeleteOpen}
        onClose={() => {
          setIsPhotoDeleteOpen(false);
          if (selectedPhotos.length === 1) setSelectedPhotos([]);
        }}
        onConfirm={onConfirmDelete}
        title={
          selectedPhotos.length > 1 ? "Bulk Delete Photos?" : "Delete Photo?"
        }
        message={`Are you sure you want to remove ${
          selectedPhotos.length || 1
        } photo(s)? This cannot be undone.`}
      />
    </>
  );
};
