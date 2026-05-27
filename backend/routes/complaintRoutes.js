import express from "express";
import mongoose from "mongoose";

import Complaint from "../models/Complaint.mjs";
import User from "../models/User.js";

import authMiddleware from "../middleware/authMiddleware.js";

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
  async (req, res) => {
    try {

      const userId = getUserId(req);

      const {
        title,
        description,
        location,
        image,
        latitude,
        longitude,
      } = req.body;

      // VALIDATION
      if (!title || !description || !location) {
        return res.status(400).json({
          message:
            "Title, description and location required",
        });
      }

      const complaint = await Complaint.create({
        userId,

        title: title.trim(),

        description: description.trim(),

        location,

        image: image || "",

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
  async (req, res) => {
    try {

      const updatedComplaint =
        await Complaint.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              status: req.body.status,
              assignedWorker:
                req.body.assignedWorker,
            },
          },
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