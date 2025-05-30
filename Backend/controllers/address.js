const {
  createAddress,
  getAddressByUserId,
  updateAddressById,
  deleteAddressById,
} = require("../services/addressService");

// Add a new address
async function addAddress(req, res, next) {
  const {
    // userId,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
  } = req.body;

  // Ensure all required address fields are provided by the client before proceeding
  if (
    // !userId ||
    !phone ||
    !addressLine1 ||
    !city ||
    !state ||
    !country ||
    !postalCode
  ) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error); // Pass error to Express error-handling middleware
  }

  // Create a new address entry in the database with the provided data
  const address = await createAddress({
    // userId,
    phone,
    addressLine1,
    city,
    state,
    country,
    postalCode,
  });

  // Send a success response with the newly created address
  res.status(201).json({ success: true, message: "Address added", address });
}

// Get all addresses for a user
async function getAddress(req, res, next) {
  // Retrieve all addresses associated with a specific user ID
  const addresses = await getAddressByUserId(req.params.userId);

  // If no addresses found, inform the client with a 404 error
  if (!addresses) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the list of addresses in the response
  res.status(200).json(addresses);
}

// Update an address
async function updateAddress(req, res, next) {
  // Attempt to update an address using its ID and the provided new data
  const updatedAddress = await updateAddressById(
    req.params.addressId,
    req.body
  );

  // If no address was found with the given ID, respond with a 404
  if (!updatedAddress) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }

  // Respond with the updated address and a success message
  res
    .status(200)
    .json({ success: true, message: "Address updated", updatedAddress });
}

// Delete an address
async function deleteAddress(req, res, next) {
  // Attempt to delete the address by its ID
  const deletedAddress = await deleteAddressById(req.params.addressId);

  // If deletion failed (e.g., no such address), return a 404 error
  if (!deletedAddress) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }

  
  // Respond that the address was successfully deleted
  res.status(200).json({ message: "Address deleted" });
}

module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
