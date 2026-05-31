import express from "express";
import mongoose from "mongoose";

import Complaint from "../models/Complaint.mjs";
import User from "../models/User.js";
import { uploadToGCS } from "../services/gcsService.js";
import authMiddleware from "../middleware/authMiddleware.js";

import { uploadComplaintImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();
// ... the rest of your code ...


// ================= HELPER =================
const getUserId = (req) =>
  req.user?.id ||
  req.user?._id ||
  req.user?.user?.id;


// ================= GET MY COMPLAINTS =================
router.get(
  "/my-complaints",
  authMiddleware,
  async (req, res) => {
    try {

      const userId = getUserId(req);

      if (!userId) {
        return res.status(400).json({
          message: "User ID missing",
        });
      }

      const complaints = await Complaint.find({
        userId,
      }).sort({ createdAt: -1 });

      res.status(200).json(complaints);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ================= WORKER TASKS =================
router.get(
  "/worker/my-tasks",
  authMiddleware,
  async (req, res) => {
    try {

      const userId = getUserId(req);

      if (!userId) {
        return res.status(400).json({
          message: "Worker ID missing",
        });
      }

      // FIND WORKER
      const worker = await User.findById(userId);

      if (!worker) {
        return res.status(404).json({
          message: "Worker not found",
        });
      }

      // FIND ASSIGNED TASKS
      // Assignments store the worker's _id in `assignedWorker` (see
      // /api/tasks/assign), so match by id — not by name.
      const complaints = await Complaint.find({
        assignedWorker: String(worker._id),
      }).sort({ createdAt: -1 });

      res.status(200).json(complaints);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ================= GET ALL COMPLAINTS =================
router.get("/", async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= GET COMPLAINT BY ID =================
router.get("/:id", async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json(complaint);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= CREATE COMPLAINT =================
// ================= CREATE COMPLAINT =================
router.post("/", authMiddleware, uploadComplaintImage, async (req, res) => {
  console.log("Files:", req.file);
  console.log("Body:", req.body);

  try {
    const userId = getUserId(req);
    const { title, description, location, latitude, longitude } = req.body || {};

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required fields." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToGCS(req.file);
    }

    const complaint = await Complaint.create({
      userId,
      title: title.trim(),
      description: description.trim(),
      location,
      imageUrl,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      status: "Pending",
      assignedWorker: "",
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}); // <--- Added this missing closing brace

// ================= UPDATE COMPLAINT =================
router.patch("/:id", authMiddleware, uploadComplaintImage, async (req, res) => {
  try {
    const body = req.body || {};
    const updateFields = {};

    if (body.status !== undefined) updateFields.status = body.status;
    if (body.assignedWorker !== undefined) updateFields.assignedWorker = body.assignedWorker;

    if (req.file) {
      updateFields.imageUrl = await uploadToGCS(req.file);
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}); // <--- Added this missing closing brace
export default router;