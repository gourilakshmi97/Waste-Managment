const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({

    wasteType: {
        type: String
    },

    location: {
        type: String
    },

    weight: {
        type: Number
    }

});

module.exports = mongoose.model("Waste", wasteSchema);