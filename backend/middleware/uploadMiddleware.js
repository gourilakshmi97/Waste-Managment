import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// backend/uploads/complaints  (this file lives in backend/middleware)
export const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");
const COMPLAINTS_DIR = path.join(UPLOAD_ROOT, "complaints");

// Make sure the destination exists before multer writes to it.
fs.mkdirSync(COMPLAINTS_DIR, { recursive: true });

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, COMPLAINTS_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || "") || ".jpg").toLowerCase();
    const unique = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, png, webp, gif, avif) are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
}).single("image");

// Public URL path (relative) stored in MongoDB and served as a static file.
export const complaintImagePath = (filename) =>
  `/uploads/complaints/${filename}`;

// Wraps multer so upload errors return clean JSON instead of an HTML 500.
// Non-multipart requests (e.g. a JSON-only PATCH) pass straight through.
export const uploadComplaintImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image is too large (max 10MB)"
          : err.message || "Image upload failed";

      return res.status(400).json({ message });
    }

    next();
  });
};
