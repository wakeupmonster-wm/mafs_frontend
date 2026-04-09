import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconLoader, IconSearch, IconX } from "@tabler/icons-react";
import { deleteFAQ, fetchFAQs } from "../store/faq.slice";
import { toast } from "sonner";
import ConfirmModal from "@/components/common/ConfirmModal";
import FAQDialog from "../components/faqs-edit-view.page";
import {
  HelpCircle,
  Layers,
  MessageSquareText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StatsGrid from "@/components/common/stats.grid";
import { PageHeader } from "@/components/common/headSubhead";
import { Container } from "@/components/common/container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Controls the speed of the "wave" between cards
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const FAQSPage = () => {
  const dispatch = useDispatch();
  const { items, categories, loading } = useSelector((state) => state.faqs);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // States for Modals
  const [formModal, setFormModal] = useState({ isOpen: false, data: null });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    title: "",
  });

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteFAQ(deleteModal.id)).unwrap();
      toast.success("FAQ deleted successfully");
      setDeleteModal({ isOpen: false, id: null, title: "" });
    } catch (error) {
      toast.error(error || "Failed to delete");
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <IconLoader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const CATEGORIES =
    categories?.length > 0
      ? categories
      : [
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
        ];

  // const CATEGORY_COLORS = {
  //   general: "bg-alerts-success/30 text-slate-600 border-alerts-success/80",
  //   account: "bg-brand-aqua/30 text-slate-600 border-brand-aqua/80",
  //   dating: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
  //   subscriptions: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
  //   troubleshooting:
  //     "bg-alerts-warning/30 text-slate-600 border-alerts-warning/80",
  //   billing: "bg-alerts-info/30 text-slate-600 border-alerts-info/80",
  //   technical: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
  //   security_privacy: "bg-alerts-info/30 text-slate-600 border-alerts-info/80",
  //   safety_reporting:
  //     "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
  //   other: "bg-alerts-aqua/30 text-slate-600 border-alerts-aqua/80",
  // };

  const formatLabel = (str) => {
    return str
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filtered = items.filter((f) => {
    const matchSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "all" || f.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
    orange:
      "from-orange-500/40 to-orange-600/5 text-orange-600 border-orange-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
    orange:
      "from-orange-300/20 via-orange-500/10 to-transparent text-orange-600 border-orange-200 hover:border-orange-400",
  };

  const combinedStats = [
    {
      label: "Total FAQs",
      val: items.length,
      icon: <MessageSquareText className="h-5 w-5" strokeWidth={2.5} />,
      color: "blue",
      description: "Active FAQs",
    },
    {
      label: "Categories",
      val: new Set(items.map((f) => f.category)).size,
      icon: <Layers className="h-5 w-5" strokeWidth={2.5} />,
      color: "amber",
      description: "Total Sections",
    },
    ...CATEGORIES.slice(0, 2).map((cat, idx) => {
      const count = items.filter((f) => f.category === cat).length;
      const catColor = idx === 0 ? "emerald" : "rose";
      return {
        label: cat,
        val: count,
        icon: <HelpCircle className="h-5 w-5" strokeWidth={2.5} />,
        color: catColor,
        description: "Items in category",
      };
    }),
  ];

  // <div className="w-full mx-auto p-4 pb-16 space-y-6 animate-in fade-in duration-500">
  return (
    <Container className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          heading="FAQ Manager"
          icon={<HelpCircle className="w-9 h-9 text-white animate-pulse" />}
          color="bg-brand-aqua shadow-brand-aqua/20"
          subheading="Create, edit and organize frequently asked questions."
        />

        <Button
          onClick={() => setFormModal({ isOpen: true, data: null })}
          className="bg-slate-50 hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-slate-500 hover:text-white gap-2 h-10 px-4 shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </header>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsGrid stats={combinedStats} colorMap={colorMap} bgMap={bgMap} />
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-end justify-between gap-3">
        {/* 1. LEFT SIDE: Search Input */}
        <div className="relative w-80 lg:w-96">
          {/* Search Icon (Left) */}
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
          <Input
            placeholder="Search questions or answers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-10 bg-slate-50 border-slate-200 h-11 lg:h-10 shadow-sm focus-visible:ring-brand-aqua rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-1 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <IconX className="h-3.5 w-3.5 text-slate-500" />
            </button>
          )}
        </div>

        <Select
          value={filterCategory}
          onValueChange={setFilterCategory}
          className={""}
        >
          <SelectTrigger className="w-full max-w-44 bg-gray-50 hover:bg-brand-aqua font-medium hover:font-semibold text-xs text-slate-500 hover:text-white hover:border-none transition-all duration-300">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Categories
            </SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c} className="text-xs">
                {formatLabel(c)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* FAQ List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          <Accordion type="multiple" className="space-y-3">
            {filtered.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="px-6 py-1 border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-slate-50 data-[state=open]:bg-secondary/30"
              >
                <div className="relative group">
                  <AccordionTrigger className="flex-1 text-left text-[15px] font-semibold text-foreground hover:no-underline py-5">
                    <span className="flex items-start gap-3 pr-[100px] flex-1">
                      <span className="text-slate-500 text-sm font-jakarta w-7 shrink-0 font-bold mt-0.5">
                        Q{faq.order}.
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>

                  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-brand-aqua hover:bg-brand-aqua/10 border-slate-200 bg-slate-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormModal({ isOpen: true, data: faq });
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/10 border-slate-200 bg-slate-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModal({
                          isOpen: true,
                          id: faq._id || faq.id,
                          title: faq.question,
                        });
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <AccordionContent className="text-[15px] text-slate-600 leading-relaxed pb-6 pl-10 border-t border-slate-100/60">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <Card className="border-dashed border-2 bg-slate-50 border-slate-200 shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <HelpCircle className="h-10 w-10 text-slate-300 mb-3" />
            <p className="text-slate-600 font-semibold mb-1">No FAQs found</p>
            <p className="text-xs text-slate-500 max-w-sm">
              {search || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Your FAQ list is empty. Start by adding your first FAQ to help your users."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Form Dialog for Add/Edit */}
      <FAQDialog
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, data: null })}
        initialData={formModal.data}
      />
      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
        onConfirm={handleConfirmDelete}
        title="Delete FAQ?"
        message={`Are you sure you want to delete "${deleteModal.title}"?`}
        confirmText="Yes, Delete"
        type="danger"
      />
      {/* </div> */}
    </Container>
  );
};

export default FAQSPage;
