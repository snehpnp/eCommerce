const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/authController");


router.post("/register", (req, res) => AuthController.register(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));
router.post("/google-auth", (req, res) => AuthController.googleAuth(req, res));
router.post("/instagram-auth", (req, res) => AuthController.instagramAuth(req, res));
router.post("/snapchat-auth", (req, res) => AuthController.snapchatAuth(req, res));

module.exports = router;
