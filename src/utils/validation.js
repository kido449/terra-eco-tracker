// ─── Input Validation & Sanitization Utilities ──────────────

/**
 * Sanitize a text input: trim whitespace, enforce max length, strip HTML tags.
 * Returns an empty string for non-string inputs.
 */
export function sanitizeText(input, maxLength = 200) {
  if (typeof input !== 'string') return '';
  // Strip HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');
  // Trim and enforce length limit
  return stripped.trim().slice(0, maxLength);
}

/**
 * Clamp a numeric value within [min, max].
 * Returns min if value is NaN or not a number.
 */
export function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}
