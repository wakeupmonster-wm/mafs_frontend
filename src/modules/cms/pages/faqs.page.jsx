import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconPlus,
  IconPencil,
  IconTrash,
  IconLoader,
} from "@tabler/icons-react";
import { deleteFAQ, fetchFAQs } from "../store/faq.slice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "@/components/common/ConfirmModal";

const FAQSPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 1. Get live data from Redux store
  const { items, loading } = useSelector((state) => state.faqs);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // 2. Fetch data on component mount
  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  // 1. Open modal and set the target FAQ
  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  // 3. Handle Delete logic
  const handleConfirmDelete = async () => {
    if (!faqToDelete) return;

    try {
      // Use _id or id depending on your backend response
      const targetId = faqToDelete._id || faqToDelete.id;
      await dispatch(deleteFAQ(targetId)).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete FAQ");
    } finally {
      setFaqToDelete(null);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <IconLoader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#F8FDFF] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform FAQs</h2>
          <p className="text-[#606060] font-medium text-sm">
            Manage user questions and categories.
          </p>
        </div>
        <Button onClick={() => navigate("edit")} className="gap-2">
          <IconPlus size={18} /> Add FAQ
        </Button>
      </div>

      <div className="grid gap-4">
        {items.length > 0 ? (
          items.map((faq, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow shadow-md"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-primary bg-primary/5 px-2 py-0.5 rounded-md mb-1 inline-block">
                    {faq.category}
                  </span>

                  <h4 className="font-bold text-slate-800">
                    <span>{faq.order}. </span>
                    {faq.question}
                  </h4>
                  <p className="text-base text-slate-800 leading-relaxed max-w-7xl">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-blue-50 text-blue-600"
                    onClick={() =>
                      navigate(`edit/${faq._id || faq.id}`, { state: { faq } })
                    }
                  >
                    <IconPencil size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 text-red-600"
                    onClick={() => handleDeleteClick(faq)} // Trigger the Modal
                  >
                    <IconTrash size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-400">
            <p className="text-slate-600 font-medium italic">
              No FAQs found. Start by adding a new one.
            </p>
          </div>
        )}
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setFaqToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete this FAQ?"
        message={`Are you sure you want to delete "${faqToDelete?.question}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        type="danger"
      />
    </div>
  );
};

export default FAQSPage;
