const User = require("../models/user");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");

// Generate a unique 4-digit numeric OTP
async function generateUniqueOtp(email) {
  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let existingOtp = await Otp.findOne({ email, otp });

  while (existingOtp) {
    otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    existingOtp = await Otp.findOne({ email, otp });
  }

  return otp;
}

// Check if a user with the given email exists
async function isUserRegistered(email) {
  const user = await User.findOne({ email });
  return Boolean(user);
}

// Save OTP to database
async function saveOtp(email, otp) {
  return await Otp.create({ email, otp });
}

// Verify OTP from database
async function verifyOtpCode(email, otp) {
  return await Otp.findOne({ email, otp });
}

module.exports = {
  generateUniqueOtp,
  isUserRegistered,
  saveOtp,
  verifyOtpCode,
};
