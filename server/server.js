const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan"); // For logging requests
const helmet = require("helmet"); // For security headers

// Load environment variables
dotenv.config();

// Import database connection
const { connectToMongoDB } = require("./App/config/Connection");
connectToMongoDB();

// Import Routes
const productRoutes = require("./App/routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handles form data
app.use(cors());
app.use(helmet()); // Security best practices
app.use(morgan("dev")); // Log requests for debugging
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", productRoutes);
app.use("/api/auth", require("./App/routes/authRoutes")); // Auth routes

// Global Error Handler (Catches All Errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to the API! 🚀");
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
