import express from "express";
import Complaint from "../models/Complaint.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// CREATE COMPLAINT
router.post("/", protect, async (req, res) => {
  try {

    const complaint = await Complaint.create({
  ...req.body,
  userId: req.user._id
});
    res.status(201).json(complaint);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET ALL COMPLAINTS
router.get("/", async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("userId")
      .populate("assignedWorker");

    res.json(complaints);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET SINGLE COMPLAINT
router.get("/:id", async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id);

    res.json(complaint);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE COMPLAINT
router.put("/:id", async (req, res) => {
  try {

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedComplaint);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE COMPLAINT
router.delete("/:id", async (req, res) => {
  try {

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      message: "Complaint deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

export default router;