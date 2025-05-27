const Address = require("../models/address");

async function createAddress(addressData) {
    const address = new Address(addressData);
    return await address.save();
}

async function getAddressByUserId(userId) {
    return await Address.findById(userId);
}

async function updateAddressById(addressId, updateData) {
    return await Address.findByIdAndUpdate(addressId, updateData, { new: true });
}

async function deleteAddressById(addressId) {
    return await Address.findByIdAndDelete(addressId);
}

module.exports = {
    createAddress,
    getAddressByUserId,
    updateAddressById,
    deleteAddressById
};