import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    address: String,

    age: Number,

    email: {
      type: String,
      unique: true,
    },

    phone: String,

    password: String,

    role: {
      type: String,
      enum: ["User", "Worker", "Admin"],
      default: "User",
    },

    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);