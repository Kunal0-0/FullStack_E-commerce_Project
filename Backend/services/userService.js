const User = require("../models/user");

// Register a new user
async function createUserService(data) {
  const user = new User(data);
  return await user.save();
}

// Get all users
async function getAllUsersService() {
  return await User.find();
}

// Get user by ID
async function getUserByIdService(id) {
  return await User.findById(id);
}

// Update a user
async function updateUserService(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

// Delete a user
async function deleteUserService(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};