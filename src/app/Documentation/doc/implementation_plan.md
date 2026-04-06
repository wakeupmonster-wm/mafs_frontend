# Unified Text Editor for Terms & Conditions

## Background

Currently, the Terms & Conditions page (`terms-conditions.page.jsx`) uses a basic `react-quill-new` editor with a simple `{title, description}` data model. Meanwhile, the *actual* T&C content lives in `term.conditions.js` as a deeply nested JavaScript array with structured sections (titles, icons, paragraphs, alpha/roman/disc sub-lists, subtitles, etc.).

**The Problem:** The rich structured data from `term.conditions.js` is never loaded into the editor. The editor only works with a flat HTML string from the backend. We need a unified page where the admin can:
1. **View** all T&C sections in a beautiful, readable format (matching the image provided)
2. **Edit** any section inline using a rich text editor
3. **Delete** sections
4. **Save** all changes back to the backend

---

## Text Editor Research & Recommendation

| Feature | react-quill-new (current) | Tiptap | Jodit | SunEditor |
|---|---|---|---|---|
| Already installed? | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Structured content | ⚠️ HTML-only | ✅ JSON model | ⚠️ HTML | ⚠️ HTML |
| Nested lists (α, roman) | ⚠️ Basic | ✅ Excellent | ⚠️ Basic | ⚠️ Basic |
| Full toolbar | ✅ | ✅ | ✅ | ✅ |
| Maintenance | ✅ Active fork | ✅ Very active | ✅ Active | ✅ Active |
| Bundle size | ~200KB | ~300KB+ | ~350KB | ~250KB |

### Recommendation: **Keep `react-quill-new`** ✅

**Rationale:**
- Already installed and used across the project (Privacy Policy, FAQ pages)
- The real challenge is not the editor itself, but the **page architecture** — we need a section-based management UI on top of it
- Adding Tiptap would mean a new dependency, migration risk, and inconsistency with existing pages
- We can convert the structured JS data → HTML for editing, then convert back

**Architecture approach:** Instead of replacing the editor, we'll build a **section-management layer** on top of `react-quill-new`:
- Each section from `termsContent` becomes an editable card
- Admin can expand/collapse, edit inline, reorder, and delete sections
- The editor converts the structured data to/from HTML for the Quill editor per-section

---

## User Review Required

> [!IMPORTANT]
> **Data Flow Decision:** Currently the backend API stores a single `{title, description}` document. The new approach will:
> - Convert the `termsContent` array → structured HTML on initial load (if backend has no data yet)
> - Store the full document as HTML in `description` field via the existing API
> - Each section will be individually editable but saved as one combined document
>
> Is this approach acceptable, or do you want per-section API endpoints?

> [!IMPORTANT]
> **Section Management Features:** Based on the provided image, the sections have:
> - Numbered headings with icons (1. About the Application, 2. Acceptance of Terms, etc.)
> - Nested lists with alpha (a, b, c), roman (i, ii, iii), and bullet (•) numbering
> - Bold, underline, and link formatting
> 
> I'll implement view/edit/delete/save with the full formatting from your image. Shall I also add "Add New Section" and "Reorder Sections" functionality?

---

## Proposed Changes

### Component Architecture

```
terms-conditions.page.jsx (Main Page - Redesigned)
├── Header (sticky, with Save All / View / Edit mode toggle)
├── Section List (scrollable)
│   ├── SectionCard (collapsible, per-section)
│   │   ├── View Mode: Rendered HTML with proper numbering/formatting
│   │   ├── Edit Mode: ReactQuill editor + title input
│   │   └── Actions: Edit / Delete / Move Up/Down
│   └── ...repeat for each section
└── Add New Section (bottom)
```

---

### CMS Module — Pages

#### [MODIFY] [terms-conditions.page.jsx](file:///e:/WakeUpMonsterCodes/mafs-app/mafs-frontend/src/modules/cms/pages/terms-conditions.page.jsx)

**Complete rewrite** of the page with:
- **Dual Mode UI:** Toggle between "View" (read-only preview) and "Edit" (management mode)
- **Section-based architecture:** Each T&C section rendered as an expandable card
- **Per-section editing:** Click "Edit" on any section → inline Quill editor opens
- **Delete with confirmation:** Delete button with a confirmation dialog
- **Save All:** Combines all sections back into a single HTML document and dispatches to the API
- **Initial data loading:** Converts `termsContent` JS array → HTML sections on first load (fallback if backend data is empty)

### CMS Module — Components

#### [NEW] [TermsSectionCard.jsx](file:///e:/WakeUpMonsterCodes/mafs-app/mafs-frontend/src/modules/cms/components/TermsSectionCard.jsx)

Individual section card component with:
- **View mode:** Beautifully rendered section with icon, title, formatted content (lists, sub-lists)
- **Edit mode:** Section title input + ReactQuill editor with full toolbar
- **Action buttons:** Edit, Delete, Save Section, Cancel
- **Smooth transitions** using framer-motion

#### [NEW] [termsDataConverter.js](file:///e:/WakeUpMonsterCodes/mafs-app/mafs-frontend/src/modules/cms/utils/termsDataConverter.js)

Utility to convert between the structured `termsContent` array format and HTML:
- `termsContentToHtml(termsContent)` — Converts the JS array to clean HTML with proper numbered lists
- `htmlToSections(htmlString)` — Parses HTML back into section objects for the editor

### Constants

#### [NO CHANGE] [term.conditions.js](file:///e:/WakeUpMonsterCodes/mafs-app/mafs-frontend/src/constants/term.conditions.js)

This file remains as-is. It serves as the **default/fallback content** when no data exists in the backend.

### Styling

#### [NEW] [terms-editor.css](file:///e:/WakeUpMonsterCodes/mafs-app/mafs-frontend/src/modules/cms/styles/terms-editor.css)

Custom CSS for:
- Section card styling with glassmorphism
- Proper nested list rendering (alpha, roman, disc counters)
- Edit/View mode transitions
- Quill editor custom theme overrides
- Print-friendly formatting

---

## Design Preview

The final UI will match your provided image with:
1. **Premium glassmorphism header** with mode toggle (View/Edit) and Save button
2. **Section cards** with:
   - Left accent border (brand-aqua color)
   - Section number badge + icon
   - Expandable/collapsible content
   - Hover effects with subtle shadow
3. **Edit mode** per section:
   - Full Quill toolbar (bold, italic, underline, lists, links, alignment)
   - Live preview panel on the right
4. **Delete confirmation** dialog using existing Radix UI Dialog

---

## Open Questions

> [!IMPORTANT]
> 1. The image shows numbered sections with icons. Should the icons be editable by the admin, or do they remain fixed per section?
> 2. Do you want a "Reorder sections" feature (drag-and-drop), or is the current fixed order sufficient?
> 3. Should the "Add New Section" create a completely blank section, or offer a template?

---

## Verification Plan

### Automated Tests
- Browser test: Navigate to `/admin/cms/terms-conditions`, verify sections load
- Browser test: Edit a section, verify changes persist in state
- Browser test: Delete a section, verify it's removed
- Browser test: Save changes, verify API call fires

### Manual Verification
- Visual comparison with provided screenshot
- Test all list formats (alpha, roman, disc, nested sub-lists)
- Verify responsiveness on different screen sizes
- Before/after screenshots documented in walkthrough

