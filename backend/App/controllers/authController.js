const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

class AuthController {
  constructor() {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  // 📍 User Registration
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword, role });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // 📍 User Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // 📍 Google SSO Authentication
  async googleAuth(req, res) {
    try {
      const { tokenId } = req.body;
      const response = await this.googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = response.getPayload();
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({ name, email, role: "user" });
        await user.save();
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Google authentication failed", error });
    }
  }

  // 📍 Instagram SSO Authentication (Dummy Implementation)
  async instagramAuth(req, res) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) return res.status(400).json({ message: "Invalid access token" });

      let user = await User.findOne({ email: "dummy@instagram.com" });

      if (!user) {
        user = new User({ name: "Instagram User", email: "dummy@instagram.com", role: "user" });
        await user.save();
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Instagram authentication failed", error });
    }
  }

  // 📍 Snapchat SSO Authentication (Dummy Implementation)
  async snapchatAuth(req, res) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) return res.status(400).json({ message: "Invalid access token" });

      let user = await User.findOne({ email: "dummy@snapchat.com" });

      if (!user) {
        user = new User({ name: "Snapchat User", email: "dummy@snapchat.com", role: "user" });
        await user.save();
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Snapchat authentication failed", error });
    }
  }

  // 📍 Role-based Access Middleware
  static authMiddleware(roles) {
    return (req, res, next) => {
      const token = req.header("Authorization");
      if (!token) return res.status(401).json({ message: "Access denied" });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Permission denied" });
        }
        req.user = decoded;
        next();
      } catch (error) {
        res.status(400).json({ message: "Invalid token" });
      }
    };
  }
}

module.exports = new AuthController();
