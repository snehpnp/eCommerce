const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpires: { type: Date },
    otp1: {
      type: String,
    },
    authType: {
      type: String,
      enum: ["local", "google", "instagram", "snapchat"],
      default: "local",
    },
    profilePic: {
      type: String, // URL of profile picture
      default: "",
    },
    sessionToken: {
      type: String, // Store session token for authentication
    },
    lastLogin: {
      type: Date, // Store last login timestamp
      default: Date.now,
    },
    wallet: {
      amount: {
        type: Number,
        default: 0, // Default wallet balance
      },
      currency: {
        type: String,
        default: "USD", // Default currency
      },
    },
    isVerified: {
      type: Boolean,
      default: false, // Default verification status
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
