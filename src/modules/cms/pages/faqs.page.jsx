import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconLoader, IconX } from "@tabler/icons-react";
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
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  const { items, loading } = useSelector((state) => state.faqs);
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

  const statCards = [
    {
      label: "Total FAQs",
      value: items.length,
      icon: MessageSquareText,
      color: "blue", // Changed from brand-aqua
    },
    {
      label: "Categories",
      value: new Set(items.map((f) => f.category)).size,
      icon: Layers,
      color: "amber", // Changed from alerts-error
    },
  ];

  const CATEGORIES = [
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

  const CATEGORY_COLORS = {
    general: "bg-alerts-success/30 text-slate-600 border-alerts-success/80",
    account: "bg-brand-aqua/30 text-slate-600 border-brand-aqua/80",
    dating: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
    subscriptions: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
    troubleshooting:
      "bg-alerts-warning/30 text-slate-600 border-alerts-warning/80",
    billing: "bg-alerts-info/30 text-slate-600 border-alerts-info/80",
    technical: "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
    security_privacy: "bg-alerts-info/30 text-slate-600 border-alerts-info/80",
    safety_reporting:
      "bg-alerts-error/30 text-slate-600 border-alerts-error/80",
    other: "bg-alerts-aqua/30 text-slate-600 border-alerts-aqua/80",
  };

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

  const grouped = filtered.reduce((acc, faq) => {
    (acc[faq.category] ??= []).push(faq);
    return acc;
  }, {});

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

  return (
    <div className="w-full mx-auto p-4 pb-16 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl text-primary bg-brand-aqua shadow-xl shadow-cyan-100">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              FAQ Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              Create, edit and organize frequently asked questions.
            </p>
          </div>
        </div>
        <Button
          // onClick={openAdd}
          onClick={() => setFormModal({ isOpen: true, data: null })}
          className="bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-10 px-4 shadow-sm shadow-neutral-400"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card
            key={s.label}
            className={`overflow-hidden border-slate-200 transition-all hover:shadow-md bg-gradient-to-br ${bgMap[s.color]}`}
          >
            <CardContent className="p-0 flex items-stretch h-24">
              {/* Left Color Strip Accent */}
              <div
                className={`w-1.5 rounded-tr-lg rounded-br-lg ${s.color === "blue" ? "bg-blue-500" : "bg-amber-500"}`}
              />

              <div className="flex items-center gap-4 px-4 w-full">
                <div
                  className={`p-2.5 rounded-xl border bg-white shadow-sm ${colorMap[s.color]}`}
                >
                  <s.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-black text-slate-900 leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">
                    {s.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Category Specific Stats */}
        {CATEGORIES.slice(0, 2).map((cat, idx) => {
          const count = items.filter((f) => f.category === cat).length;
          const catColor = idx === 0 ? "emerald" : "rose"; // Assigning specific theme colors

          return (
            <Card
              key={cat}
              className={`overflow-hidden border-slate-200 transition-all hover:shadow-md bg-gradient-to-br ${bgMap[catColor]}`}
            >
              <CardContent className="p-0 flex items-stretch h-24">
                <div
                  className={`w-1.5 rounded-tr-lg rounded-br-lg ${catColor === "emerald" ? "bg-emerald-500" : "bg-rose-500"}`}
                />

                <div className="flex items-center gap-4 px-4 w-full">
                  <Badge
                    variant="outline"
                    className={`capitalize text-[10px] font-bold px-4 py-2 bg-white shadow-sm ${colorMap[catColor]}`}
                  >
                    {cat}
                  </Badge>
                  <div className="flex flex-col">
                    <p className="text-2xl font-black text-slate-900 leading-none mb-1">
                      {count}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      Items
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative w-full max-w-lg lg:max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
          {/* // className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
          <Input
            placeholder="Search questions or answers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-10 bg-white border-slate-200 h-11 lg:h-10 shadow-sm focus-visible:ring-brand-aqua rounded-xl"
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

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-64 bg-secondary">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {formatLabel(c)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* FAQ List grouped by category */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Badge
                  variant="outline"
                  className={`${CATEGORY_COLORS[category]} text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5`}
                >
                  {category}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <Accordion type="multiple" className="space-y-2">
                {items.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="px-4 border border-slate-400/50 rounded-xl data-[state=open]:bg-secondary/30"
                  >
                    <div className="flex items-center">
                      <AccordionTrigger className="flex-1 text-left text-sm font-semibold text-foreground hover:no-underline py-4">
                        <span className="flex items-center gap-2">
                          <span className="text-muted-foreground text-xs font-jakarta w-5 shrink-0">
                            Q{faq.order}.
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>

                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-brand-aqua"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormModal({ isOpen: true, data: faq });
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground font-medium">No FAQs found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              {search || filterCategory !== "all"
                ? "Try adjusting your search or filter."
                : "Start by adding your first FAQ."}
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
    </div>
  );
};

export default FAQSPage;
