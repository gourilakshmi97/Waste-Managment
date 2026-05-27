import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= GET PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= GET ALL WORKERS =================
router.get("/workers", authMiddleware, async (req, res) => {
  try {

    const workers = await User.find({
      role: "Worker",
    }).select("-password");

    res.json(workers);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;