const express = require("express");
const router = express.Router();
const {
  checkUser,
  sendOtp,
  verifyOtp
} = require('../controllers/otp')

// Send OTP
router.post("/send", checkUser, sendOtp);

// Verify OTP
router.post("/verify", verifyOtp);

module.exports = router;