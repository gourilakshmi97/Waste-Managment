import multer from "multer";

// 1. Always use memoryStorage for Cloud Run/Serverless environments
const storage = multer.memoryStorage();

// 2. Define the multer instance with strict limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (allowedMime.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpeg, png, webp, gif, avif) are allowed"));
    }
  },
});

// 3. Export the single middleware function
export const uploadComplaintImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      const message = err.code === "LIMIT_FILE_SIZE"
        ? "Image is too large (max 10MB)"
        : err.message || "Image upload failed";
      return res.status(400).json({ message });
    }
    next();
  });
};
