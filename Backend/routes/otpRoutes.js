const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const {
  sendOtp,
  verifyOtp
} = require('../controllers/otp')
const { catchAsync } = require("../library/GlobalErrorHandler")

// Send OTP
router.post("/send-otp", catchAsync(sendOtp));

// Verify OTP
router.post("/verify", catchAsync(verifyOtp));

module.exports = router;