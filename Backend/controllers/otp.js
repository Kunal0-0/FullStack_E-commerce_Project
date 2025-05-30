const {
  generateUniqueOtp,
  isUserRegistered,
  saveOtp,
  verifyOtpCode
} = require("../services/otpService")

const dotenv = require("dotenv");

dotenv.config(); // WHY: Load environment variables from .env file for use in this module

// Utility function to generate a 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
}

// Verifying whether there is a user with the number entered
// async function checkUser(req, res, next) {
//   const { mobile_number } = req.body;

// }

// Send OTP to user
async function sendOtp(req, res, next) {
  const { email } = req.body;

  // Check if user is already present
  const checkUserPresent = await isUserRegistered({ email });
  // Prevent sending OTP to unregistered users for security reasons
  if (!checkUserPresent) {
    const error = new Error("Please enter a registered email");
    error.statusCode = 404;
    return next(error);
  }

  // Generate and save a new unique OTP linked to the user’s email
  const otp = await generateUniqueOtp(email);
  await saveOtp(email, otp);

  // Return success message
  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
}

// Verify the OTP submitted by the user
async function verifyOtp(req, res, next) {
  let { email, otp } = req.body;

  // Validate required fields before proceeding
  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    return next(error);
  }

  // If OTP is an array, join it into a string
  if (Array.isArray(otp)) {
    otp = otp.join("");
  }

  // Validate the provided OTP against the stored/expected one
  const existingOtp = await verifyOtpCode({ email, otp });

  // Handle incorrect or expired OTPs with an error
  if (!existingOtp) {
    const error = new Error("Invalid or expired OTP");
    error.statusCode = 400;
    return next(error);
  }

  // OTP is valid — allow user to proceed
  res.status(200).json({ message: "OTP verified successfully" });
}

module.exports = {
  sendOtp,
  verifyOtp,
};
