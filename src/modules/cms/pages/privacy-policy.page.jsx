import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Loader2,
  ShieldCheck,
  Save,
  Eye,
  PenLine,
  Plus,
  FileText,
  Layers,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrivacyPolicy,
  updatePrivacyPolicy,
} from "../store/privacy.slice";
import { PageHeader } from "@/components/common/headSubhead";
import { Container } from "@/components/common/container";
// import { privacyContents } from "@/constants/privacypolicy";
import {
  sectionsToFullHtml,
  fullHtmlToSections,
  termsContentToSections,
} from "../utils/termsDataConverter";
import TermsSectionCard from "../components/TermsSectionCard";
import "../styles/terms-editor.css";

export default function PrivacyAndPolicyPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.privacypolicy);
  const [isSaving, setIsSaving] = useState(false);

  // ── Page title ──
  const [pageTitle, setPageTitle] = useState("Privacy Policy");

  // ── Section-based state ──
  const [sections, setSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState(new Set());

  // ── View / Edit mode ──
  const [viewMode, setViewMode] = useState("edit");

  // ── Load data from API ──
  useEffect(() => {
    dispatch(fetchPrivacyPolicy());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setPageTitle(data.title || "Privacy Policy");

      if (data.description) {
        const parsed = fullHtmlToSections(data.description);
        const hasStructuredSections =
          parsed.length > 1 ||
          (parsed.length === 1 && parsed[0].id !== "full-document");

        if (hasStructuredSections) {
          setSections(parsed);
          return;
        }
      }
    }

    // Fallback: use structured constants from privacypolicy.js
    // const initialSections = termsContentToSections(privacyContents);
    // setSections(initialSections);
  }, [data]);

  // ── Expand first 2 sections by default ──
  useEffect(() => {
    if (sections.length > 0 && expandedSections.size === 0) {
      setExpandedSections(
        new Set([sections[0]?.id, sections[1]?.id].filter(Boolean)),
      );
    }
  }, [sections]);

  // ── Toggle expand/collapse ──
  const toggleExpand = useCallback((sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedSections(new Set(sections.map((s) => s.id)));
  }, [sections]);

  const collapseAll = useCallback(() => {
    setExpandedSections(new Set());
  }, []);

  // ── Update a section ──
  const handleUpdateSection = useCallback((sectionId, updatedSection) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? updatedSection : s)),
    );
    toast.success("Section updated");
  }, []);

  // ── Delete a section ──
  const handleDeleteSection = useCallback((sectionId) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.delete(sectionId);
      return next;
    });
    toast.success("Section removed");
  }, []);

  // ── Add new section ──
  const handleAddSection = useCallback(() => {
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      title: `${sections.length + 1}. New Section`,
      iconName: "FileText",
      html: "<p>Enter section content here…</p>",
    };
    setSections((prev) => [...prev, newSection]);
    setExpandedSections((prev) => new Set(prev).add(newId));
    toast.success("New section added");
  }, [sections.length]);

  // ── Save All to backend ──
  const handleSaveAll = useCallback(async () => {
    if (sections.length === 0) {
      return toast.error("No sections to save");
    }

    setIsSaving(true);
    try {
      const fullHtml = sectionsToFullHtml(sections);
      await dispatch(
        updatePrivacyPolicy({
          title: pageTitle,
          description: fullHtml,
        }),
      ).unwrap();
      toast.success("Privacy Policy saved successfully");
    } catch (error) {
      toast.error(error || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }, [dispatch, pageTitle, sections]);

  // ── Stats ──
  const sectionCount = sections.length;
  const allExpanded =
    expandedSections.size === sectionCount && sectionCount > 0;

  return (
    <Container className="px-0">
      {/* ══════════ Sticky Header ══════════ */}
      <header className="sticky top-0 z-20 px-6 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full mx-auto py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <PageHeader
            heading="Privacy & Policy"
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            color="bg-brand-aqua"
            subheading="Update user data protection guidelines."
          />

          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <div className="tc-mode-toggle">
              <button
                className={`tc-mode-toggle__btn ${viewMode === "view" ? "tc-mode-toggle__btn--active" : ""}`}
                onClick={() => setViewMode("view")}
              >
                <Eye size={14} />
                View
              </button>
              <button
                className={`tc-mode-toggle__btn ${viewMode === "edit" ? "tc-mode-toggle__btn--active" : ""}`}
                onClick={() => setViewMode("edit")}
              >
                <PenLine size={14} />
                Edit
              </button>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveAll}
              disabled={isSaving || loading}
              className="bg-white hover:bg-brand-aqua border border-slate-300 font-medium hover:font-semibold text-xs text-slate-500 hover:text-white gap-2 h-9 px-4 shadow-sm"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5 mr-1" />
              )}
              {isSaving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      {/* ══════════ Toolbar Bar ══════════ */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <span className="tc-stats-badge">
            <Layers size={13} />
            {sectionCount} {sectionCount === 1 ? "Section" : "Sections"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={allExpanded ? collapseAll : expandAll}
            className="text-xs font-semibold text-slate-500 hover:text-brand-aqua transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50"
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>

      {/* ══════════ Main Content ══════════ */}
      <main className="p-6">
        {/* Document Title (Edit mode only) */}
        {viewMode === "edit" && (
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 ml-1 block mb-2">
              Document Title
            </label>
            <input
              type="text"
              className="tc-section-edit__title-input"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="e.g. Privacy Policy"
            />
          </div>
        )}

        {/* Sections list */}
        {sections.length > 0 ? (
          <div className="space-y-4">
            {sections.map((section, index) => (
              <TermsSectionCard
                key={section.id}
                section={section}
                index={index}
                isExpanded={expandedSections.has(section.id)}
                onToggleExpand={() => toggleExpand(section.id)}
                onUpdate={handleUpdateSection}
                onDelete={handleDeleteSection}
                totalSections={sectionCount}
              />
            ))}

            {/* Add New Section (Edit mode only) */}
            {viewMode === "edit" && (
              <button className="tc-add-section" onClick={handleAddSection}>
                <Plus size={18} />
                Add New Section
              </button>
            )}
          </div>
        ) : (
          <div className="tc-empty-state">
            <div className="tc-empty-state__icon">
              <FileText size={28} />
            </div>
            <p className="tc-empty-state__title">No sections yet</p>
            <p className="tc-empty-state__desc">
              Click "Add New Section" to start building your Privacy Policy
              document.
            </p>
            {viewMode === "edit" && (
              <button
                className="tc-add-section mt-6"
                style={{ maxWidth: 320 }}
                onClick={handleAddSection}
              >
                <Plus size={18} />
                Add First Section
              </button>
            )}
          </div>
        )}
      </main>
    </Container>
  );
}
