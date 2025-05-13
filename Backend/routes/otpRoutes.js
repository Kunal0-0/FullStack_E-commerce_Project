const express = require("express");
const router = express.Router();
const {
  sendOtp,
  verifyOtp
} = require('../controllers/otp')

// Send OTP
router.post("/send-otp", sendOtp);

// Verify OTP
router.post("/verify", verifyOtp);

module.exports = router;