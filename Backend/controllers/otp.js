const User = require("../models/user");
const Otp = require("../models/Otp");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_PHONE_NUMBER,
  {logLevel: 'debug'}
)

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
}

// Verifying whether there is a user with the number entered
async function checkUser(req, res, next) {
  const { mobile_number } = req.body;

  const user = await User.findOne({ mobile_number });
  if (!user) {
    const error = new Error("Please enter a registered number");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ status: true, message: "User exists" });
}

async function sendOtp(req, res, next) {
  const { mobile_number } = req.body;

  const otp = generateOtp();

  // Delete existing OTPs for the number
  await Otp.deleteMany({ mobile_number });

  // Save new OTP
  await Otp.create({ mobile_number, otp });

  // Send via Twilio
  await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${mobile_number}`,
  });

  res.status(200).json({ message: "OTP sent successfully" });
}

async function verifyOtp(req, res, next) {
  const { otp } = req.body;

  const existingOtp = await Otp.findOne({ otp });
  if(!existingOtp) {
    const error = new Error("Invalid or expired OTP");
    error.statusCode = 400;
    return next(error);
  }

  res.status(200).json({ message: "OTP verified successfully" });

}

module.exports = {
  checkUser,
  sendOtp,
  verifyOtp
};
