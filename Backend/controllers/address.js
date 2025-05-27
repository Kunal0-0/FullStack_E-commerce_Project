const {
  createAddress,
  getAddressByUserId,
  updateAddressById,
  deleteAddressById
} = require("../services/addressService")

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
    return next(error);
  }
  const address = await createAddress({
    // userId,
    phone,
    addressLine1,
    city,
    state,
    country,
    postalCode,
  });
  res.status(201).json({ success: true, message: "Address added", address });
}

// Get all addresses for a user
async function getAddress(req, res, next) {
  const addresses = await getAddressByUserId(req.params.userId);
  if (!addresses) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(addresses);
}

// Update an address
async function updateAddress(req, res, next) {
  const updatedAddress = await updateAddressById(
    req.params.addressId,
    req.body
  );
  if (!updatedAddress) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }
  res
    .status(200)
    .json({ success: true, message: "Address updated", updatedAddress });
}

// Delete an address
async function deleteAddress(req, res, next) {
  const deletedAddress = await deleteAddressById(req.params.addressId);
  if (!deletedAddress) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: "Address deleted" });
}

module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
