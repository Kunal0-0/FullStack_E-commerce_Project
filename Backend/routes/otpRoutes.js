const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const {
  sendOtp,
  verifyOtp
} = require('../controllers/otp')
// const { catchAsync } = require("../library/GlobalErrorHandler")

// Send OTP
router.post("/send-otp", (sendOtp));

// Verify OTP
router.post("/verify", (verifyOtp));

module.exports = router;