const express = require("express");
const router = express.Router();
const customMiddleware = require("./middlewares/customMiddleware");
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");

router.post("/", customMiddleware, addAddress);
router.get("/:userId", customMiddleware, getAddress);
router
    .route("/:addressId", customMiddleware)
    .put(updateAddress)
    .delete(deleteAddress);

module.exports = router;