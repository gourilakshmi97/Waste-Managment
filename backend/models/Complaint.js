import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    image: {
      type: String,
    },

    location: {
      latitude: {
        type: Number,
      },

      longitude: {
        type: Number,
      },

      address: {
        type: String,
      },
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    completionImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

complaintSchema.index({ status: 1 });
complaintSchema.index({ userId: 1 });

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;