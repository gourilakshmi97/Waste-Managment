import { API_ORIGIN } from "../services/api";

export const NO_IMAGE_PLACEHOLDER =
  "https://via.placeholder.com/400x220?text=No+Image";

// Resolves a stored image value into a usable <img> src.
// Uploaded complaints store a relative path like "/uploads/complaints/abc.jpg";
// this prefixes the backend origin. Absolute URLs and data/blob URLs (e.g. a
// local preview) are returned unchanged.
export function resolveImageUrl(value) {
  if (!value || typeof value !== "string") return "";

  const v = value.trim();
  if (!v) return "";

  if (
    v.startsWith("http://") ||
    v.startsWith("https://") ||
    v.startsWith("data:") ||
    v.startsWith("blob:")
  ) {
    return v;
  }

  return `${API_ORIGIN}${v.startsWith("/") ? v : `/${v}`}`;
}
