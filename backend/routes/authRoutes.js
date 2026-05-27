import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      age,
      phone,
      role,
    } = req.body;

    // BLOCK ADMIN CREATION
    if (role === "Admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be created ❌",
      });
    }

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password required",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      address: address || "",
      age: age || 0,
      phone: phone || "",
      role: role || "User",
      status: "Active",
    });

    res.status(201).json({
      message: "Signup successful ✅",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // FIND USER
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials ❌",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials ❌",
      });
    }

    // BLOCKED USER
    if (user.status === "Blocked") {
      return res.status(403).json({
        message: "User blocked 🚫",
      });
    }

 if (
  role &&
  role.toLowerCase() !== user.role.toLowerCase()
) {
  return res.status(400).json({
    message: `Please login as ${user.role}`,
  });
}

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
      }
    );

    // RESPONSE
    res.status(200).json({
      message: "Login successful ✅",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= GET PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {

    const userId =
      req.user?.id ||
      req.user?._id;

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= GET ALL USERS =================
router.get("/users", async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= TOGGLE STATUS =================
router.put("/toggle-status/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status =
      user.status === "Active"
        ? "Blocked"
        : "Active";

    await user.save();

    res.status(200).json({
      message: "Status updated ✅",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ================= DELETE USER =================
router.delete("/delete/:id", async (req, res) => {
  try {

    const deletedUser =
      await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted ✅",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;