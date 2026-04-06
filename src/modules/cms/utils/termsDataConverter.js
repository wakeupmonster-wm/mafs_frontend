/**
 * termsDataConverter.js
 * Converts the structured `termsContent` array ↔ per-section HTML strings
 * for use with ReactQuill editor.
 */

// ── Roman numeral helper ──────────────────────────────────────────────
const toRoman = (num) => {
  const romanMap = [
    [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"],
    [100, "c"], [90, "xc"], [50, "l"], [40, "xl"],
    [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let result = "";
  for (const [value, symbol] of romanMap) {
    while (num >= value) { result += symbol; num -= value; }
  }
  return result;
};

// ── Alpha label helper ────────────────────────────────────────────────
const toAlpha = (index) => String.fromCharCode(97 + index); // a, b, c...

// ── Build list marker based on type ───────────────────────────────────
const getMarker = (type, index) => {
  switch (type) {
    case "alpha":  return `${toAlpha(index)}.`;
    case "roman":  return `${toRoman(index + 1)}.`;
    case "disc":   return "•";
    default:       return `${index + 1}.`;
  }
};

// ── Render a sub-list recursively ─────────────────────────────────────
const renderSubList = (subList, depth = 1) => {
  if (!subList || !subList.items?.length) return "";

  const paddingLeft = depth * 24;
  let html = `<ul style="list-style:none; padding-left:${paddingLeft}px; margin:6px 0;">`;

  subList.items.forEach((item, idx) => {
    const marker = getMarker(subList.listType, idx);

    if (typeof item === "string") {
      html += `<li style="margin-bottom:6px;"><span style="font-weight:600; margin-right:8px; color:#475569;">${marker}</span>${item}</li>`;
    } else if (typeof item === "object" && item.text) {
      html += `<li style="margin-bottom:6px;"><span style="font-weight:600; margin-right:8px; color:#475569;">${marker}</span>${item.text}`;
      if (item.subList) {
        html += renderSubList(item.subList, depth + 1);
      }
      html += `</li>`;
    }
  });

  html += `</ul>`;
  return html;
};

// ══════════════════════════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════════════════════════

/**
 * Convert a single section's `content` array → HTML string
 */
export const sectionContentToHtml = (contentArray) => {
  if (!contentArray?.length) return "";

  let html = "";

  contentArray.forEach((block) => {
    // ── Subtitle ──
    if (block.subtitle) {
      html += `<p><strong style="font-size:15px;">${block.subtitle}</strong></p>`;
    }

    // ── Plain text paragraph ──
    if (block.text && !block.list) {
      html += `<p style="margin-bottom:12px; line-height:1.7;">${block.text}</p>`;
    }

    // ── List block ──
    if (block.list && block.items?.length) {
      html += `<ul style="list-style:none; padding-left:0; margin:8px 0;">`;

      block.items.forEach((item, idx) => {
        const marker = getMarker(block.listType, idx);

        if (typeof item === "string") {
          html += `<li style="margin-bottom:8px; padding-left:8px;"><span style="font-weight:600; margin-right:8px; color:#475569;">${marker}</span>${item}</li>`;
        } else if (typeof item === "object") {
          html += `<li style="margin-bottom:8px; padding-left:8px;"><span style="font-weight:600; margin-right:8px; color:#475569;">${marker}</span>${item.text || ""}`;
          if (item.subList) {
            html += renderSubList(item.subList);
          }
          html += `</li>`;
        }
      });

      html += `</ul>`;
    }
  });

  return html;
};

/**
 * Convert the full `termsContent` array into an array of section objects
 * suitable for the editor state.
 */
export const termsContentToSections = (termsContent) => {
  return termsContent.map((section) => ({
    id: section.id,
    title: section.title,
    iconName: section.icon?.displayName || section.icon?.name || "FileText",
    html: sectionContentToHtml(section.content),
  }));
};

/**
 * Combine an array of section objects back into a single HTML document
 * for saving to the backend.
 */
export const sectionsToFullHtml = (sections) => {
  return sections
    .map(
      (section) =>
        `<div data-section-id="${section.id}" data-icon-name="${section.iconName || "FileText"}" style="margin-bottom:32px;">` +
        `<h2 style="font-size:20px; font-weight:700; color:#0f172a; margin-bottom:16px; padding-bottom:8px; border-bottom:1px solid #e2e8f0;">${section.title}</h2>` +
        `<div style="padding-left:4px;">${section.html}</div>` +
        `</div>`
    )
    .join("\n");
};

/**
 * Parse a full HTML document (from backend) back into section objects.
 * Falls back gracefully if the HTML isn't section-structured.
 */
export const fullHtmlToSections = (htmlString) => {
  if (!htmlString) return [];

  // Try to parse section divs
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const sectionDivs = doc.querySelectorAll("[data-section-id]");

  if (sectionDivs.length > 0) {
    return Array.from(sectionDivs).map((div) => {
      const h2 = div.querySelector("h2");
      const contentDiv = div.querySelector("div");
      return {
        id: div.getAttribute("data-section-id"),
        title: h2?.textContent || "Untitled Section",
        iconName: div.getAttribute("data-icon-name") || "FileText",
        html: contentDiv?.innerHTML || "",
      };
    });
  }

  // Fallback: treat entire HTML as a single section
  return [
    {
      id: "full-document",
      title: "Terms & Conditions",
      iconName: "FileText",
      html: htmlString,
    },
  ];
};
