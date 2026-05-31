import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Images are uploaded as multipart/form-data (handled by multer), so the JSON
// body parser only handles small request bodies and uses its default limit.
// Change these lines:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded files, e.g. GET /uploads/complaints/<file>.jpg
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = [
  "http://localhost:5173", 
  "https://smart-waste-management-1b4b0.web.app"
];

// Temporarily update middleware in server.mjs
app.use(cors({
  origin: "*", // Allow everything
  credentials: true,
}));
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server running 🚀" });
});

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)

  .then(() => {

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on ${PORT}`);
      // Add this to debug
      console.log("Attempting to connect to MongoDB with URI length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : "UNDEFINED");
    });

  })
  .catch(err => console.error(err));