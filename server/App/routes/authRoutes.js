const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");


router.post("/register", (req, res) => AuthController.register(req, res));
router.get("/verify-otp", (req, res) => AuthController.verifyOTP(req, res));
router.post("/send-otp", (req, res) => AuthController.sendOTP(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));
router.post("/google-auth", (req, res) => AuthController.googleAuth(req, res));
router.post("/instagram-auth", (req, res) => AuthController.instagramAuth(req, res));
router.post("/snapchat-auth", (req, res) => AuthController.snapchatAuth(req, res));
router.post("/facebook-auth", (req, res) => AuthController.facebookAuth(req, res));
router.post("/facebook/callback", (req, res) => AuthController.facebookcallback(req, res));

router.get("/get-profile", (req, res) => AuthController.GetProfilePhoto(req, res));

module.exports = router;
