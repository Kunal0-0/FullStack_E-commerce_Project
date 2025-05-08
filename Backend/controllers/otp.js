const User = require("../models/user");

async function checkUser(req, res, next) {
  // Verifying whether there is a user with the number entered
  const { mobile_number } = req.body;

  const user = await User.findOne({ mobile_number });
  if (!user) {
    const error = new Error("Please enter a registered number");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ status: true, message: "User exists" });
}

module.exports = {
  checkUser
};
