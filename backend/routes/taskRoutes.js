import express from "express";

import Task from "../models/Task.js";
import Complaint from "../models/Complaint.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ASSIGN TASK TO WORKER
router.post("/assign", protect, async (req, res) => {

  try {

    const {
      complaintId,
      workerId
    } = req.body;


    // CREATE TASK
    const task = await Task.create({
      complaintId,
      workerId,
      assignedBy: req.user._id
    });


    // UPDATE COMPLAINT
    await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedWorker: workerId,
        status: "In Progress"
      }
    );


    res.status(201).json({
      message: "Task assigned successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET MY TASKS (WORKER)
router.get("/mytasks", protect, async (req, res) => {

  try {

    const tasks = await Task.find({
      workerId: req.user._id
    })
    .populate("complaintId")
    .populate("workerId");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE TASK STATUS
router.put("/status/:id", protect, async (req, res) => {

  try {

    const {
      status
    } = req.body;


    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );


    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;