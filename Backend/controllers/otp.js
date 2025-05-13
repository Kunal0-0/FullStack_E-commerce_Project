const User = require("../models/user");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");

const dotenv = require("dotenv");

dotenv.config();

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
}

// Verifying whether there is a user with the number entered
// async function checkUser(req, res, next) {
//   const { mobile_number } = req.body;

// }

async function sendOtp(req, res, next) {
  const { email } = req.body;

  // Check if user is already present
  const checkUserPresent = await User.findOne({ email });
  // If user not found with provided email
  if (!checkUserPresent) {
    const error = new Error("Please enter a registered email");
    error.statusCode = 404;
    return next(error);
  }

  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  let result = await Otp.findOne({ email, otp });
  while (result) {
    otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    result = await Otp.findOne({ email, otp });
  }

  await Otp.create({ email, otp });
  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
}

async function verifyOtp(req, res, next) {
  let { email, otp } = req.body;

  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    return next(error);
  }

  // If OTP is an array, join it into a string
  if (Array.isArray(otp)) {
    otp = otp.join("");
  }

  const existingOtp = await Otp.findOne({ email, otp });

  if (!existingOtp) {
    const error = new Error("Invalid or expired OTP");
    error.statusCode = 400;
    return next(error);
  }

  res.status(200).json({ message: "OTP verified successfully" });
}

module.exports = {
  sendOtp,
  verifyOtp,
};
