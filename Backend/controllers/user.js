const {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = require("../services/userService");

// Controller to register/create a new user
async function registerUser(req, res, next) {
  const { name, password, addresses, email } = req.body;

  // Ensure all required user details are provided before proceeding
  if (!name || !password || !addresses || !email) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  const user = await createUserService({ name, password, addresses, email });

  // Return a success response with the created user details
  res.status(201).json({ message: "User created", user });
}

// Controller to fetch all users
async function handleGetAllUsers(req, res) {
  // Retrieve all users via the service layer
  const users = await getAllUsersService();
  // Send the list of users in the response
  res.status(200).json(users);
}

// Controller to fetch a user by ID
async function handleGetUserById(req, res, next) {
  // Use the provided ID to fetch specific user details
  const user = await getUserByIdService(req.params.id);
  // Handle case where no user is found for the given ID
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  // Return the user data in the response
  res.status(200).json(user);
}

// Controller to update a user's details
async function updateUser(req, res, next) {
  // Pass the user ID and updated data to the service for processing
  const updatedUser = await updateUserService(req.params.id, req.body);
  // Handle cases where user ID is invalid or user does not exist
  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return confirmation that the update was successful
  res.status(200).json({ success: true, message: "User updated", updatedUser });
}

// Controller to delete a user by ID
async function deleteUser(req, res, next) {
  const deletedUser = await deleteUserService(req.params.id);
  // Handle case where user does not exist
  if (!deletedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  // Confirm successful deletion
  res.status(200).json({ message: "User deleted" });
}

module.exports = {
  registerUser,
  handleGetAllUsers,
  handleGetUserById,
  updateUser,
  deleteUser,
};