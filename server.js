const express = require("express");
const mongoose = require("mongoose");
const Waste = require("./models/Waste");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Complaint = require("./models/Complaint");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const role = require("./middleware/role");

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://test:test@ac-0wsmk30-shard-00-00.3izgemu.mongodb.net:27017,ac-0wsmk30-shard-00-01.3izgemu.mongodb.net:27017,ac-0wsmk30-shard-00-02.3izgemu.mongodb.net:27017/below?ssl=true&replicaSet=atlas-iot1p7-shard-0&authSource=admin&appName=Cluster0")

.then(() => {
    console.log("MongoDB Connected ✅");
})

.catch((error) => {
    console.log(error);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running 🚀");
});

// Save Waste API
app.post("/add-waste", async (req, res) => {

    try {

        const newWaste = new Waste({
            wasteType: req.body.wasteType,
            location: req.body.location,
            weight: req.body.weight
        });

        await newWaste.save();

        res.send("Waste Saved Successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Error Saving Waste ❌");
    }

});

// Get Waste API
app.get("/get-waste", async (req, res) => {

    try {

        const wasteData = await Waste.find();

        res.send(wasteData);

    } catch (error) {

        console.log(error);

        res.send("Error Fetching Waste ❌");
    }

});

app.put("/update-waste/:id", async (req, res) => {

    try {

        await Waste.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            }
        );

        res.send("Waste status updated ✅");

    } catch (error) {

        console.log(error);

        res.send("Error updating waste ❌");
    }

});
app.delete("/delete-waste/:id", async (req, res) => {

    try {

        await Waste.findByIdAndDelete(req.params.id);

        res.send("Waste deleted successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Error deleting waste ❌");
    }

});
// Register API
app.post("/register", async (req, res) => {

    try {

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.send("Email already registered ❌");
        }

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || "user"
        });

        await newUser.save();

        res.send("User Registered Successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Registration Failed ❌");
    }

});
// Login API
app.post("/login", async (req, res) => {

    try {

        // Find user by email
        const user = await User.findOne({
            email: req.body.email
        });

        // If user not found
        if (!user) {
            return res.send("User not found ❌");
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // If password is wrong
        if (!isPasswordCorrect) {
            return res.send("Incorrect password ❌");
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            "mysecretkey"
        );

        // Send token
        res.send({
            message: "Login Successful ✅",
            token: token
        });

    } catch (error) {

        console.log(error);

        res.send("Login Failed ❌");
    }

});
// Protected Route
app.get("/profile", auth, (req, res) => {

    res.send({
        message: "Welcome to your profile ✅",
        user: req.user
    });

});

// Admin Only Route
app.get("/admin-dashboard", auth, role("admin"), (req, res) => {

    res.send("Welcome Admin 👑");

});
// Create Complaint API
app.post("/complaints", auth, async (req, res) => {

    try {

        const newComplaint = new Complaint({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            createdBy: req.user.userId
        });

        await newComplaint.save();

        res.send("Complaint Created Successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Error Creating Complaint ❌");
    }

});
// Get Complaints API
app.get("/complaints", auth, async (req, res) => {

    try {

        const complaints = await Complaint.find()
            .populate("createdBy", "name email")
            .populate("assignedWorker", "name email");

        res.send(complaints);

    } catch (error) {

        console.log(error);

        res.send("Error Fetching Complaints ❌");
    }

});
// Update Complaint Status API
app.put("/complaints/:id/status", auth, async (req, res) => {

    try {

        await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            }
        );

        res.send("Complaint Status Updated Successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Error Updating Complaint Status ❌");
    }

});
// Assign Worker API
app.put("/complaints/:id/assign", auth, async (req, res) => {

    try {

        await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                assignedWorker: req.body.workerId
            }
        );

        res.send("Worker Assigned Successfully ✅");

    } catch (error) {

        console.log(error);

        res.send("Error Assigning Worker ❌");
    }

});
// Filter Complaints by Status API
app.get("/complaints/filter/:status", auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({
            status: req.params.status
        })
        .populate("createdBy", "name email")
        .populate("assignedWorker", "name email");

        res.send(complaints);
    } catch (error) {
        console.log(error);
        res.send("Error Filtering Complaints ❌");
    }
});
// Start Server

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
