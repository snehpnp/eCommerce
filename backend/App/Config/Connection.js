"use strict";

const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const db_connect = process.env.MONGO_URI;

    // Updated Connection with Explicit Options
    await mongoose.connect(db_connect, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 50000, // 50 seconds
      socketTimeoutMS: 45000, // 45 seconds for I/O operations
      connectTimeoutMS: 30000, // 30 seconds to establish a connection
      useNewUrlParser: false, // Ensure no deprecated option is used
      useUnifiedTopology: false, // Ensure no deprecated option is used
    });

    console.log("Connected to MongoDB at Time:", new Date());

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB Connection Error at Time:", new Date(), error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection lost. Reconnecting...");
      connectToMongoDB();
    });

  } catch (error) {
    console.log("Failed to connect to MongoDB at Time:", new Date(), error);
  }
};

module.exports = { connectToMongoDB };
