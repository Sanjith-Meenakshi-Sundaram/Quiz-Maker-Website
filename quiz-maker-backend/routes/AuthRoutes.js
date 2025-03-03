import express from "express"; // ✅ Import Express
import bcrypt from "bcryptjs"; // ✅ Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // ✅ Import JWT for authentication
import User from "../models/User.js"; // ✅ Import User model

const router = express.Router(); // ✅ Create a router

// ✅ User Signup Route
router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, name } = req.body; // ✅ Accept any order

        // ✅ Check if all fields are provided
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // ✅ Create user object
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save(); 

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});


// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; // ✅ Get data from request body

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, userId: user._id }); // ✅ Send token in response
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

export default router; // ✅ Export the router
