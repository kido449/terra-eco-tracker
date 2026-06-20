// ─── Input Validation & Sanitization Utilities ──────────────

/**
 * sanitizeText
 * Sanitize a text input: trim whitespace, enforce max length, strip HTML tags.
 * 
 * WHY? 
 * This prevents Cross-Site Scripting (XSS) by stripping out potential <script> tags or malformed HTML 
 * that users might enter in custom text fields. It also prevents UI overflow by enforcing a max length.
 * 
 * @param {string} input - The raw text input.
 * @param {number} maxLength - Maximum allowed length (default: 200).
 * @returns {string} The sanitized text.
 */
export function sanitizeText(input, maxLength = 200) {
  if (typeof input !== 'string') return '';
  // Strip HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');
  // Trim and enforce length limit
  return stripped.trim().slice(0, maxLength);
}

/**
 * clampNumber
 * Clamp a numeric value within [min, max].
 * 
 * WHY?
 * Prevents logic errors and divide-by-zero crashes when calculations receive unexpected inputs 
 * (e.g., negative distances, or values far exceeding normal bounds). Guaranteed safe boundaries 
 * ensure the data visualization charts do not break.
 * 
 * @param {number|string} value - The input number.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number} The clamped number.
 */
export function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}
