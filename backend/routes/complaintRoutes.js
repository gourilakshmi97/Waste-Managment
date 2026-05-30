import express from "express";
import mongoose from "mongoose";

import Complaint from "../models/Complaint.mjs";
import User from "../models/User.js";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadComplaintImage,
  complaintImagePath,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();


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
      const complaints = await Complaint.find({
        assignedWorker: worker.name,
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
router.post(
  "/",
  authMiddleware,
  uploadComplaintImage,
  async (req, res) => {
    try {

      const userId = getUserId(req);

      const {
        title,
        description,
        location,
        latitude,
        longitude,
      } = req.body || {};

      // VALIDATION
      if (!title || !description || !location) {
        return res.status(400).json({
          message:
            "Title, description and location required",
        });
      }

      // Store the uploaded file's public path, not base64 data.
      const imageUrl = req.file
        ? complaintImagePath(req.file.filename)
        : "";

      const complaint = await Complaint.create({
        userId,

        title: title.trim(),

        description: description.trim(),

        location,

        imageUrl,

        latitude: latitude
          ? Number(latitude)
          : null,

        longitude: longitude
          ? Number(longitude)
          : null,

        status: "Pending",

        assignedWorker: "",
      });

      res.status(201).json(complaint);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ================= UPDATE COMPLAINT =================
router.patch(
  "/:id",
  authMiddleware,
  uploadComplaintImage,
  async (req, res) => {
    try {

      // Only update fields that were actually sent, so a worker submitting
      // proof (status + image) doesn't wipe assignedWorker, and vice versa.
      const body = req.body || {};
      const updateFields = {};

      if (body.status !== undefined) {
        updateFields.status = body.status;
      }

      if (body.assignedWorker !== undefined) {
        updateFields.assignedWorker = body.assignedWorker;
      }

      // Worker restoration-proof image (multipart upload).
      if (req.file) {
        updateFields.imageUrl = complaintImagePath(req.file.filename);
      }

      const updatedComplaint =
        await Complaint.findByIdAndUpdate(
          req.params.id,
          { $set: updateFields },
          { new: true }
        );

      if (!updatedComplaint) {
        return res.status(404).json({
          message: "Complaint not found",
        });
      }

      res.status(200).json(updatedComplaint);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// ================= DELETE COMPLAINT =================
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const deleted =
        await Complaint.findByIdAndDelete(
          req.params.id
        );

      if (!deleted) {
        return res.status(404).json({
          message: "Complaint not found",
        });
      }

      res.status(200).json({
        message: "Deleted successfully",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

export default router;