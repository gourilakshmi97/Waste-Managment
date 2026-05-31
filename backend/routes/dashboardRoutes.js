import express from "express";
import Complaint from "../models/Complaint.mjs";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find()
  .populate("assignedWorker", "name");

    const metrics = {
      total: complaints.length,
      pending: complaints.filter(c => c.status === "Pending").length,
      inProgress: complaints.filter(c => c.status === "In Progress").length,
      resolved: complaints.filter(c => c.status === "Resolved").length,
    };

    res.json({
      metrics,
      complaints,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;