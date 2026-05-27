const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    assignedWorker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);