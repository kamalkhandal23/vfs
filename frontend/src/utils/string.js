// utils/string.js
export const formatStatus = (str) => {
  if (!str) return "-";

  // Replace underscores with spaces
  let words = str.replace(/_/g, " ").toLowerCase();

  // ✅ Insert space before numbers (e.g. "Round2" -> "Round 2")
  words = words.replace(/([a-zA-Z])(\d+)/g, "$1 $2");

  // Split and convert each word to Title Case
  const formatted = words
    .split(" ")
    .filter(Boolean) // remove empty strings
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formatted;
};



export const formatFileName = (name) => {
  if (!name) return "newFile"
  return name.trim().replace(/\s+/g, "_"); // spaces → underscores
};


export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

export const ALLOWED_BULK_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];



/**
 * Returns initials from a full name.
 * @param {string} name - Full name (e.g., "John Doe")
 * @param {boolean} [withSpace=false] - Whether to add space between initials
 * @param {number} [limit=2] - Number of initials to take
 * @returns {string} - Initials (e.g., "JD" or "J D")
 */
export const getInitials = (name, withSpace = false, limit = 2) => {
  if (!name) return "-";
  const initials = name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, limit);

  return withSpace ? initials.join(" ") : initials.join("");
};


/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - Input string
 * @returns {string} - Formatted string
 */
export const formatTitle = (str) => {
  if (!str) return "-";
  if (str.toUpperCase() === "N/A") return str; // ✅ Return as-is if "N/A"
  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Shortens a string to a fixed length and adds ellipsis
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum length of the output
 * @returns {string} - Shortened string
 */
export const truncateText = (str, maxLength = 20) => {
  if (!str) return "-";
  return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
};



export const formatChartKey = (str) =>
  str
    .replace(/_/g, ' ')              // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word


export const getShortTitle = (title = "") => {
  if (!title) return "";

  const text = String(title);

  // Extract content inside parentheses, if any
  const match = text.match(/\(([^)]+)\)/);
  const inBrackets = match ? ` (${match[1].split(" ")[0]})` : ""; // take first word inside ()

  // Remove parenthesis part from main title
  const main = text.replace(/\(.*?\)/, "").trim();

  // Build acronym for main part
  const words = main.split(" ");
  const short = words
    .filter((w) => w.length > 2)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");

  return `${short}${inBrackets}`.trim();
};

export const formatChatTitle = (str) =>
  String(str)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());


export const cleanEditorHTML = (html = "") => {
  return html
    .replace(/<p><br><\/p>/g, "") // remove empty paragraphs
    .replace(/&nbsp;/g, " ")      // normalize non-breaking spaces
    .trim();
};


export const cleanJD = (html) => {
  if (!html) return "";

  return html
    .replace(/^"(.*)"$/, "$1")        // remove wrapping quotes
    .trim();
};

export const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const parseSkillsForApi = (input = "") => {
  if (!input) return "";

  return input
    .trim()
    // Normalize spacing
    .replace(/\s+/g, " ")
    // AND → +
    .replace(/\s+AND\s+/gi, "+")
    // OR → ,
    .replace(/\s+OR\s+/gi, ",")
    // Remove accidental leading/trailing operators
    .replace(/^[+,]+|[+,]+$/g, "");
};


// utils/string.js
export const normalizeString = (str = "") =>
  String(str)
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, " "); // underscores + multiple spaces → single space



export const smartFormat = (value, format) => {
  if (value === null || value === undefined) return "-";

  const str = String(value);

  // ✅ Explicit format always wins
  if (format) {
    switch (format) {
      case "title":
        return formatTitle(str);
      case "upper":
        return str.toUpperCase();
      case "lower":
        return str.toLowerCase();
      case "raw":
        return str;
      default:
        return str;
    }
  }

  // 🔹 SMART DEFAULTS (no format provided)

  // emails
  if (str.includes("@")) return str.toLowerCase();

  // codes / IDs (EMP_123, HRMS01)
  if (/^[A-Z0-9_-]+$/.test(str)) return str;

  // phone numbers
  if (/^\+?\d[\d\s-]{6,}$/.test(str)) return str;

  // already uppercase short strings
  if (str.length <= 5 && str === str.toUpperCase()) return str;

  // default → title case
  return formatTitle(str);
};



/* -------------------------------------------------------------------------- */
/* 🏢 Generic String → CODE Converter (Reusable Everywhere)                  */
/* -------------------------------------------------------------------------- */

/**
 * Converts any string to SAFE_CODE format
 *
 * - Trim
 * - Remove special chars
 * - Spaces → underscore
 * - Collapse multiple underscores
 * - Uppercase
 * - Prevent starting with number
 * - Max length limit
 * - Fallback if empty
 */
export const toCode = (
  value,
  {
    fallback = "GENERIC",
    maxLength = 30,
    prefixIfStartsWithNumber = "X",
  } = {}
) => {
  if (!value || typeof value !== "string") return fallback;

  let result = value
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "") // remove special characters
    .replace(/\s+/g, "_")           // spaces → underscore
    .replace(/_+/g, "_")            // collapse multiple underscores
    .toUpperCase()
    .replace(/^_+|_+$/g, "");       // trim underscores

  if (!result) return fallback;

  // Prevent starting with number
  if (/^\d/.test(result)) {
    result = `${prefixIfStartsWithNumber}_${result}`;
  }

  // Enforce max length
  if (result.length > maxLength) {
    result = result.slice(0, maxLength);
  }

  return result;
};



/**
 * Formats filter summary values for UI display
 */
export const formatFilterValue = (value) => {
  if (!value) return "-";

  // Array support (skills, tags etc.)
  if (Array.isArray(value)) {
    return value.length
      ? value.map(v => smartFormat(v)).join(", ")
      : "-";
  }

  // Boolean support
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  const str = String(value);

  // Avoid displaying raw codes like INTERVIEW_ROUND2
  if (str.includes("_")) {
    return formatStatus(str);
  }

  return smartFormat(str);
};