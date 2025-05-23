const express = require("express");
const router = express.Router();
const customMiddleware = require("./middlewares/customMiddleware");
const {
  sendOtp,
  verifyOtp
} = require('../controllers/otp')

// Send OTP
router.post("/send-otp", customMiddleware, sendOtp);

// Verify OTP
router.post("/verify", customMiddleware, verifyOtp);

module.exports = router;