import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "Admin",
      status: "Active",
    });

    console.log("Admin created successfully ✅", admin.email);

    process.exit();
  } catch (err) {
    console.error("Error creating admin ❌", err);
    process.exit(1);
  }
};

createAdmin();