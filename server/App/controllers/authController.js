const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const Role = require("../models/Role");
const Cart = require("../models/Cart");

const admin = require("firebase-admin");
const CommanMail = require("../utils/Commanmail");

const serviceAccount = require("../../socialauth-534b5-firebase-adminsdk-fbsvc-f87ccafa08.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class AuthController {
  constructor() {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  // 📍 User Registration
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // ✅ Basic Validations
      if (!name || !email || !password || !role)
        return res.json({ message: "All fields are required" });
      if (password.length < 6)
        return res.json({ message: "Password must be at least 6 characters" });
      if (!email.includes("@"))
        return res.json({ message: "Invalid email format" });

      // ✅ Check Role Exists
      const findRole = await Role.findOne({ name: role });
      if (!findRole) return res.json({ message: "Role not found" });

      // ✅ Check if User Exists
      let user1 = await User.findOne({ email, isVerified: true });

      if (user1) {
        // If user exists, check if already verified
        if (user1.isVerified) {
          return res.json({ message: "User already registered" });
        }
      }

      // ✅ Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

      let user = await User.findOne({ email, isVerified: true });

      if (user) {
        // If user exists, update OTP and resend
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await CommanMail(
          email,
          "OTP Verification",
          `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .button {
            background-color: #28a745;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dkqw7zkzl/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1743567316/logo_g5whfu.jpg" alt="Company Logo" class="logo">
        <h2>Email Verification</h2>
        <p>Hello <strong>{{name}}</strong>,</p>
        <p>Thank you for registering with us. Please click the button below to verify your email:</p>
        <a href="http://localhost:5000/api/auth/verify-otp?email=${email}&otp=${otp}" class="button">Verify My Email</a>
        <p class="footer">If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>
`
        );
        return res.status(200).json({ message: "OTP resent successfully" });
      }

      // ✅ Hash Password
      const salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(password.toString(), salt);

      // ✅ Create New User
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: findRole._id,
        authType: "local",
        isVerified: false, // User needs OTP verification
        otp,
        otp1: password,
        otpExpires,
      });

      await user.save();

      // ✅ Send OTP Email
      await CommanMail(
        email,
        "OTP Verification",
        `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .button {
            background-color: #28a745;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dkqw7zkzl/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1743567316/logo_g5whfu.jpg" alt="Company Logo" class="logo">
        <h2>Email Verification</h2>
        <p>Hello <strong>{{name}}</strong>,</p>
        <p>Thank you for registering with us. Please click the button below to verify your email:</p>
        <a href="http://localhost:5000/api/auth/verify-otp?email=${email}&otp=${otp}" class="button">Verify My Email</a>
        <p class="footer">If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>
`
      );

      return res.status(201).json({
        message: "User registered successfully. Please verify OTP.",
        userId: user._id,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.json({ message: "Server error", error });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.query;

      let user = await User.findOne({ email });
      if (!user) return res.json({ message: "User not found" });

      if (user.isVerified)
        return res.json({ message: "User already verified" });

      // ✅ Check OTP Validity
      if (user.otp !== otp || new Date() > user.otpExpires) {
        return res.json({ message: "Invalid or expired OTP" });
      }

      // ✅ Verify User
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      res.redirect("http://localhost:5173/#/login");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      res.json({ message: "Server error", error });
    }
  }

  async sendOTP(req, res) {
    try {
      const { email } = req.body;

      let user = await User.findOne({ email });
      if (!user) return res.json({ message: "User not found" });

      // Generate OTP (6-digit random number)
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 mins

      // Store OTP in database
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      res.status(200).json({ message: "OTP sent successfully" });
      await CommanMail(
        email,
        "OTP Verification",
        `Your OTP code is ${otp}. It is valid for 10 minutes.`
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.json({ message: "Error sending OTP", error });
    }
  }

  // 📍 User Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          status: false,
          data: [],
          message: "Invalid credentials",
        });
      }

      // ✅ Fix async issue (await is required)
      const isMatch = bcrypt.compare(
        password.toString(),
        user.password.toString()
      );

      if (!isMatch) {
        return res.json({
          status: false,
          data: [],
          message: "Invalid email or password",
        });
      }

      if (!user.isVerified) {
        return res.json({
          status: false,
          data: [],
          message: "User not verified",
        });
      }

      let GetRole = await Role.findById(user.role);
      if (!GetRole) {
        return res.json({ status: false, data: [], message: "Role not found" });
      }

      // ✅ Generate JWT Token (7 Days Expiry)
      const token = jwt.sign(
        { id: user._id, role: GetRole.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // ✅ Send response to frontend
      res.json({ token, status: true, msg: "Login successfully" });
    } catch (error) {
      res.json({ status: false, data: error, message: "Server error" });
    }
  }

  // 📍 Google SSO Authentication
  async googleAuth(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.json({ message: "Token is required" });
      }

      // Verify Firebase Token
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, name, email, picture } = decodedToken;


      // Check if user exists in DB
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user
        user = new User({
          uid,
          name,
          email,
          profilePic: picture,
          isVerified: true,
          authType: "google",
        });
        await user.save();
      }else{
        // Update user profile picture if it has changed
        if (user.profilePic !== picture) {
          user.profilePic = picture;
          await user.save();
        }
      }

      // Generate JWT for session management
      const jwtToken = jwt.sign(
        { id: user._id, role: "USER" },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        message: "Google Auth Successful",
        token: jwtToken,
        status: true,
      });
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.status(401).json({ message: "Google authentication failed", error });
    }
  }

  // 📍 Instagram SSO Authentication (Dummy Implementation)
  async instagramAuth(req, res) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) return res.json({ message: "Invalid access token" });

      let user = await User.findOne({ email: "dummy@instagram.com" });

      if (!user) {
        user = new User({
          name: "Instagram User",
          email: "dummy@instagram.com",
          role: "user",
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({ token, user });
    } catch (error) {
      res.json({ message: "Instagram authentication failed", error });
    }
  }

  // 📍 Snapchat SSO Authentication (Dummy Implementation)
  async snapchatAuth(req, res) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) return res.json({ message: "Invalid access token" });

      let user = await User.findOne({ email: "dummy@snapchat.com" });

      if (!user) {
        user = new User({
          name: "Snapchat User",
          email: "dummy@snapchat.com",
          role: "user",
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({ token, user });
    } catch (error) {
      res.json({ message: "Snapchat authentication failed", error });
    }
  }

  // 📍 Role-based Access Middleware
  async authMiddleware(roles) {
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
        res.json({ message: "Invalid token" });
      }
    };
  }

  async GetProfilePhoto(req, res) {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(401).json({ message: "Access denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

      let UserFind = await User.findOne({ _id: decoded.id }).select(
        "profilePic"
      );
      if (!UserFind) return res.json({ message: "User not found" });

      const CartData = await Cart.findOne({ userId: decoded.id });


      return res.send({
        status: true,
        data: UserFind.profilePic,
        cartCount: CartData && CartData?.products?.length,
        message: "Profile photo fetched successfully",
      });
    } catch (error) {
      console.log("Error in GetProfilePhoto", error);
    }
  }

  async facebookcallback(req, res) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        return res.json({ message: "Invalid access token" });
      }

      // Verify Facebook Token
      const decodedToken = await admin.auth().verifyIdToken(accessToken);
      const { uid, name, email, picture } = decodedToken;

      // Check if user exists in DB
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user
        user = new User({
          uid,
          name,
          email,
          profilePic: picture,
          isVerified: true,
          authType: "facebook",
        });
        await user.save();
      }

      // Generate JWT for session management
      const jwtToken = jwt.sign(
        { id: user._id, role: "USER" },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        message: "Facebook Auth Successful",
        token: jwtToken,
        status: true,
      });
    } catch (error) {
      console.log("Error in facebookcallback", error);
    }
  }
}

module.exports = new AuthController();
