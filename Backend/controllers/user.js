const User = require("../models/user");

async function registerUser(req, res, next) {
  const { mobile_number, name, password, addresses, email } = req.body;
  if (!mobile_number || !name || !password || !addresses || !email) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  const user = new User({ mobile_number, name, password, addresses, email });
  await user.save();
  res.status(201).json({ message: "User created", user });
}

async function handleGetAllUsers(req, res) {
  const users = await User.find();
  res.status(200).json(users);
}

async function handleGetUserById(req, res, next) {
  const user = await User.findById(req.params.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(user);
}

async function updateUser(req, res, next) {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ success: true, message: "User updated", updatedUser});
}

async function deleteUser(req, res, next) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: "User deleted" });
}

module.exports = {
  registerUser,
  handleGetAllUsers,
  handleGetUserById,
  updateUser,
  deleteUser,
};
