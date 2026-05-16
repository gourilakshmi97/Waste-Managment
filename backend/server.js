import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import "./models/User.js";
import "./models/Complaint.js";
import "./models/Task.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// ROUTES
app.use("/api/complaints", complaintRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Smart Waste Management API Running");
});
// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});