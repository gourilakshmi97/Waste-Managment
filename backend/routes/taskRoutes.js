import express from "express";
import Task from "../models/Task.js";
import Complaint from "../models/Complaint.mjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= ASSIGN TASK ================= */
router.post("/assign", authMiddleware, async (req, res) => {
  try {
    const { complaintId, workerId } = req.body;

    if (!complaintId || !workerId) {
      return res.status(400).json({
        message: "complaintId and workerId required",
      });
    }

    // check worker exists
    const worker = await User.findById(workerId);
    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    // create task
    const task = await Task.create({
      complaint: complaintId,
      worker: workerId,
      assignedBy: req.user.id,
      status: "Assigned",
    });

    // update complaint (IMPORTANT FIX)
    await Complaint.findByIdAndUpdate(
      complaintId,
      {
        $set: {
          assignedWorker: workerId,
          status: "In Progress",
        },
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Task assigned successfully",
      task,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});


/* ================= GET WORKER TASKS ================= */
router.get("/my-tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      worker: req.user.id,
    }).populate("complaint");

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;