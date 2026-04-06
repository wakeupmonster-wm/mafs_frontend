import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  ChevronDown,
  Pencil,
  Trash2,
  Check,
  X,
  GripVertical,
  FileText,
  Activity,
  AlertTriangle,
  Ban,
  CreditCard,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
  Globe,
  Database,
  Lock,
  Eye,
  Info,
  BookOpen,
  Shield,
  User,
  Settings,
  Key,
  HelpCircle,
  MessageSquare,
  FileCheck,
  Bell,
  Fingerprint,
  Heart,
  Briefcase,
  Search,
} from "lucide-react";
import "../styles/terms-editor.css";

// ── Icon map for section icons ───────────────────────────────────────
const ICON_MAP = {
  FileText,
  Activity,
  AlertTriangle,
  Ban,
  CreditCard,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
  Globe,
  Database,
  Lock,
  Eye,
  Info,
  BookOpen,
  // New Icons
  Shield,
  User,
  Settings,
  Key,
  HelpCircle,
  MessageSquare,
  FileCheck,
  Bell,
  Fingerprint,
  Heart,
  Briefcase,
  Search,
};

// ── Quill modules & formats ──────────────────────────────────────────
const quillModules = {
  toolbar: [
    // [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }, "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
];

/**
 * TermsSectionCard
 * Renders a single T&C section with view/edit/delete capabilities.
 */
export default function TermsSectionCard({
  section,
  index,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onDelete,
  totalSections,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);
  const [editHtml, setEditHtml] = useState(section.html);
  const [editIconName, setEditIconName] = useState(section.iconName);

  // ── Icon lookup ──
  const IconComponent = ICON_MAP[section.iconName] || FileText;

  // ── Start editing ──
  const handleStartEdit = useCallback(
    (e) => {
      e.stopPropagation();
      setEditTitle(section.title);
      setEditHtml(section.html);
      setEditIconName(section.iconName || "FileText");
      setIsEditing(true);
      setIsConfirmingDelete(false);
      // Auto-expand when editing
      if (!isExpanded) onToggleExpand();
    },
    [section, isExpanded, onToggleExpand],
  );

  // ── Save edits ──
  const handleSaveEdit = useCallback(() => {
    onUpdate(section.id, {
      ...section,
      title: editTitle,
      html: editHtml,
      iconName: editIconName,
    });
    setIsEditing(false);
  }, [section, editTitle, editHtml, editIconName, onUpdate]);

  // ── Cancel editing ──
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditTitle(section.title);
    setEditHtml(section.html);
    setEditIconName(section.iconName);
  }, [section]);

  // ── Delete flow ──
  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    onDelete(section.id);
    setIsConfirmingDelete(false);
  }, [section.id, onDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsConfirmingDelete(false);
  }, []);

  return (
    <div
      className={`tc-section-card ${isEditing ? "tc-section-card--editing" : ""}`}
    >
      {/* ── Section Header ── */}
      <div
        className="tc-section-header"
        onClick={() => {
          if (!isEditing) onToggleExpand();
        }}
      >
        <div className="tc-section-header__left">
          {/* Grip handle */}
          <GripVertical
            size={16}
            style={{ color: "#cbd5e1", flexShrink: 0, cursor: "grab" }}
          />

          {/* Icon badge */}
          <div className="tc-section-header__badge">
            <IconComponent size={18} />
          </div>

          {/* Title */}
          <span className="tc-section-header__title">{section.title}</span>
        </div>

        {/* Actions + Chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!isEditing && (
            <div className="tc-section-header__actions">
              <button
                className="tc-action-btn tc-action-btn--edit"
                onClick={handleStartEdit}
                title="Edit section"
              >
                <Pencil size={15} />
              </button>
              {totalSections > 1 && (
                <button
                  className="tc-action-btn tc-action-btn--delete"
                  onClick={handleDeleteClick}
                  title="Delete section"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          )}
          <ChevronDown
            size={18}
            className={`tc-chevron ${isExpanded ? "tc-chevron--open" : ""}`}
          />
        </div>
      </div>

      {/* ── Expanded Content ── */}
      {isExpanded && !isEditing && (
        <div className="tc-section-content">
          <div
            className="tc-section-content__html"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        </div>
      )}

      {/* ── Edit Mode ── */}
      {isEditing && (
        <div className="tc-section-edit">
          {/* Icon Picker */}
          <div className="tc-icon-picker">
            <label className="tc-icon-picker__label">Select Section Icon</label>
            <div className="tc-icon-picker__grid">
              {Object.keys(ICON_MAP).map((iconKey) => {
                const PickerIcon = ICON_MAP[iconKey];
                return (
                  <button
                    key={iconKey}
                    type="button"
                    className={`tc-icon-picker__item ${editIconName === iconKey ? "tc-icon-picker__item--active" : ""}`}
                    onClick={() => setEditIconName(iconKey)}
                    title={iconKey}
                  >
                    <PickerIcon size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title input */}
          <input
            type="text"
            className="tc-section-edit__title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Section title…"
          />

          {/* Quill Editor */}
          <div className="tc-quill-wrapper">
            <ReactQuill
              theme="snow"
              value={editHtml}
              onChange={setEditHtml}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write section content here…"
            />
          </div>

          {/* Edit actions */}
          <div className="tc-section-edit__actions">
            <button
              className="tc-action-btn tc-action-btn--cancel"
              onClick={handleCancelEdit}
            >
              <X size={14} />
              Cancel
            </button>
            <button
              className="tc-action-btn tc-action-btn--save"
              onClick={handleSaveEdit}
            >
              <Check size={14} />
              Save Section
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {isConfirmingDelete && (
        <div className="tc-delete-confirm">
          <span className="tc-delete-confirm__text">
            Delete "{section.title}"? This cannot be undone.
          </span>
          <button
            className="tc-delete-confirm__btn tc-delete-confirm__btn--no"
            onClick={handleCancelDelete}
          >
            Keep
          </button>
          <button
            className="tc-delete-confirm__btn tc-delete-confirm__btn--yes"
            onClick={handleConfirmDelete}
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
