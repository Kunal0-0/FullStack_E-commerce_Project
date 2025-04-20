const express = require("express");
const router = express.Router();
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");

router.post("/", addAddress);
router.get("/:userId", getAddress);
router
    .route("/:addressId")
    .put(updateAddress)
    .delete(deleteAddress);

module.exports = router;