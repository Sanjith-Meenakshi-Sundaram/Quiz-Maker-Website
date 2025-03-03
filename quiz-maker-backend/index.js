import express from "express";  // ✅ Import Express
import mongoose from "mongoose"; // ✅ Import Mongoose
import cors from "cors";  // ✅ Import CORS
import dotenv from "dotenv";  // ✅ Import dotenv for environment variables
import authRoutes from "./routes/AuthRoutes.js";  // ✅ Import Auth Routes
import Quizroutes from "./routes/Quizroutes.js"; // ✅ Import Quiz Routes

dotenv.config(); // ✅ Load environment variables from .env file

const app = express(); // ✅ Create an Express app
const PORT = process.env.PORT || 5000; // ✅ Define the server port

// ✅ Middleware to parse JSON data
app.use(express.json()); 

// ✅ Setup CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow frontend to access backend
    credentials: true, // ✅ Allow cookies (if needed)
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow these HTTP methods
  })
);

// ✅ Use authentication and quiz routes
app.use("/api/auth", authRoutes); 
app.use("/api/quiz", Quizroutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Quiz Maker Backend is Running 🚀");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
